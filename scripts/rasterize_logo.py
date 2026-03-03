from __future__ import annotations
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ASSETS = Path("assets")
OUT_LOGO = ASSETS / "logo.png"
OUT_FAVICON = ASSETS / "favicon.png"
FONT_PATH = ASSETS / "fonts" / "LibreBaskerville-Regular.ttf"

SVG_VIEWBOX = 100.0
BG = "#191919"
FG = "#327dc8"
FONT_SIZE_VB = 67.0
TEXT_C_CENTER_VB = (26.0, 50.0)
TEXT_B_CENTER_VB = (74.0, 50.0)
STROKE_WIDTH_VB = 5.0
LINE_L_VB = ((19.0, 72.0), (19.0, 27.0))
LINE_R_VB = ((72.0, 75.0), (72.0, 27.0))

def draw_centered_text(draw: ImageDraw.ImageDraw, text: str, center_vb: tuple[float, float], font: ImageFont.FreeTypeFont, fill: str, scale: float) -> None:
    cx_vb, cy_vb = center_vb
    cx = cx_vb * scale
    cy = cy_vb * scale
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = int(round(cx - w / 2 - bbox[0]))
    y = int(round(cy - h / 2 - bbox[1]))
    draw.text((x, y), text, font=font, fill=fill)

def render_png(out_path: Path, size_px: int, supersample: int) -> None:
    render_size = size_px * supersample
    scale = render_size / SVG_VIEWBOX
    img = Image.new("RGBA", (render_size, render_size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([0, 0, render_size, render_size], fill=BG)
    if not FONT_PATH.exists():
        raise FileNotFoundError(f"Missing font: {FONT_PATH} (expected ./fonts/LibreBaskerville-Regular.ttf).")
    font_px = max(1, int(round(FONT_SIZE_VB * scale)))
    font = ImageFont.truetype(str(FONT_PATH), font_px)
    draw_centered_text(d, "C", TEXT_C_CENTER_VB, font, FG, scale)
    draw_centered_text(d, "B", TEXT_B_CENTER_VB, font, FG, scale)
    stroke_px = max(1, int(round(STROKE_WIDTH_VB * scale)))
    def to_px(p_vb: tuple[float, float]) -> tuple[int, int]:
        x, y = p_vb
        return (int(round(x * scale)), int(round(y * scale)))
    d.line([to_px(LINE_L_VB[0]), to_px(LINE_L_VB[1])], fill=FG, width=stroke_px)
    d.line([to_px(LINE_R_VB[0]), to_px(LINE_R_VB[1])], fill=FG, width=stroke_px)
    if supersample != 1:
        img = img.resize((size_px, size_px), Image.LANCZOS)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path)

def main() -> None:
    render_png(OUT_LOGO, size_px=1024, supersample=2)
    render_png(OUT_FAVICON, size_px=144, supersample=6)
    print("Wrote:")
    print(f" - {OUT_LOGO}")
    print(f" - {OUT_FAVICON}")

if __name__ == "__main__":
    main()
