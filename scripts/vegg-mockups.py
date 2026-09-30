# /// script
# requires-python = ">=3.10"
# dependencies = ["opencv-python-headless", "numpy"]
# ///
"""Lager de fotografiske flisene til galleriveggen i heroen (src/components/Vegg.jsx).

Tre steg per flis, samme løp som appveggen på appstart.no:

  1. scene    Gemini får det ekte skjermbildet og plasserer det på en telefon
              eller laptop i en setting.
  2. nokkel   Gemini fyller skjermflaten i scenen med ren magenta.
  3. flis     Det ekte skjermbildet legges perspektivriktig inn i magentaflaten.

Steg 2 og 3 finnes fordi modellen tegner skjermbildet om igjen i steg 1, med
grøtete tekst og bokstaver som ikke stemmer. Etter steg 3 er hver piksel på
skjermen hentet fra kundens faktiske side. Se likevel alltid på arket før
flisene tas i bruk.

    export GEMINI_API_KEY=...
    node scripts/vegg-kilder.mjs /tmp/vegg/kilde          # skjermbildene
    uv run scripts/vegg-mockups.py /tmp/vegg              # alle flisene
    uv run scripts/vegg-mockups.py /tmp/vegg kolflaath-mobil --tving

Skriver <arbeidsmappe>/{scene,nokkel,flis}/<id>.png og til slutt
public/websider/vegg/<id>.webp (480 px bred, flisene vises rundt 170 px).
Et steg som allerede har en fil hoppes over, med mindre --tving er satt.
"""
import argparse, base64, json, os, subprocess, sys, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import cv2
import numpy as np

API = "https://generativelanguage.googleapis.com/v1beta/models"
ROT = Path(__file__).resolve().parent.parent

# Felles stil, ordrett lik foran hvert motiv, ellers driver settet.
STIL = (
    "Photorealistic product mockup photograph for a design portfolio. Minimal "
    "editorial set design, soft natural studio light, realistic contact shadows, "
    "subtle depth of field on the background only. The device is modern, thin, "
    "with a plain black bezel and no brand marks. The device screen displays "
    "EXACTLY the attached screenshot: reproduce it faithfully with the same "
    "layout, colours, icons and text, nothing added, removed, translated or "
    "redrawn. The screen is sharp, evenly lit, free of glare and reflections, "
    "and the screenshot fills the display edge to edge. No other text, logos, "
    "watermarks, hands or people anywhere. The whole device is inside the frame "
    "with generous margin. Scene: "
)

NOKKEL = (
    "Edit this photo: replace everything shown on the device display with one completely flat, "
    "uniform, pure magenta (#FF00FF) fill that covers the entire display area edge to edge, including "
    "where the status bar, notch or camera cutout was. No content, no text, no reflections, no glare, "
    "no gradient on the display. Keep the device, its position, the bezel, the scene, the lighting and "
    "the framing exactly as they are."
)

