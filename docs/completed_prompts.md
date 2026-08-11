# HH Goa 2026 Frame Generator — Completed Build Prompts

Repo: `hh-goa-2026-frame`  
Run these prompts in order, one at a time, in your AI coding assistant (Antigravity / Claude Code / Cursor). Each step builds on top of the output of the previous step.

---

## Prompt 1 — Project Setup & Environment

```markdown
You are a senior full-stack web developer. Create a production-ready Next.js 14 App Router project called "hh-goa-frame" configured for Vercel deployment.

### Specifications & Requirements:
1. **Framework & Repository Setup**:
   - Next.js 14 using the App Router (`app/` directory).
   - Language: TypeScript.
   - Styling: Tailwind CSS.
   - Target Deployment Platform: Vercel.
   - Initialize Git repository (`git init`) and ensure standard `.gitignore` is created (excluding `.env*`, `node_modules`, `.next`).

2. **Routes & Architecture**:
   - `/` (Main generator tool page).
   - Pure client-side application architecture for the main generator tool flow.

3. **Dependencies**:
   - Install `react-easy-crop` for image cropping functionality.
   - Install `heic2any` for client-side iPhone HEIC image conversion support.
   - Install `@vercel/blob` for temporary poster image storage during social sharing.

4. **Project Structure**:
   - Set up standard directory structure (`app/`, `components/`, `lib/`, `public/`).
   - Configure Tailwind CSS with base styles and utilities.
   - Ensure proper TypeScript configurations and build scripts in `package.json`.

### Deliverables:
- Initialized Git repository and clean project directory structure for `hh-goa-frame`.
- Updated `package.json` with all required dependencies installed and scripts defined (`dev`, `build`, `start`, `lint`).
- Root layout (`app/layout.tsx`) and initial generator page component (`app/page.tsx`).
```

---

## Prompt 2 — Brand Assets (SVG Illustration Library)

```markdown
You are a frontend developer and vector graphics designer. Build an SVG illustration library for "HH Goa 2026" branding, inspired by a tropical Goa hacker-house aesthetic.

### Brand Color Palette:
- Deep Green: `#0B3D2E`
- Yellow: `#FFD400`
- Pink/Magenta: `#F0176D`
- Cream (Background): `#F5F0E1`

### Standalone Reusable Components:
Build each asset as a standalone, scalable React component (`.tsx`) exporting inline SVG elements with proper `viewBox` attributes for canvas compositing and crisp rendering:

1. **Wordmark (`Wordmark.tsx`)**:
   - Stacked text lockup: "HACKER गोवा HOUSE".
   - Devanagari "गोवा" rendered in a pink (`#F0176D`) pill badge positioned between "HACKER" and "HOUSE".
   - Font loading: Import and use a Devanagari-supporting font (e.g., `Noto Sans Devanagari` via `next/font/google` or Google Fonts import) to ensure Devanagari glyphs render accurately without system font fallback glitches.
   - "HACKER" and "HOUSE" in bold serif font styled in deep green (`#0B3D2E`).

2. **Palm Tree Illustrations (`PalmTrees.tsx`)**:
   - 2 to 3 distinct line-art style variants using the yellow (`#FFD400`) and green (`#0B3D2E`) palette.

3. **Postage-Stamp Badge (`StampBadge.tsx`)**:
   - Stamp badge featuring "GOA INDIA" text accompanied by a sun and wave icon.

4. **Circular Seal (`CircularSeal.tsx`)**:
   - Circular text seal displaying: "BUILD IN GOA · SHIP FROM PARADISE".

5. **Decorative Border Frame (`BorderFrame.tsx`)**:
   - Border frame with dashed/scalloped edges using cream (`#F5F0E1`) and pink (`#F0176D`).

6. **Icon Set (`BrandIcons.tsx`)**:
   - Line-art vector icons for: Surfboard, Signpost, and Beach Hut.

### Requirements:
- Ensure all SVG paths, dimensions, and colors are crisp, resolution-independent, and easily convertible to HTML5 Canvas `Image()` objects for canvas drawing.
```

---

## Prompt 3 — Upload + Crop Flow

```markdown
You are a React UI engineer. Build a responsive, mobile-friendly photo upload and cropping component for the frame generator.

### Core Features:
1. **Upload Zone (`PhotoUploader.tsx`)**:
   - Interactive drag-and-drop or tap-to-upload input accepting `.jpg`, `.png`, and `.heic` file formats.
   - Client-side HEIC handling: If a `.heic` file is uploaded, automatically convert it to JPEG using `heic2any` before generating the preview. Ensure browser/SSR safety for `heic2any`.

