"""Offline validation of GitHub profile assets and local Markdown references."""
from pathlib import Path
import re
import xml.etree.ElementTree as ET
import struct

ROOT = Path(__file__).resolve().parents[1]
errors = []
assets = sorted((ROOT / "assets").rglob("*.svg"))
for path in assets:
    try:
        tree = ET.parse(path)
        root = tree.getroot()
        assert root.tag == "{http://www.w3.org/2000/svg}svg", "not an SVG root"
        assert root.get("viewBox"), "missing viewBox"
        assert root.find("{http://www.w3.org/2000/svg}title") is not None, "missing title"
        assert root.find("{http://www.w3.org/2000/svg}desc") is not None, "missing description"
        assert path.stat().st_size < 20_000, "asset exceeds 20 KB"
        for element in root.iter():
            assert element.tag.split("}")[-1] not in {"script", "foreignObject", "image", "animate"}, "active or external SVG content"
            for key, value in element.attrib.items():
                assert not key.lower().startswith("on"), "event handler"
                if "href" in key:
                    assert value.startswith("#"), "external resource"
    except (ET.ParseError, AssertionError) as exc:
        errors.append(f"{path.relative_to(ROOT)}: {exc}")

readme = (ROOT / "README.md").read_text(encoding="utf-8")
for tag in re.findall(r"<img\b[^>]*>", readme):
    if 'alt="' not in tag:
        errors.append(f"Image missing alt text: {tag}")
for link in re.findall(r'(?:src|srcset)="([^"]+)"', readme):
    if not (ROOT / link).is_file():
        errors.append(f"Missing image: {link}")
headings = re.findall(r"^#{1,6} (.+)$", readme, re.M)
anchors = {re.sub(r"[^\w\- ]", "", h.lower()).replace(" ", "-") for h in headings}
for anchor in re.findall(r"\]\(#([^\)]+)\)", readme):
    if anchor not in anchors:
        errors.append(f"Broken anchor: {anchor}")
assert not errors, "\n".join(errors)
print(f"PASS: {len(assets)} SVGs, local image references, alt attributes and navigation anchors.")
print(f"Total SVG weight: {sum(p.stat().st_size for p in assets):,} bytes.")
gifs = sorted((ROOT / "assets").rglob("*.gif"))
assert len(gifs) == 12, "Expected 12 animated assets"
for path in gifs:
    header = path.read_bytes()[:10]
    assert header[:6] in {b"GIF89a", b"GIF87a"}, f"Invalid GIF: {path}"
    width, height = struct.unpack("<HH", header[6:10])
    assert width >= 540 and height >= 246, f"Invalid GIF dimensions: {path}"
    assert path.stat().st_size < 256 * 1024, f"GIF exceeds 256 KB: {path}"
print(f"PASS: {len(gifs)} GIFs; total {sum(p.stat().st_size for p in gifs):,} bytes. Motion frames verified by npm test.")