# Settingene holder seg til Oppskalert-paletten: felt #e6e5f6, felt-kant
# #cbc9e4, blekk #12111d, fersken #ffb17a, leire #b8551a. Stein, papir og
# podium er de eneste materialene. Formatet må stemme med flisklassen i
# Vegg.jsx: 1:1 er flis-kvadrat, 2:3 er flis-hoy, 4:5 er standard.
JOBBER = {
    "woxen-hage-pc": ("1:1", "an open silver laptop seen from the front at a slight angle, sitting on a pale limestone slab, with a soft lilac (#e6e5f6) wall behind and gentle leaf-shaped window-light shadows on the wall."),
    "katrin-brubakk-mobil": ("2:3", "a smartphone resting tilted on a matte near-black ink-coloured surface (#12111d), seen from a three-quarter angle, moody low-key light with one soft warm peach (#ffb17a) spotlight on the device."),
    "alpha-negotiations-pc": ("4:5", "an open dark graphite laptop seen from the front at a slight angle, standing on a low round podium painted terracotta clay (#b8551a), in front of a seamless warm peach (#ffb17a) backdrop, hard late-afternoon sunlight casting a crisp diagonal shadow."),
    "steinar-husby-mobil": ("2:3", "a smartphone leaning upright against a rough pale travertine stone block, with a muted lilac (#cbc9e4) wall behind, soft daylight from the left."),
    "melanie-dahl-mobil": ("2:3", "a smartphone lying on a warm peach (#ffb17a) paper backdrop, photographed from above at a slight angle and rotated about 15 degrees, with one large curved sheet of the same peach paper rising behind it and casting a soft shadow."),
    "appstart-pc": ("1:1", "an open dark graphite laptop seen from a three-quarter angle on a polished dark stone plinth, against a deep near-black ink (#12111d) backdrop with one soft lilac (#cbc9e4) rim light from the right."),
    "tore-sunde-rasmussen-mobil": ("2:3", "a smartphone standing upright on a low round podium painted muted lilac (#cbc9e4), in front of a seamless off-white plaster wall, daylight from the left."),
    "progressive-diplomacy-pc": ("4:5", "an open silver laptop seen from slightly above, sitting on a lilac (#e6e5f6) paper backdrop with one large curved sheet of the same lilac paper rising behind it and casting a soft shadow."),
    "samtaleverkstedet-pc": ("4:5", "an open silver laptop seen from the front at a slight angle, sitting on a pale travertine stone block, with a saturated terracotta clay (#b8551a) wall behind, hard sunlight casting a crisp diagonal shadow."),
    "kolflaath-mobil": ("2:3", "a smartphone standing upright and turned slightly to the left on a seamless soft lilac (#e6e5f6) backdrop, with a soft long shadow falling to the right."),
    "katrin-brubakk-pc": ("1:1", "an open dark graphite laptop seen from a three-quarter angle on a matte near-black ink-coloured surface (#12111d), moody low-key light with one soft warm peach (#ffb17a) rim light from the left."),
    "woxen-hage-mobil": ("2:3", "a smartphone leaning upright against two stacked pale limestone blocks, with a warm peach (#ffb17a) wall behind, hard late-afternoon sunlight casting a crisp diagonal shadow."),
}