2. **Cropping Interface (`PhotoCropper.tsx`)**:
   - Integrate `react-easy-crop` configured for a 1:1 aspect ratio with a circular crop mask overlay.
   - Support smooth drag-to-reposition and pinch-to-zoom (or zoom slider control).
   - Gracefully handle portrait, landscape, and off-center photographs without forcing pre-cropping.

3. **Output Contract**:
   - Generate a clean, cropped square image Blob/Data URL ready to be passed directly to the canvas compositing engine.

4. **Mobile UX**:
   - Design with mobile-first touch targets (minimum 44px height/width).
   - Smooth layout on small viewports (375px+).
```

---

## Prompt 4 — Form Fields + Title Generator

```markdown
You are a frontend developer. Build the builder profile form component along with an intelligent, curated title generator.

### Form Inputs (`BuilderForm.tsx`):
1. **Name**: Text input field (required).
2. **Stack / Role**: Text input field (optional).
3. **Builder Title**: Mode toggle between:
   - "Type your own" (custom text input).
   - "Randomize" (generates a title using the curated word pools below).

### Title Generator Logic (`generateTitle.ts`):
Create a function that combines adjectives and nouns into a cohesive builder title.

- **Adjective Pool**: `Terminal`, `Binary`, `Full-Stack`, `Async`, `Midnight`, `Beachside`, `Ctrl+Shift`
- **Noun Pool**: `Wizard`, `Wanderer`, `Custodian`, `Architect`, `Beachcomber`, `Shipwright`

### Curation & Weighting Rules:
- Implement hand-curated pairing logic or weighted mapping so combinations sound intentional and natural (e.g., "Terminal Wizard", "Async Custodian", "Beachside Architect") rather than random garbage.
- Exclude jarring or awkward combinations.

### Integration:
- Output real-time form state changes back to the main generator view.
```

---

## Prompt 5 — Canvas Compositor (The Core Generator)

```markdown
You are a graphics and frontend engineer. Build the primary canvas rendering and compositing engine that generates the final HH Goa 2026 poster.

### Canvas Technical Specifications:
- Canvas dimensions: 1200 x 1600 pixels (portrait, optimized for X/Twitter posts and mobile displays).
- Performance Target: Complete rendering in under 2 seconds upon triggering "Generate".
- Live Preview: Real-time debounced preview updating as the user edits name/title fields (debounce threshold < 500ms).

### Layer Compositing Order (Bottom to Top):
1. **Layer 1 (Background)**: Solid cream (`#F5F0E1`) background fill.
2. **Layer 2 (Border)**: Decorative border frame drawn inside canvas edges.
3. **Layer 3 (Header)**: Brand Wordmark ("HACKER गोवा HOUSE") centered at the top.
4. **Layer 4 (Profile Photo)**: Centered circular cropped user photo framed with a dual pink (`#F0176D`) and yellow (`#FFD400`) ring border.
5. **Layer 5 (Name Banner)**: User's name displayed prominently below the photo.
6. **Layer 6 (Title Pill)**: Builder title rendered inside a styled pill badge.
7. **Layer 7 (Stack/Role Tag)**: User's stack/role text displayed beneath the title.
8. **Layer 8 (Footer Bar)**: Footer container featuring `#FrameInGoa` and `hhgoa.com`.

### Technical Implementation:
- Render SVG assets (from Prompt 2) onto the HTML5 Canvas via `Image()` elements and `ctx.drawImage()`.
- Ensure accurate text alignment, crisp typography rendering, and proper DPI scaling.
```

---

## Prompt 6 — Team Combine Mode

```markdown
You are a frontend developer. Extend the frame generator with a secondary "Team Combine Mode" that enables multi-builder poster generation.

### Specifications & Workflow:
1. **Teammate Upload Flow**:
   - Add an "Add Teammates" secondary workflow allowing the user to upload and crop photos for 1 to 2 additional teammates with their respective names.

2. **Team Layout Compositing**:
   - Generate a wide horizontal composite card layout referencing the "TEAM" brand layout style.
   - Layer structure:
     - Top yellow header bar (`#FFD400`).
     - Horizontal side-by-side arrangement of circular cropped photos (left to right).
     - Each photo paired with its teammate's name and a "Builder 0X" sequential label (e.g., "Builder 01", "Builder 02").
     - Retain consistent HH Goa 2026 header/footer branding elements.

