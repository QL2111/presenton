# Presenton – Application Overview

## 1. What is Presenton?

Presenton is an **AI-powered presentation generator**. Users provide a text prompt or upload documents (PDF, DOCX), and the app produces a fully-formatted, editable slideshow that can be exported as **PPTX** or **PDF**. It supports multiple LLM providers (OpenAI, Google Gemini, Anthropic Claude, Ollama, custom), multiple slide templates, AI image generation, and custom template upload.

---

## 2. Architecture

```
                        ┌─────────────────────────────┐
  Browser / API Client  │  Nginx  (port 8080)          │
                        └──────────┬──────────────────-┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                                         ▼
  Next.js 14  (port 3000)              FastAPI  (port 8000)
  TypeScript · Tailwind · Redux        Python · SQLModel · SQLite
  shadcn/ui · TipTap · Puppeteer       python-pptx · LibreOffice
```

### Key Technology

| Layer | Stack |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Redux Toolkit, TipTap |
| Backend | FastAPI (async), SQLModel, SQLite, python-pptx, Pillow, lxml |
| AI / LLM | OpenAI, Google, Anthropic, Ollama, OpenCode (pluggable via `LLMClient`) |
| Image gen | OpenAI DALL-E / compatible endpoints |
| Infra | Docker / Podman, Nginx reverse proxy, LibreOffice (headless) |

### Data Storage (`app_data/`)

| Path | Contents |
|---|---|
| `app_data/fastapi.db` | SQLite – presentations, slides, templates, layout codes |
| `app_data/images/` | AI-generated images, per `presentation_id` |
| `app_data/exports/` | Exported `.pptx` / `.pdf` files |
| `app_data/uploads/` | User-uploaded documents (PDF, DOCX) |
| `app_data/fonts/` | Custom fonts uploaded by users |

---

## 3. Slide Generation Flow

### 3a. Prompt-based generation

```
User enters prompt + settings
        │
        ▼
POST /api/v1/ppt/presentation/create
  → Creates PresentationModel in DB (content, n_slides, language, tone…)
        │
        ▼
GET /api/v1/ppt/outlines/stream/{id}   ← SSE stream
  → (optional) Load uploaded documents via DocumentsLoader
  → LLM call: generate_ppt_outline()   → JSON outline (title + per-slide outlines)
  → Save outlines to DB
        │
        ▼
GET /api/v1/ppt/presentation/stream/{id}   ← SSE stream
  → generate_presentation_structure()  → assign a layout type to each slide
  → For each slide: get_slide_content_from_type_and_outline()
  → Fetch images / icons (AI-generated or stock search)
  → Save SlideModel rows to DB
        │
        ▼
Frontend renders slides using React layout components
(static templates in servers/nextjs/presentation-templates/
 or dynamic templates compiled from DB via compileCustomLayout())
```

### 3b. Document-based generation

```
POST /api/v1/ppt/files/upload        → save file(s) to app_data/uploads/
POST /api/v1/ppt/files/decompose     → extract text via DocumentsLoader (Docling)
         → text fed as additional_context to outline generation (same flow as above)
```

### 3c. Slide editing

- `POST /api/v1/ppt/slide/edit` – edit a single slide via LLM prompt
- `POST /api/v1/ppt/slide/edit-html` – edit raw HTML of a slide via LLM

### 3d. Async / sync generation API

High-level convenience endpoints wrap the full pipeline:

- `POST /api/v1/ppt/presentation/generate` – synchronous (returns path)
- `POST /api/v1/ppt/presentation/generate-async` – starts background job
- `GET /api/v1/ppt/presentation/generate-async/status/{id}` – poll status

---

## 4. Slide Export Flow

### 4a. PPTX Export

