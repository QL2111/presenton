# RECAP — PDF → PPTX Converter

## Approches explorées

| # | Fichier | Méthode | SSIM | Texte éditable |
|---|---------|---------|------|----------------|
| A | `proto_pymupdf.py` | Screenshot pur | 0.986 | ❌ |
| B | `proto_semantic.py` | Extraction sémantique | 0.786 | ✅ |
| C | `proto_hybrid.py` | Hybride (**retenu**) | 0.894 | ✅ |

---

## Solution retenue : Approche Hybride (`proto_hybrid.py`)

### Logique en 3 couches

```
┌──────────────────────────────────────────────┐
│  Layer 2 — TextBoxes transparentes (z-top)   │  ← texte éditable PowerPoint
├──────────────────────────────────────────────┤
│  Layer 1 — JPEG fond sans texte (z-bottom)   │  ← design pixel-perfect
└──────────────────────────────────────────────┘
```

**Layer 1 — Background "text-erased"**
- PyMuPDF rend la page en JPEG (dpi=150)
- Avant le rendu, les zones de texte sont **rédigées** via `fitz.add_redact_annot` + `apply_redactions` sur une copie mémoire du PDF
- Flags: `PDF_REDACT_IMAGE_NONE` + `PDF_REDACT_LINE_ART_NONE` → images et éléments vectoriels préservés, seul le texte disparaît
- Résultat: fond pixel-perfect (couleurs, dégradés, icônes) **sans texte**

**Layer 2 — Text overlay**
- PyMuPDF extrait tous les spans (`get_text("dict")`) avec position, police, taille, couleur
- Les blocs fragmentés par Puppeteer sont **fusionnés** (`merge_text_blocks`) : même colonne (x0 ±20pt) + gap < 15pt → un seul TextBox
- TextBoxes python-pptx : **pas de fill**, **pas de bordure** → transparentes sur le fond
- Mapping de polices (`map_font_name`) : LiberationSans → Arial, etc.

### Pourquoi pas l'approche sémantique pure ?
Presenton génère des éléments décoratifs (barres de titre, dégradés, icônes) en **chemins SVG bezier** — PyMuPDF peut les extraire via `get_drawings()` mais ils arrivent avec des coordonnées hors-limites (artefacts de bleed PDF) et ne se reconstituent pas fidèlement en python-pptx. Le screenshot résout ce problème proprement.

---

## Évaluation qualité (`eval_render.py`)

Pipeline : `PPTX → PDF (LibreOffice) → images (PyMuPDF) → SSIM (scikit-image)`

```bash
.venv/bin/python eval_render.py source.pdf converted.pptx
```

---

## Tests (`tests/test_hybrid.py`)

| Test | Ce qu'il vérifie |
|------|-----------------|
| `test_output_file_exists` | Fichier généré > 10 Ko |
| `test_slide_count_matches_pdf` | Nb slides = nb pages PDF |
| `test_slide_dimensions_match_pdf` | Taille EMU conforme au PDF |
| `test_first_shape_is_background_image` | 1ère shape = PICTURE plein écran (0,0) |
| `test_has_text_shapes` | ≥ 1 TextBox par slide |
| `test_text_boxes_are_transparent` | Aucun `solidFill` sur les TextBoxes |
| `test_ssim_above_threshold` | SSIM moyen ≥ 0.87 |
