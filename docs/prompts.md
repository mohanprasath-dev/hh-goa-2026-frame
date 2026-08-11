# HH Goa 2026 Frame Generator — Build Prompts

Repo: `hh-goa-2026-frame`
Run these in order, one at a time, in Antigravity / Claude Code. Each step depends on the previous one.

---

## Prompt 1 — Project setup

```
Create a Next.js 14 App Router project called "hh-goa-frame" with TypeScript and Tailwind CSS. 
Set up the project for Vercel deployment. Create these routes/pages:
- / (main generator tool)
- No backend/API routes needed — everything runs client-side.
Install: react-easy-crop, heic2any (for iPhone HEIC support).
```

---

## Prompt 2 — Brand assets (SVG, hand-drawn since no logo file exists)

```
Create an SVG illustration library for "HH Goa 2026" branding, inspired by tropical Goa 
hacker-house aesthetic. Palette: deep green (#0B3D2E), yellow (#FFD400), pink/magenta (#F0176D), 
cream background (#F5F0E1).

Build these as standalone reusable SVG/React components:
1. Wordmark: "HACKER गोवा HOUSE" stacked text lockup (Devanagari गोवा in pink pill badge between HACKER/HOUSE in bold serif green)
2. Palm tree illustrations (2-3 variants, line-art style, yellow/green)
3. Postage-stamp badge: "GOA INDIA" with sun/wave icon
4. Circular seal: "BUILD IN GOA · SHIP FROM PARADISE"
5. Decorative border frame (dashed/scalloped, cream + pink)
6. Small icons: surfboard, signpost, beach hut

Keep everything as scalable SVG so it composites cleanly onto a Canvas element later.
```

---

## Prompt 3 — Upload + crop flow

```
Build the photo upload component:
- Drag-drop or tap-to-upload zone, accepts jpg/png/heic
- If HEIC, convert to JPEG client-side using heic2any before preview
- Use react-easy-crop for circular crop with pinch-zoom and drag-to-reposition 
  (must handle portrait, landscape, and off-center photos without forcing pre-cropping)
- Output: a cropped square image blob ready for canvas compositing
- Mobile-friendly touch targets, works well on small screens
```

---

## Prompt 4 — Form fields + title generator

```
Build a form with: Name (text input), Stack/Role (text input, optional), 
Builder Title (two modes — toggle between "Type your own" and "Randomize").

For randomize, create a builder title generator: combine a pool of adjectives 
(Terminal, Binary, Full-Stack, Async, Midnight, Beachside, Ctrl+Shift) 
with nouns (Wizard, Wanderer, Custodian, Architect, Beachcomber, Shipwright) 
to produce titles like "Terminal Wizard" or "Async Custodian". 
Weight it so results sound intentional, not random garbage — curate the word pools by hand, 
don't just cross-multiply blindly.
```

---

## Prompt 5 — Canvas compositor (the core generator)

```
Build the main canvas rendering function that composites the final poster:
- Canvas size 1200x1600 (portrait, good for X + mobile)
- Layer order: cream background → decorative border → wordmark top → 
  circular cropped photo (center, with pink/yellow ring) → name banner → 
  title pill → stack/role tag → footer bar with #FrameInGoa + hhgoa.com
- Use the SVG assets from Prompt 2, drawn onto canvas via Image() + drawImage
- Must render in under 2 seconds after user hits "Generate"
- Show live preview that updates as user edits name/title fields (debounced)
```

---

## Prompt 6 — Team combine mode

```
Add a secondary flow: "Add teammates" — let user upload 1-2 more photos with names.
Generate a second composite: horizontal layout with each teammate's circular photo + 
name + "Builder 0X" label side by side, same brand header/footer 
(reference the "TEAM" layout style — wide card, photos left-to-right, yellow header bar).
```

---

## Prompt 7 — Download

```
Add a "Download" button that exports the canvas as a PNG blob and triggers a browser download 
named "hh-goa-2026-[name].png". Must work on both desktop and mobile Safari/Chrome.
```

---

## Prompt 8 — Share to X

```
Add "Share to X" button:
- On mobile: use Web Share API (navigator.share) with the generated image file attached, 
  pre-filled text "I'm building at Hacker House Goa 2026 🌴 #FrameInGoa"
- On desktop (no file share support): fall back to opening 
  twitter.com/intent/tweet with pre-filled text + a link to a dynamic OG-image page
- Build a dynamic OG image route (/api/og or similar, using @vercel/og) that takes the 
  generated image data (via URL params or temp storage) and serves it as the link preview image, 
  so the X card shows the actual poster, not a blank thumbnail
```

---

## Prompt 9 — Mobile polish + speed pass

```
Audit the whole flow on a 375px viewport. Fix any layout breaks, ensure touch targets are 44px+, 
ensure upload→crop→generate→download completes in under 5 seconds total on a mid-range phone. 
Add a subtle loading state only if generation exceeds 500ms — otherwise keep it instant, no spinners.
```

---

## Prompt 10 — Deploy

```
Deploy this to Vercel. Give me the live URL. Confirm the OG image route works by testing 
the link preview (e.g. via Twitter Card Validator or similar).
```
