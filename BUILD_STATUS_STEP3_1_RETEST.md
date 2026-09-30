# Aether Partner Path — STEP 3.1 Retest

## What changed
- Reconstructed the `/partners` desktop composition against the approved 1600×900 preview rather than the previous loose approximation.
- Restored the compact Aether top navigation and gold CTA treatment.
- Rebuilt the hero as a split composition: approved dark orbital environment + live dashboard-style right-side preview.
- Repositioned the six approved tier medallion assets into the hero progression.
- Rebuilt the proof strip and the calculator / Partner Score / Consul row to match the approved density and proportions.
- Rebuilt the tier progression, fraud protection, and admin preview row using the approved raster assets and live HTML text.
- Reduced the visibility of panel artwork so it behaves as a subtle material/frame rather than a large photographic background.

## Validation actually performed
- TSX syntax transpilation: PASS for the modified page and components.
- Asset-reference audit: PASS; all referenced `/assets/...` paths resolve.
- Existing economics/scoring/abuse smoke test: PASS using direct TypeScript transpilation without dependency installation.
- Deterministic 1600×900 visual QA render: generated and inspected as `AETHER_STEP3_1_RETEST.jpg`.

## Environment limitation
- `npm install --ignore-scripts` timed out in the managed environment, so a full Next.js dependency install and production browser click-through could not be completed here.
- The visual retest therefore used a deterministic compositor built from the same production assets and layout measurements, and the source was separately syntax- and asset-checked.