3. **State Management**:
   - Provide seamless toggle between Single Builder Mode and Team Combine Mode without losing primary builder input data.
```

---

## Prompt 7 — Download Engine

```markdown
You are a web developer. Implement a robust canvas export and client-side download utility for the generated poster.

### Functional Requirements:
1. **Download Trigger**:
   - Add a prominent "Download" button to the preview UI.
   - Upon click, export the HTML5 Canvas content as a PNG image Blob.

2. **File Naming**:
   - Format filename dynamically as `hh-goa-2026-[name].png` (sanitizing the user's name for safe file naming, e.g., lowercased and space-hyphenated).

3. **Cross-Browser & Mobile Fallback Handling**:
   - Ensure reliable download functionality across Desktop Chrome/Firefox/Safari and Mobile iOS Safari/Android Chrome.
   - Use `URL.createObjectURL()` with an invisible anchor tag trigger (`<a download>`).
   - **iOS Safari Fallback**: Test on real iOS Safari — if the automatic blob download trigger fails or is unsupported, fall back gracefully to opening the generated PNG image in a new browser tab accompanied by clear user instructions: *"Long-press image to Save to Photos"*.
   - Revoke blob object URLs after download initiation to prevent memory leaks.
```

---

## Prompt 8 — Share to X & Vercel Blob Integration

```markdown
You are a full-stack engineer. Build the "Share to X" functionality featuring native mobile sharing and a Vercel Blob storage integration for desktop social card previews.

### Architecture & Requirements:

1. **Client-to-Storage Bridge (Vercel Blob)**:
   - Since poster generation is performed entirely client-side on the HTML5 Canvas, build a lightweight upload handler using `@vercel/blob`.
   - When the user clicks "Share to X", upload the final PNG Blob to Vercel Blob storage to receive a public image URL.
   - Skip complex server-side canvas re-rendering in `/api/og` — use the returned Vercel Blob public URL directly as the social image parameter.

2. **Share to X Component (`ShareButton.tsx`)**:
   - **Mobile Flow**: Check `navigator.canShare` for files. If supported, invoke native Web Share API with the generated poster PNG file attached and pre-filled copy: `"I'm building at Hacker House Goa 2026 🌴 #FrameInGoa"`.
   - **Desktop Fallback**: If file sharing is unsupported, upload the poster PNG to Vercel Blob, obtain the public URL, and open `https://x.com/intent/post` (or `twitter.com/intent/tweet`) in a new tab with pre-filled text `"I'm building at Hacker House Goa 2026 🌴 #FrameInGoa"` and the public image link for X link preview rendering.
```

---

## Prompt 9 — Mobile Polish & Performance Optimization

```markdown
You are a performance and mobile UX engineer. Conduct an audit and polish pass on the complete application flow.

### Audit & Optimization Targets:
1. **Mobile Responsiveness**:
   - Verify layout on a 375px mobile viewport width.
   - Ensure all interactive elements, buttons, and form inputs maintain touch target sizes of at least 44px x 44px.
   - Eliminate horizontal overflow and layout shifts.

2. **End-to-End Flow Performance**:
   - Optimize the complete pipeline (upload → HEIC convert → crop → canvas render → download) to complete within 5 seconds total on mid-range mobile devices.

3. **Loading UX Rules**:
   - Keep generation instantaneous where possible without intrusive spinners.
   - Show a subtle loading indicator ONLY if poster generation takes longer than 500ms. If under 500ms, display no spinners or loader flashes.
```

---

## Prompt 10 — Vercel Deployment & OG Verification

```markdown
You are a DevOps and deployment engineer. Deploy the completed HH Goa 2026 Frame Generator project to Vercel and verify all live integrations.

### Deployment Checklist:
1. **Vercel Deployment**:
   - Deploy the Next.js project to Vercel (using Vercel CLI or Git integration).
   - Configure Vercel Blob storage environment credentials (`BLOB_READ_WRITE_TOKEN`).
   - Confirm clean build compilation without TypeScript or ESLint errors.
   - Output the live production URL.

2. **Social Share & Link Preview Validation**:
   - Test the "Share to X" desktop flow on the live domain to verify Vercel Blob uploads.
   - Test and confirm social preview card rendering (via Twitter/X Card Validator or social debuggers) to verify poster images render clearly on shared links.
```
