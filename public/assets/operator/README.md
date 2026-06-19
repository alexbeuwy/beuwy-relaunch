# Operator-Portrait — Drop-Zone

`founder.webp` ist gesetzt — importiert von beuwy.com (Bordeaux-Studio-Portrait,
markenkonform) und auf /immobilien als Operator-Bild verdrahtet. Wenn du ein
echtes Foto von dir hast, ersetze einfach `founder.webp` (4:3, < 400 KB).

Für /system und /sichtbar liegt der historische Drop-Pfad weiterhin bei:

    public/assets/operator/alexander-puetter.jpg

Bis die Datei existiert, zeigt der `<AssetSlot>` einen marken­konformen
Platzhalter mit Pfad + AI-Prompt — das Layout bricht nicht ein. Sobald die
Datei da ist, ersetzt das Foto den Platzhalter automatisch.

Verwendet auf:
- /system  (Sektion „Der Operator")
- /sichtbar (Sektion „Wer das baut")
- /immobilien (Sektion „Wer das macht")

## Empfohlene Specs
- Querformat 4:3 (z. B. 1600×1200), unter ~400 KB optimiert (jpg/webp)
- Editorial-Portrait, warmes Low-Key-Licht, Bordeaux-Hintergrund (#1A0404)

## AI-Prompt (bereits im Code hinterlegt)
> Editorial founder portrait, late-30s/40s German man, three-quarter angle,
> calm confident expression, looking slightly off-camera. Warm low-key studio
> light, deep bordeaux/oxblood background (#1A0404), soft golden rim light.
> Premium, cinematic, high-end magazine cover quality. Subtle film grain.
> Not corporate-stocky.