def gemini(modell, tekst, bilde, aspekt, ut):
    body = {
        "contents": [{"parts": [
            {"inlineData": {"mimeType": "image/png", "data": base64.b64encode(bilde.read_bytes()).decode()}},
            {"text": tekst},
        ]}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": aspekt}},
    }
    nokkel = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    req = urllib.request.Request(f"{API}/{modell}:generateContent?key={nokkel}",
                                 data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            svar = json.load(r)
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"HTTP {e.code} {e.read().decode()[:300]}")
    for kand in svar.get("candidates", []):
        for del_ in kand.get("content", {}).get("parts", []):
            blob = del_.get("inlineData") or del_.get("inline_data")
            if blob:
                ut.write_bytes(base64.b64decode(blob["data"]))
                return
    raise RuntimeError(f"ingen bilde-part i svaret: {json.dumps(svar)[:300]}")


def komponer(nokkelbilde, skjermbilde, ut):
    """Legger skjermbildet perspektivriktig inn i magentaflaten."""
    key = cv2.imread(str(nokkelbilde)).astype(np.float32)
    shot = cv2.imread(str(skjermbilde))
    B, G, R = key[..., 0], key[..., 1], key[..., 2]

    # Magenta-het: høy R og B, lav G. Lilla og fersken i scenene gir 0.
    alpha = np.clip((np.minimum(R, B) - G - 30) / 100, 0, 1)
    mask = (alpha > 0.5).astype(np.uint8)
    n, lab, stats, _ = cv2.connectedComponentsWithStats(mask)
    if n < 2:
        raise RuntimeError("fant ingen magentaflate")
    storst = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    mask = (lab == storst).astype(np.uint8)
    alpha *= cv2.dilate(mask, np.ones((9, 9), np.uint8))

    # Skjermen har avrundede hjørner, så hjørnene finnes ved å tilpasse en
    # linje til midtpartiet av hver side og krysse nabolinjene.
    kontur = max(cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[0], key=cv2.contourArea)
    hull = cv2.convexHull(kontur)
    eps = 0.01 * cv2.arcLength(hull, True)
    while len(approx := cv2.approxPolyDP(hull, eps, True)) > 4:
        eps *= 1.2
    if len(approx) != 4:
        raise RuntimeError(f"fant {len(approx)} hjørner, ikke 4")
    q = approx[:, 0, :].astype(np.float32)
    pts = kontur[:, 0, :].astype(np.float32)
    linjer = []
    for i in range(4):
        a, b = q[i], q[(i + 1) % 4]
        d = b - a
        t = ((pts - a) @ d) / (d @ d)
        rel = pts - a
        avst = np.abs(d[0] * rel[:, 1] - d[1] * rel[:, 0]) / np.linalg.norm(d)
        side = pts[(t > 0.2) & (t < 0.8) & (avst < 0.06 * np.linalg.norm(d))]
        vx, vy, x0, y0 = cv2.fitLine(side, cv2.DIST_L2, 0, 0.01, 0.01).ravel()
        linjer.append((np.array([x0, y0]), np.array([vx, vy])))

    def x2(u, v):
        return u[0] * v[1] - u[1] * v[0]

    def kryss(l1, l2):
        (p, r), (s, u) = l1, l2
        return p + r * (x2(s - p, u) / x2(r, u))

    hj = np.array([kryss(linjer[i - 1], linjer[i]) for i in range(4)], np.float32)

    # Med klokka i bildekoordinater, så finn toppkanten: den øverste av
    # kortsidene for stående skjermbilde, den øverste av langsidene for liggende.
    if cv2.contourArea(hj, oriented=True) < 0:
        hj = hj[::-1]
    lengde = [np.linalg.norm(hj[(i + 1) % 4] - hj[i]) for i in range(4)]
    staaende = shot.shape[0] > shot.shape[1]
    par = sorted(range(4), key=lambda i: lengde[i] if staaende else -lengde[i])[:2]
    topp = min(par, key=lambda i: hj[i][1] + hj[(i + 1) % 4][1])
    dst = np.roll(hj, -topp, axis=0)  # TL, TR, BR, BL

    h, w = shot.shape[:2]
    M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), dst)
    warp = cv2.warpPerspective(shot, M, (key.shape[1], key.shape[0]), flags=cv2.INTER_AREA,
                               borderMode=cv2.BORDER_REPLICATE).astype(np.float32)

    # Fjern magenta-skjær i kanten av underlaget før blanding.
    base = key.copy()
    base[..., 2] = np.where(alpha > 0, np.minimum(R, G), R)
    base[..., 0] = np.where(alpha > 0, np.minimum(B, G), B)
    cv2.imwrite(str(ut), (base * (1 - alpha[..., None]) + warp * alpha[..., None]).astype(np.uint8))


def lag(navn, a):
    aspekt, scene = JOBBER[navn]
    arb = Path(a.arbeidsmappe)
    kilde = arb / "kilde" / f"{navn}.png"
    sti = {s: arb / s / f"{navn}.png" for s in ("scene", "nokkel", "flis")}
    for p in sti.values():
        p.parent.mkdir(parents=True, exist_ok=True)
    try:
        if a.tving or not sti["scene"].exists():
            gemini(a.model, STIL + scene, kilde, aspekt, sti["scene"])
            sti["nokkel"].unlink(missing_ok=True)  # en ny scene gjør den gamle nøkkelen ugyldig
        if not sti["nokkel"].exists():
            gemini(a.model, NOKKEL, sti["scene"], aspekt, sti["nokkel"])
        komponer(sti["nokkel"], kilde, sti["flis"])
        ut = ROT / "public/websider/vegg" / f"{navn}.webp"
        ut.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["cwebp", "-quiet", "-q", "82", "-resize", "480", "0", str(sti["flis"]), "-o", str(ut)], check=True)
        return f"{navn}: ok"
    except Exception as e:
        return f"{navn}: FEIL {e}"


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("arbeidsmappe")
    p.add_argument("navn", nargs="*", default=list(JOBBER))
    p.add_argument("--model", default="gemini-3.1-flash-image")
    p.add_argument("--tving", action="store_true", help="lag scenen på nytt selv om den finnes")
    a = p.parse_args()
    if not (os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")):
        sys.exit("Sett GEMINI_API_KEY først.")
    with ThreadPoolExecutor(6) as ex:
        for linje in ex.map(lambda n: lag(n, a), a.navn):
            print(linje)
