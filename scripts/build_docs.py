# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from __future__ import annotations
import html
import json
import re
import shutil
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
DOCS_DIR = ROOT_DIR / "docs"
DOCS_BUILD_DIR = DOCS_DIR / "build"
DOCS_EXAMPLES_DIR = DOCS_DIR / "examples"
EXAMPLES_DIR = ROOT_DIR / "examples"
ASSETS_DIR = ROOT_DIR / "assets"
PACKAGE_PATH = ROOT_DIR / "package.json"
EXAMPLE_TITLE_PATTERN = re.compile(r"^\s*\*\s+Chalkboard - (.+?) Example\s*$", re.MULTILINE)
EXAMPLE_BANNER_PATTERN = re.compile(
    r"^/\*\r?\n"
    r" \* Chalkboard - .+? Example\r?\n"
    r" \*\r?\n"
    r" \* This Source Code Form is subject to the terms of the Mozilla Public\r?\n"
    r" \* License, v\. 2\.0\. If a copy of the MPL was not distributed with this\r?\n"
    r" \* file, You can obtain one at http://mozilla\.org/MPL/2\.0/\.\r?\n"
    r" \*/\r?\n*",
    re.DOTALL
)
SCROLLABLE_EXAMPLES = {"ode-study"}

def read_version() -> str:
    package = json.loads(PACKAGE_PATH.read_text(encoding="utf-8"))
    version = package.get("version")
    if not isinstance(version, str) or not version:
        raise ValueError(f"Missing package version: {PACKAGE_PATH}")
    return version

def run_typedoc() -> None:
    npm = shutil.which("npm")
    if npm is None:
        raise FileNotFoundError("Unable to find npm.")
    subprocess.run([npm, "--prefix", str(DOCS_DIR), "run", "docs"], cwd=ROOT_DIR, check=True)
    if not (DOCS_BUILD_DIR / "index.html").is_file():
        raise FileNotFoundError(f"TypeDoc did not produce: {DOCS_BUILD_DIR / 'index.html'}")

def read_example_title(source_path: Path) -> str:
    source = source_path.read_text(encoding="utf-8")
    match = EXAMPLE_TITLE_PATTERN.search(source)
    if match is None:
        raise ValueError(f"Invalid example banner: {source_path}")
    return match.group(1)

def render_example_page(source_path: Path, version: str) -> str:
    name = source_path.stem
    title = html.escape(read_example_title(source_path), quote=False)
    source = source_path.read_text(encoding="utf-8")
    source, substitutions = EXAMPLE_BANNER_PATTERN.subn("", source, count=1)
    if substitutions != 1:
        raise ValueError(f"Invalid example banner: {source_path}")
    source = source.rstrip()
    source = re.sub(r"</script", r"<\\/script", source, flags=re.IGNORECASE)
    body_style = "margin: 0; padding: 0;" if name in SCROLLABLE_EXAMPLES else "margin: 0; padding: 0; overflow: hidden;"
    return f"""<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>{title} | Chalkboard - v{version}</title>
        <link href="./assets/favicon.png" rel="icon" type="image/x-icon">
        <style>
            body {{ {body_style} }}
        </style>
    </head>
    <body>
        <canvas id="canvas"></canvas>
        <script src="https://cdn.jsdelivr.net/gh/Zushah/Chalkboard@{version}/dist/Chalkboard.min.js"></script>
        <script>
{source}
        </script>
    </body>
</html>
"""

def build_examples(version: str) -> None:
    example_sources = sorted(EXAMPLES_DIR.glob("*.js"))
    if not example_sources:
        raise FileNotFoundError(f"No examples found: {EXAMPLES_DIR}")
    index_source = DOCS_EXAMPLES_DIR / "index.html"
    if not index_source.is_file():
        raise FileNotFoundError(f"Missing examples index: {index_source}")
    index = index_source.read_text(encoding="utf-8")
    if "{{VERSION}}" not in index:
        raise ValueError(f'Missing "{{{{VERSION}}}}" placeholder: {index_source}')
    for source_path in example_sources:
        href = f'./{source_path.stem}.html'
        if href not in index:
            raise ValueError(f"Examples index does not link to generated page: {href}")
    examples_build_dir = DOCS_BUILD_DIR / "examples"
    examples_assets_dir = examples_build_dir / "assets"
    examples_assets_dir.mkdir(parents=True, exist_ok=True)
    (examples_build_dir / "index.html").write_text(index.replace("{{VERSION}}", version), encoding="utf-8")
    shutil.copy2(ASSETS_DIR / "favicon.png", examples_assets_dir / "favicon.png")
    for source_path in example_sources:
        output_path = examples_build_dir / f"{source_path.stem}.html"
        output_path.write_text(render_example_page(source_path, version), encoding="utf-8")

def main() -> None:
    version = read_version()
    run_typedoc()
    build_examples(version)
    print(f"Documentation build successful: {DOCS_BUILD_DIR}")

if __name__ == "__main__":
    main()
