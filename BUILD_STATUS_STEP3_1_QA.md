# STEP 3.1 QA — Partners visual integration

## Scope
Rebuilt the `/partners` marketing composition against the approved `AETHER_PARTNER_PATH_v0_1_PREVIEW.jpg` grid and retained the existing calculator/economics/scoring logic.

## Visual corrections made
- Removed the incorrect full top navigation from the preview composition.
- Matched the approved 1600x900 row structure: preview strip, hero/dashboard row, five-column proof row, three-column middle row, three-column lower row.
- Reworked hero typography scale, left text column, hero artwork placement and dark-to-art blend.
- Reworked mini dashboard proportions, KPI density, chart/action areas and score orb presentation.
- Reworked calculator density and added the comparison row shown in the reference.
- Replaced the cropped score-orb UI image with the clean standalone `score-orb.svg`.
- Added reference-derived standalone pictorial assets for the hero stage, Consul globe and fraud artwork.
- Tightened middle and lower card heights to align with the approved preview's composition.

## Automated checks
- TypeScript transpile check for modified TSX files: PASS.
- Production asset reference audit: PASS, 0 missing referenced assets.
- Economics/scoring/abuse smoke test: PASS (6/6 assertions).
- Chromium visual QA render at 1600x900: PASS, no broken images.
- Chromium layout QA at 1280px: PASS, no horizontal overflow.
- Chromium layout QA at 768px: PASS, no horizontal overflow.

## Environment limitation
Full `tsc --noEmit` / Next production build could not be completed because project dependencies are not installed in the managed container (`react`, `next`, `lucide-react`, `framer-motion`, Prisma and Vitest type packages are absent). The source itself was syntax-transpiled successfully and the project logic smoke test was executed separately.

## Visual note
The final preview is materially closer to the approved composition than the previous retest, but it is not pixel-identical. The remaining difference is primarily in the live dashboard artwork/content inside the hero-right panel and some raster artwork treatment. The approved reference remains the visual master.


## Asset-fit correction pass
- Replaced low-resolution / mixed-composition Consul globe with a 640x640 standalone RGBA globe derived from the approved reference.
- Replaced the generic score-orb treatment with a 512x512 standalone PNG derived from the approved reference.
- Replaced hero-stage crop containing residual neighbouring copy with a clean 1240x600 hero-stage export.
- Replaced fraud artwork retaining adjacent admin UI with a 360x434 isolated shield asset.
- Updated `/partners` and `ScoreOrb` to reference only the corrected assets.
- Removed the superseded reference crops from the QA build.
- Regenerated 1600x900 visual QA preview after the asset corrections.
