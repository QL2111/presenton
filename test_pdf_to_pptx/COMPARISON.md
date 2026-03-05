# PDF → PPTX Conversion: Approach Comparison

**Use case:** Convert a Puppeteer-generated PDF (1280×720 px slides) into a `.pptx` where each page becomes one slide.

---

## Approach A — `pdf2pptx` library (v1.0.5)

### What it actually does (source inspection)

```python
# Entire core logic — ~40 lines
doc = fitz.open(pdf_file)
zoom = resolution / 72
matrix = fitz.Matrix(zoom, zoom, 0)

prs = Presentation()
aspect_ratio = page.rect.width / page.rect.height
prs.slide_width = int(prs.slide_height * aspect_ratio)   # height stays at default ~6858000 EMU

for page_no in page_iter:
    pixmap = page.get_pixmap(matrix=matrix)
    image_data = pixmap.tobytes(output='PNG')
    slide.shapes.add_picture(image_file, 0, 0, height=prs.slide_height)

prs.save(output_file)
```

It is a thin CLI wrapper around **the same PyMuPDF + python-pptx stack** as Approach B.

### Evaluation

| Criterion | Rating | Notes |
|-----------|--------|-------|
| **Fidelity** | ✅ Good | PyMuPDF renders faithfully; images embedded as PNG |
| **Control** | ⚠️ Limited | Slide *height* is locked to python-pptx default (~7.5 in). Width is derived from aspect ratio. **Cannot set exact 1280×720 px dimensions.** DPI settable via `--resolution`. |
| **Dependencies** | ⚠️ Bloated | `pymupdf==1.20.1` (hard-pinned, old), `python-pptx`, `click`, `tqdm` — 4 deps for what is 40 lines of code |
| **Maintenance** | ❌ Stale | Pinned to PyMuPDF `1.20.1` while current is `1.27.x`. Version conflict with any modern environment. Last meaningful commit years ago. Low star count (~100). |
| **Simplicity** | ✅ 1 line | `convert_pdf2pptx(pdf, out, resolution=150, ...)` — simple API |
| **Limitations** | ❌ | Hard version pin breaks installs; no control over slide size in absolute units; always PNG (no JPEG option); `tqdm` import crashes if not installed separately |

---

## Approach B — `PyMuPDF` (fitz) + `python-pptx` (manual)

### Implementation (~20 lines)

```python
import fitz
import io
from pptx import Presentation
from pptx.util import Emu

# 1280×720 px at 96 dpi → EMU (1 inch = 914400 EMU, 1 px at 96dpi = 9525 EMU)
PX_TO_EMU = 9525
SLIDE_W, SLIDE_H = 1280 * PX_TO_EMU, 720 * PX_TO_EMU
DPI = 150  # render resolution

def pdf_to_pptx(pdf_path: str, out_path: str) -> None:
    doc = fitz.open(pdf_path)
    prs = Presentation()
    prs.slide_width  = Emu(SLIDE_W)
    prs.slide_height = Emu(SLIDE_H)
    layout = prs.slide_layouts[6]  # blank

    zoom = DPI / 72
    matrix = fitz.Matrix(zoom, zoom)

    for page in doc:
        pixmap = page.get_pixmap(matrix=matrix)
        img_bytes = io.BytesIO(pixmap.tobytes("jpeg"))   # JPEG = smaller file
        slide = prs.slides.add_slide(layout)
        slide.shapes.add_picture(img_bytes, 0, 0, width=Emu(SLIDE_W), height=Emu(SLIDE_H))

    prs.save(out_path)
```

### Evaluation

| Criterion | Rating | Notes |
|-----------|--------|-------|
| **Fidelity** | ✅ Excellent | Same PyMuPDF renderer; DPI freely tunable (150–300 recommended) |
| **Control** | ✅ Full | Exact slide dimensions in EMU/px, DPI, PNG vs JPEG, image compression |
| **Dependencies** | ✅ Minimal | Only `pymupdf` + `python-pptx` — both already required by the project |
| **Maintenance** | ✅ Active | PyMuPDF 1.27.x (2025, 3k+ GitHub stars); python-pptx 1.0.x (widely used) |
| **Simplicity** | ✅ ~20 lines | No magic; readable, debuggable, no abstraction overhead |
| **Limitations** | ⚠️ | Images are rasterized (not vector); file size grows with DPI. Both are inherent to the raster-based approach, not specific to this implementation. |

---

## Side-by-Side Summary

| | `pdf2pptx` | PyMuPDF + python-pptx |
|---|---|---|
| Underlying engine | PyMuPDF + python-pptx | PyMuPDF + python-pptx |
| Exact slide size (1280×720) | ❌ No | ✅ Yes |
| Set DPI | ✅ Yes | ✅ Yes |
| Image format choice | ❌ PNG only | ✅ PNG / JPEG |
| Extra deps | click, tqdm + pinned pymupdf | None |
| Actively maintained | ❌ Stale | ✅ Yes |
| Lines of code | 1 (call) | ~20 |
| Version conflict risk | ❌ High (`pymupdf==1.20.1`) | ✅ None |

---

## Recommendation

**Use Approach B (PyMuPDF + python-pptx directly).**

`pdf2pptx` is literally the same two libraries under a thin CLI wrapper — but it pins an ancient `pymupdf==1.20.1` (conflicting with the `1.27.x` already installed), cannot set exact slide dimensions, and forces PNG output. There is no benefit to pulling it in.

Approach B gives you **exact 1280×720 slides**, **JPEG compression** (3–5× smaller files vs PNG), **current library versions**, and is 20 readable lines with zero extra dependencies. For Puppeteer-generated PDFs where the source is already pixel-perfect at 1280×720, set DPI=150 (enough for screen quality) and use JPEG quality 85 for a good size/quality trade-off.