```
Client calls POST /api/v1/ppt/presentation/export  { export_as: "pptx" }
        │
        ▼
FastAPI: export_utils.export_presentation()
        │
        ▼  (internal HTTP GET to Next.js)
GET http://localhost:3000/api/presentation_to_pptx_model?id={id}
  → Next.js launches Puppeteer (headless Chrome)
  → Navigates to http://localhost:8080/presentation?id={id}
  → Traverses rendered DOM: reads every element's computed styles,
    position, font, background, border-radius, z-index, images…
  → Returns structured PptxPresentationModel JSON (slides → shapes)
        │
        ▼
FastAPI: PptxPresentationCreator(pptx_model).create_ppt()
  → Uses python-pptx to build a .pptx file shape-by-shape
  → Downloads/processes images (clip, round corners, set opacity…)
  → Saves to app_data/exports/<title>.pptx
        │
        ▼
Response: { path: "/app_data/exports/…pptx" }
```

**Key idea**: the frontend renders slides as React components; Puppeteer "reads" the live DOM attributes to produce a faithful pixel-perfect PPTX model — no separate rendering engine needed.

### 4b. PDF Export

```
Client calls POST /api/v1/ppt/presentation/export  { export_as: "pdf" }
        │
        ▼
FastAPI: export_utils.export_presentation() – PDF branch
        │
        ▼  (internal HTTP POST to Next.js)
POST http://localhost:3000/api/export-as-pdf  { id, title }
  → Puppeteer launches headless Chrome
  → Navigates to http://localhost:8080/pdf-maker?id={id}
     (special page that renders all slides without UI chrome)
  → Waits for full render (networkidle0 + 99% visible elements)
  → page.pdf({ width: 1280px, height: 720px, printBackground: true })
  → Saves buffer to app_data/exports/<title>.pdf
        │
        ▼
Response: { path: "/app_data/exports/…pdf" }
```

### Export summary table

| Format | Renderer | Library | Output |
|---|---|---|---|
| PPTX | Puppeteer DOM → PptxPresentationModel | python-pptx | `.pptx` |
| PDF | Puppeteer headless print | Chromium PDF engine | `.pdf` |

---

## 5. Custom Template Upload Flow

```
User uploads PPTX or PDF  →  /api/v1/ppt/pptx-slides/process  (or pdf-slides/process)
  → LibreOffice: generate slide screenshots + extract XML
  → Font analysis: check Google Fonts availability
  → LLM: slide image + XML → HTML  (slide-to-html/)
  → LLM: HTML → React/TSX component  (html-to-react/)
  → Save TSX code to presentation_layout_codes in DB
  → Frontend compiles component at runtime via compileCustomLayout()
```

---

## 6. Key Files for Export

### FastAPI (Backend)

| File | Role |
|---|---|
| `servers/fastapi/utils/export_utils.py` | Top-level `export_presentation()` orchestrator |
| `servers/fastapi/services/pptx_presentation_creator.py` | Builds `.pptx` from `PptxPresentationModel` using python-pptx |
| `servers/fastapi/models/pptx_models.py` | Pydantic models: slides, shapes, fonts, positions… |
| `servers/fastapi/api/v1/ppt/endpoints/presentation.py` | All presentation endpoints incl. `/export`, `/generate` |
| `servers/fastapi/utils/image_utils.py` | Image post-processing (clip, round, opacity…) |

### Next.js (Frontend)

| File | Role |
|---|---|
| `servers/nextjs/app/api/presentation_to_pptx_model/route.ts` | Puppeteer DOM → `PptxPresentationModel` JSON |
| `servers/nextjs/app/api/export-as-pdf/route.ts` | Puppeteer → PDF buffer → file |
| `servers/nextjs/app/(presentation-generator)/pdf-maker/` | Special render page used for PDF export |
| `servers/nextjs/app/(presentation-generator)/presentation/` | Main slide editor/viewer |
| `servers/nextjs/app/(presentation-generator)/upload/` | Prompt input + document upload UI |
| `servers/nextjs/app/(presentation-generator)/outline/` | Outline review/editing step |
| `servers/nextjs/app/(presentation-generator)/custom-template/` | Custom template upload pipeline |
| `servers/nextjs/presentation-templates/` | Static built-in slide templates (TSX + settings.json) |
| `servers/nextjs/utils/pptx_models_utils.ts` | DOM attribute → `PptxSlideModel` conversion logic |
