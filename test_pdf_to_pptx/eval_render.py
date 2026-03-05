"""Evaluate visual similarity between source PDF and converted PPTX."""
import os, sys, subprocess, tempfile
import fitz
import numpy as np
from PIL import Image

LIBREOFFICE = "/usr/bin/libreoffice"

try:
    from skimage.metrics import structural_similarity as ssim
    from skimage import transform as sk_transform
    HAS_SKIMAGE = True
except ImportError:
    HAS_SKIMAGE = False


def render_pdf_pages(pdf_path: str, dpi: int = 150) -> list[np.ndarray]:
    """Return list of RGB numpy arrays for each page."""
    doc = fitz.open(pdf_path)
    scale = dpi / 72.0
    mat = fitz.Matrix(scale, scale)
    pages = []
    for page in doc:
        pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
        img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, 3)
        pages.append(img)
    return pages


def render_pptx_slides(pptx_path: str, dpi: int = 150) -> list[np.ndarray]:
    """Convert PPTX → PDF via LibreOffice, then render pages with PyMuPDF."""
    with tempfile.TemporaryDirectory() as tmp:
        result = subprocess.run(
            [LIBREOFFICE, "--headless", "--convert-to", "pdf", "--outdir", tmp, pptx_path],
            capture_output=True, text=True
        )
        if result.returncode != 0:
            raise RuntimeError(f"LibreOffice failed: {result.stderr}")
        basename = os.path.splitext(os.path.basename(pptx_path))[0]
        pdf_out = os.path.join(tmp, basename + ".pdf")
        if not os.path.exists(pdf_out):
            raise RuntimeError(f"Expected PDF not found: {pdf_out}\nLibreOffice stdout: {result.stdout}")
        return render_pdf_pages(pdf_out, dpi=dpi)


def compute_ssim(img1: np.ndarray, img2: np.ndarray) -> float:
    """Resize img2 to match img1, compute SSIM on grayscale."""
    h, w = img1.shape[:2]
    if img2.shape[:2] != (h, w):
        pil = Image.fromarray(img2).resize((w, h), Image.LANCZOS)
        img2 = np.array(pil)

    if HAS_SKIMAGE:
        g1 = np.mean(img1, axis=2)
        g2 = np.mean(img2, axis=2)
        score, _ = ssim(g1, g2, full=True, data_range=255)
        return float(score)
    else:
        # Fallback: normalized pixel difference
        diff = np.mean(np.abs(img1.astype(float) - img2.astype(float))) / 255
        return float(1.0 - diff)


def evaluate(pdf_path: str, pptx_path: str) -> dict:
    """Run full evaluation. Returns {slide_scores: [...], mean: float}."""
    print("Rendering PDF pages...")
    pdf_pages = render_pdf_pages(pdf_path)
    print(f"  → {len(pdf_pages)} pages")

    print("Rendering PPTX slides (LibreOffice → PDF → PNG)...")
    pptx_slides = render_pptx_slides(pptx_path)
    print(f"  → {len(pptx_slides)} slides")

    n_pdf, n_pptx = len(pdf_pages), len(pptx_slides)
    n = min(n_pdf, n_pptx)
    if n_pdf != n_pptx:
        print(f"  ⚠  Slide count mismatch: PDF={n_pdf}, PPTX={n_pptx}. Scoring {n} pairs.")

    scores = [compute_ssim(pdf_pages[i], pptx_slides[i]) for i in range(n)]
    mean = float(np.mean(scores)) if scores else 0.0
    return {"slide_scores": scores, "mean": mean, "pdf_count": n_pdf, "pptx_count": n_pptx}


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Compare PDF vs PPTX slide-by-slide (SSIM)")
    parser.add_argument("pdf")
    parser.add_argument("pptx")
    args = parser.parse_args()

    if not HAS_SKIMAGE:
        print("⚠  scikit-image not found — using pixel-diff fallback\n")

    result = evaluate(args.pdf, args.pptx)
    print()
    for i, score in enumerate(result["slide_scores"]):
        bar = "█" * int(score * 20) + "░" * (20 - int(score * 20))
        print(f"  Slide {i+1:2d}: {bar} {score:.3f}")
    print(f"\n  Mean SSIM: {result['mean']:.3f}")
