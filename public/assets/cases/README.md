# Case asset slots

Each `<AssetSlot>` on the site references a file here. Drop the file with
the matching name and it replaces the placeholder automatically — no code
change needed.

## Homepage

| Slot                                     | Path                                       | Aspect | Notes |
|------------------------------------------|--------------------------------------------|--------|-------|
| Dream — robot reads brand                | `agent-reads-brand.jpg`                    | 16/9   | The "Lieber Agent" visual from your reference images. |

## /work

| Case        | Path               | Aspect | Notes |
|-------------|--------------------|--------|-------|
| Vision RE   | `vision.jpg`       | 16/9   | KKR JV / corporate moody. |
| Königswege  | `koenigswege.jpg`  | 16/9   | Finance editorial. |
| acta        | `acta.jpg`         | 16/9   | Real estate Instagram hero. |
| PURELEI     | `purelei.jpg`      | 16/9   | Lifestyle / founder portrait. |
| hellogetsafe| `hellogetsafe.jpg` | 16/9   | Insurtech pre-Series-A. |
| Snocks      | `snocks.jpg`       | 16/9   | DTC content hero. |

## How to source

1. **Real photo** — preferred. Drop your client-approved photo at the path
   above. Recommended: 1600×900 JPG @ ~180 KB, sRGB.

2. **AI-generated** — use the `prompt` shown on each placeholder. Run it
   through Midjourney / Flux Pro / Imagen 3. Keep the bordeaux + yellow
   palette so it stays consistent with the site.

3. **Video** — pass `type="video"` to `<AssetSlot>` and point at an mp4
   instead. Same path, .mp4 extension.

## What renders when a file is missing

The slot stays as a brand-consistent placeholder: diagonal yellow stripes,
a pulsing halo, the asset path printed in mono. Layout doesn't collapse —
the slot reserves the full aspect ratio.
