# STEP 3.1 Asset-Fit Final QA

## Root cause found
The prior STEP 3.1 passes used reconstructed reference artwork that did not match the approved preview and placed the proof strip at the wrong hierarchy level. The middle row was also compressed to 236px, which forced the calculator, score, and Consul visuals to be undersized.

## Corrections
- Proof strip is now inside the left hero column, directly beneath the hero artwork.
- Right-side partner dashboard spans the full hero height.
- Middle row is restored to the approved three-panel proportion.
- Bottom row remains a compact three-panel band.
- Hero, Consul globe, Partner Score orb, and Fraud shield now use direct crops from the approved master preview at native display-scale dimensions.
- Deprecated reconstructed hero/globe/shield/score files were removed from production assets.
- No page-wide screenshot is used as a runtime background or overlay.

## Static QA
- 1600x900 render generated with WeasyPrint: PASS.
- Deprecated asset references: 0.
- Asset dimension checks: PASS.
- Source references only the corrected reference crops for the four complex visual pieces.
- Existing economics/scoring code was not modified in this pass.

## Environment limitation
A managed Chromium binary was not usable for a final browser screenshot in this container, so the QA render used the production static HTML/CSS composition at the target 1600x900 size. This is recorded explicitly rather than marked as a browser click-through pass.
