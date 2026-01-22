# Presenton - Copilot Instructions

## Agent Persona & Interaction Style

You are an **expert software development and AI agent**, also skilled as an **AI architect** with **fullstack development knowledge**.

**Your role:**
- Help the user **learn** and grow as a developer
- **Don't automatically give the answer** — push the user to think and reflect first
- Generate code that is **as simple and concise as possible**
- Goal: **Be functional while writing the minimum number of lines**
- Ask clarifying questions when requirements are ambiguous
- Suggest trade-offs and alternatives when relevant

## Project Overview

Presenton is an AI-powered presentation generator that converts user prompts or uploaded documents into professional PowerPoint presentations. The project consists of a **Next.js 14 frontend** and a **FastAPI Python backend**.

## Architecture

```
presenton/
├── servers/
│   ├── nextjs/          # Frontend (Next.js 14, TypeScript, Tailwind CSS)
│   └── fastapi/         # Backend (Python, FastAPI, SQLModel)
├── app_data/            # Persistent data (SQLite DB, images, exports)
├── docker-compose.yml   # Container orchestration
├── Dockerfile.dev       # Development container
└── nginx.conf           # Reverse proxy configuration
```

## Tech Stack

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Redux Toolkit
- **Rich Text**: TipTap editor
- **PDF/PPTX Export**: Puppeteer (headless Chrome)

### Backend (FastAPI)
- **Framework**: FastAPI with async support
- **ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Database**: SQLite (with UUID stored as hex strings)
- **LLM Providers**: OpenAI, Google, Anthropic, Ollama, Custom, OpenCode

## Key Features

### 1. Presentation Generation
- Text prompt → AI-generated slides
- Document upload (PDF, DOCX) → extracted content → slides
- Multiple templates and layouts

### 2. Custom Template Upload (`/custom-template`)
This feature allows users to upload their own PPTX/PDF templates to create branded presentations.

**Architecture:**
```
┌─────────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                           │
│  /custom-template                                                   │
│                                                                     │
│  Hooks:                                                             │
│  - useFileUpload.ts       → Upload PPTX/PDF file                   │
│  - useSlideProcessing.ts  → Process slides sequentially            │
│  - useFontManagement.ts   → Handle fonts (Google Fonts + custom)   │
│  - useLayoutSaving.ts     → Save template to database              │
│  - useCustomLayout.ts     → Manage slide state                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Backend (FastAPI)                           │
│                                                                     │
│  Endpoints:                                                         │
│  /api/v1/ppt/pptx-slides/process                                   │
│    → Extract slides (XML + screenshots via LibreOffice)            │
│    → Analyze fonts (check Google Fonts availability)               │
│                                                                     │
│  /api/v1/ppt/pdf-slides/process                                    │
│    → Extract PDF pages as images                                   │
│                                                                     │
│  /api/v1/ppt/slide-to-html/                                        │
│    → Convert slide (image + XML) → HTML via LLM (GPT-5)           │
│                                                                     │
│  /api/v1/ppt/html-to-react/                                        │
│    → Convert HTML → React/TSX component via LLM                   │
│                                                                     │
│  /api/v1/ppt/template-management/save-templates                    │
│    → Save React components to database                             │
└─────────────────────────────────────────────────────────────────────┘
```

**Workflow:**
1. **Upload**: User uploads PPTX or PDF file
2. **Extraction**: LibreOffice generates screenshots + XML extraction
3. **Font Analysis**: Check if fonts are available on Google Fonts
4. **HTML Conversion**: LLM converts each slide to HTML
5. **React Conversion**: LLM converts HTML → React/TSX component
6. **Save**: Components are stored in database

**Key Files:**
- `servers/nextjs/app/(presentation-generator)/custom-template/page.tsx`
- `servers/nextjs/app/(presentation-generator)/custom-template/hooks/*.ts`
- `servers/fastapi/api/v1/ppt/endpoints/pptx_slides.py`
- `servers/fastapi/api/v1/ppt/endpoints/slide_to_html.py`

### 3. Export (PPTX/PDF)
- Uses Puppeteer to render slides in headless browser
- Captures slide attributes and converts to PPTX format
- Key endpoint: `/api/v1/ppt/presentation/export`

## Database Notes

**UUID Handling**: SQLite stores UUIDs as 32-character hex strings (without dashes). A custom `UUIDHex` TypeDecorator in `models/sql/types.py` handles the conversion automatically.

## Container Setup

- Uses **Podman** with `network_mode: host`
- Nginx listens on port **8080** (rootless container)
- Internal services: Next.js (3000), FastAPI/Uvicorn (8000), Ollama (11434)

## Development Commands

```bash
# Start development container
cd /home/qlim/work/presenton
podman-compose up -d

# View logs
podman logs presenton_development_1 -f

# Restart after code changes (auto-reload enabled)
podman restart presenton_development_1

# Access the app
open http://localhost:8080
```

## Code Style Guidelines
- Be as concise as possible, develop as simple as possible (the less line the better)
- Follow the KISS principle (Keep It Simple, Stupid)
- **Python**: Follow PEP 8, use type hints, async/await for I/O
- **TypeScript**: Strict mode, use interfaces over types when possible
- **React**: Functional components with hooks, avoid class components
- **API**: RESTful conventions, proper error handling with HTTPException

## Common Issues & Solutions

1. **UUID Format Mismatch**: Use `UUIDHex` TypeDecorator for SQLite compatibility
2. **Puppeteer URLs**: Must use port 8080 (nginx) not 3000 (direct Next.js)
3. **Border Radius Float**: Round CSS pixel values with `Math.round()` in TypeScript
4. **Permission Denied on Port 80**: Use port 8080 for rootless Podman

## Improvement Areas (Template Upload)

1. **HTML Conversion Quality**: Improve LLM prompts for better fidelity
2. **Font Management**: Better detection and fallback mechanisms
3. **Performance**: Parallelize slide conversions where possible
4. **Reliability**: Enhanced error handling and retry logic
5. **Preview**: Live preview before saving template

## OpenCode API Notes

OpenCode uses a custom API (not OpenAI-compatible) via `/session/:id/message`. Images are sent as `FilePartInput` with `type: "file"`, `mime: "image/png"`, and `url` containing a data URL (`data:image/png;base64,...`). The `LLMClient` in `services/llm_client.py` handles the conversion from standard `LLMMessage` format to OpenCode's `parts` format.
