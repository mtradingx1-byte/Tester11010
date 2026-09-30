# STEP 3.1 Asset Fit Correction

## Problem found
The previous QA build used several assets that were not truly standalone: one Consul globe export was a low-resolution crop, the globe treatment came from a mixed UI composition, the fraud artwork retained neighbouring admin UI, and the hero-stage crop retained a sliver of unrelated copy.

## Corrected assets
- `public/assets/reference/consul-globe.png` — 640x640 RGBA, isolated globe artwork derived from the approved preview.
- `public/assets/reference/partner-score-orb.png` — 512x512 RGBA, isolated score orb derived from the approved preview.
- `public/assets/reference/hero-stage.png` — 1240x600 RGB, trimmed hero progression artwork with no neighbouring text panel.
- `public/assets/reference/fraud-shield.png` — 360x434 RGBA, isolated shield artwork with no adjacent admin UI.

## Integration changes
- `/partners` now references only the corrected standalone assets.
- `ScoreOrb.tsx` now uses the corrected PNG rather than the generic SVG approximation.
- Consul and Fraud sections use the corrected standalone artwork.
- Visual CSS was tightened so the image boxes stay inside their panel bounds.

## QA
- 1600x900 visual QA render generated from the same static harness used for placement validation.
- Corrected assets manually inspected against the approved reference.
- No missing `/assets/...` references in the modified `/partners` page.
- Old superseded reference crops removed from the QA build to prevent accidental reuse.
