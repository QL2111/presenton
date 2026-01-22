#!/usr/bin/env python3
"""
Export custom template layouts from SQLite DB to .tsx files.
Usage: python scripts/export_custom_template.py <presentation_id> [output_dir]
"""

import sqlite3
import sys
import os
from pathlib import Path


def export_template(presentation_id: str, output_dir: str = None):
    db_path = Path(__file__).parent.parent / "app_data" / "fastapi.db"

    if not db_path.exists():
        print(f"❌ Database not found: {db_path}")
        sys.exit(1)

    # Clean presentation_id (remove dashes if present)
    clean_id = presentation_id.replace("-", "")

    # Default output dir
    if output_dir is None:
        output_dir = (
            Path(__file__).parent.parent
            / "servers"
            / "nextjs"
            / "presentation-templates"
            / f"custom-{presentation_id[:8]}"
        )
    else:
        output_dir = Path(output_dir)

    output_dir.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get template info
    cursor.execute("SELECT name, description FROM templates WHERE id = ?", (clean_id,))
    template_info = cursor.fetchone()

    if template_info:
        print(f"📦 Template: {template_info[0]}")
        print(f"   Description: {template_info[1]}")

    # Get all layouts
    cursor.execute(
        "SELECT layout_id, layout_name, layout_code FROM presentation_layout_codes WHERE presentation = ?",
        (clean_id,),
    )
    layouts = cursor.fetchall()

    if not layouts:
        print(f"❌ No layouts found for presentation: {presentation_id}")
        sys.exit(1)

    print(f"\n📂 Exporting {len(layouts)} layouts to: {output_dir}\n")

    for layout_id, layout_name, layout_code in layouts:
        filename = f"{layout_name}.tsx"
        filepath = output_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(layout_code)

        print(f"  ✅ {filename} ({len(layout_code)} chars)")

    # Create settings.json
    settings = {
        "description": template_info[1] if template_info else "Custom template",
        "ordered": False,
        "default": False,
    }

    import json

    with open(output_dir / "settings.json", "w") as f:
        json.dump(settings, f, indent=2)

    print(f"\n  ✅ settings.json")
    print(f"\n✨ Done! Edit files in: {output_dir}")
    conn.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(
            "Usage: python scripts/export_custom_template.py <presentation_id> [output_dir]"
        )
        print(
            "Example: python scripts/export_custom_template.py 6516c707-6e9d-4456-a573-f0b0d85080f2"
        )
        sys.exit(1)

    presentation_id = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else None
    export_template(presentation_id, output_dir)
