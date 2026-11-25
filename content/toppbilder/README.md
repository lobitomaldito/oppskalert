# Toppbilder til bloggen

45 toppbilder laget 12.11.2026 med `image-gen`-skillen (Gemini, `gemini-3.1-flash-image`),
i samme papirklipp-stil som `public/blogg/norsk-domene.webp`: mørk marineblå bakgrunn,
dempet blågrå og grønn, én oransje detalj. `stil.txt` er stilen ordrett, `motiver.json`
ett motiv per innlegg.

Nytt innlegg: legg motivet til i `motiver.json` og kjør

```bash
python3 ~/.claude/skills/image-gen/scripts/gemini_image.py --model gemini-3.1-flash-image \
  --out /tmp/toppbilder --aspect 16:9 --style "$(cat content/toppbilder/stil.txt)" \
  --jobs '[{"id":"<slug>","prompt":"<motiv>"}]'
cwebp -q 78 -resize 1600 900 /tmp/toppbilder/<slug>.png -o public/blogg/<slug>.webp
```

Sett så `hero: "/blogg/<slug>.webp"` i innlegget. Ingen tekst i bildene: stilen sier det,
og et bilde med tekst brekker når det vises smalt.
