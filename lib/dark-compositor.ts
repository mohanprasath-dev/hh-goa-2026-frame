/**
 * HH Goa 2026 Dark Card Suite Compositor.
 *
 * Renders three card types using static background images
 * with locked, pre-measured geometry:
 *   1. Dark ID Front (1024×1536) — photo + name/role/title text
 *   2. Dark ID Back  (1024×1536) — QR code + builder ID
 *   3. PFP Frame     (1254×1254) — photo only
 *
 * All coordinate values are measured directly from the actual
 * PNG assets on disk.
 */

import { loadImage, fitText, generateQRImage, fetchBuilderId } from './compositor';
import type { SinglePosterData } from '@/types/builder';

/* ────────────────────────────────────────────────────────────
 * SHARED CONSTANTS
 * ──────────────────────────────────────────────────────────── */

const FONT_FAMILY = "'Outfit', sans-serif";

/** Brand palette — dark card suite */
const CREAM = '#F5F0E1';
const ORANGE = '#E8871E';
const DARK_BG = '#1A1A2E';

/** Asset paths */
const ID_FRONT_SRC = '/brand/id-front.png';
const ID_BACK_SRC = '/brand/id-back.png';

/* ────────────────────────────────────────────────────────────
 * FRONT CARD GEOMETRY (1024×1536)
 * ──────────────────────────────────────────────────────────── */

const FRONT_W = 1024;
const FRONT_H = 1536;

/** Photo square — 480×480, centered at (332, 810) */
const FRONT_PHOTO_CX = 332;
const FRONT_PHOTO_CY = 810;
const FRONT_PHOTO_SIZE = 480;

/**
 * Text field zones — to the right of the photo square.
 * Only VALUES rendered here; labels (BUILDER, ROLE/STACK, BUILDER TITLE)
 * are baked into the background art.
 *
 * Each row structure:
 *   - Icon + label text (baked in) at top of row
 *   - Underline separator (baked in)
 *   - Empty value zone below underline ← VALUES RENDERED HERE
 *
 * Positions verified against rendered output:
 *   - Label icons at y ≈ 575, 720, 860
 *   - Underlines at y ≈ 605, 745, 890
 *   - Value zones at y ≈ 640, 785, 925
 */
const TEXT_X_LEFT = 660;
const TEXT_X_RIGHT = 960;
const TEXT_MAX_W = TEXT_X_RIGHT - TEXT_X_LEFT; // 300px
const TEXT_X_CENTER = (TEXT_X_LEFT + TEXT_X_RIGHT) / 2;

/** Name value — in the empty zone below the BUILDER label (y=617) and line (y=700) */
const NAME_Y = 680;
/** Role/Stack value — in the empty zone below the ROLE / STACK label (y=783) and line (y=874) */
const ROLE_Y = 860;
/** Builder Title value — in the empty zone below the BUILDER TITLE label (y=960) and line (y=1043) */
const TITLE_Y = 1025;

/* ────────────────────────────────────────────────────────────
 * BACK CARD GEOMETRY (1024×1536)
 * ──────────────────────────────────────────────────────────── */

const BACK_W = 1024;
const BACK_H = 1536;

/**
 * QR code — inside the dashed circle in the VERIFICATION panel.
 * Crosshair center measured from the actual asset.
 */
const QR_CX = 850;
const QR_CY = 840;
const QR_RENDER_SIZE = 190; // Fits inside ~190px dashed circle with margin

/**
 * Builder ID value slot — in the SYSTEM panel.
 * "BUILDER ID : " label is baked in; the placeholder value "HH/GOA/2026"
 * is also baked in at x=520, y=744. We render the actual builder ID directly on top
 * of that placeholder to replace it.
 */
const BUILDER_ID_X = 530;
const BUILDER_ID_Y = 744;



/* ────────────────────────────────────────────────────────────
 * SHARED HELPERS
 * ──────────────────────────────────────────────────────────── */

/**
 * Renders user photo with COVER scaling into a square clip region.
 * Prevents black gaps by ensuring the photo's shorter dimension
 * fills the clip area exactly, with center-crop on overflow.
 */
function renderPhotoCoverSquare(
	ctx: CanvasRenderingContext2D,
	photoImg: HTMLImageElement,
	cx: number,
	cy: number,
	size: number
): void {
	const halfSize = size / 2;

	// Offscreen canvas for cover scaling
	const offscreen = document.createElement('canvas');
	offscreen.width = size;
	offscreen.height = size;
	const offCtx = offscreen.getContext('2d');
	if (!offCtx) return;

	// Cover scaling: shorter dimension fills exactly
	const scale = Math.max(size / photoImg.width, size / photoImg.height);
	const drawW = photoImg.width * scale;
	const drawH = photoImg.height * scale;
	const drawX = (size - drawW) / 2;
	const drawY = (size - drawH) / 2;

	offCtx.drawImage(photoImg, drawX, drawY, drawW, drawH);

	// Clip to square and draw onto main canvas
	ctx.save();
	ctx.beginPath();
	ctx.rect(cx - halfSize, cy - halfSize, size, size);
	ctx.clip();
	ctx.drawImage(offscreen, cx - halfSize, cy - halfSize);
	ctx.restore();
}

/* ────────────────────────────────────────────────────────────
 * Render options interface (reused across all dark card types)
 * ──────────────────────────────────────────────────────────── */

export interface DarkCompositorOptions {
	/** 'preview' skips QR/API calls. 'final' renders everything. */
	mode: 'preview' | 'final';
	/** Pre-fetched builder ID (avoids re-fetching in final mode). */
	builderId?: string;
}

/* ────────────────────────────────────────────────────────────
 * 1. DARK ID FRONT — renderDarkIdFront()
 * ──────────────────────────────────────────────────────────── */

/**
 * Renders the Dark ID Front card (1024×1536).
 * Draw order: background → photo (square clip) → text values (no labels).
 */
export async function renderDarkIdFront(
	data: SinglePosterData,
	canvas: HTMLCanvasElement,
	options: DarkCompositorOptions = { mode: 'preview' }
): Promise<{ builderId: string }> {
	canvas.width = FRONT_W;
	canvas.height = FRONT_H;
	const ctx = canvas.getContext('2d');
	if (!ctx) return { builderId: '' };

	await document.fonts.ready;

	/* ── 1. Background ── */
	const bgImg = await loadImage(ID_FRONT_SRC);
	ctx.drawImage(bgImg, 0, 0, FRONT_W, FRONT_H);

	/* ── 2. User photo — 480×480 square clip, COVER scaled ── */
	if (data.photoUrl) {
		try {
			const photoImg = await loadImage(data.photoUrl);
			renderPhotoCoverSquare(ctx, photoImg, FRONT_PHOTO_CX, FRONT_PHOTO_CY, FRONT_PHOTO_SIZE);
		} catch {
			drawSquareFallback(ctx, data.name, FRONT_PHOTO_CX, FRONT_PHOTO_CY, FRONT_PHOTO_SIZE);
		}
	} else {
		drawSquareFallback(ctx, data.name, FRONT_PHOTO_CX, FRONT_PHOTO_CY, FRONT_PHOTO_SIZE);
	}

	/* ── 3. Name text (cream) — value only, no "BUILDER" label ── */
	const nameText = (data.name || '').toUpperCase();
	if (nameText) {
		ctx.fillStyle = CREAM;
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		fitText(ctx, nameText, TEXT_MAX_W, 28, 14, FONT_FAMILY, '900');
		ctx.fillText(nameText, TEXT_X_LEFT, NAME_Y);
	}

	/* ── 4. Role/Stack text (orange) — value only, no "ROLE / STACK" label ── */
	const roleText = (data.stack || '').toUpperCase();
	if (roleText) {
		ctx.fillStyle = ORANGE;
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		fitText(ctx, roleText, TEXT_MAX_W, 24, 12, FONT_FAMILY, '700');
		ctx.fillText(roleText, TEXT_X_LEFT, ROLE_Y);
	}

	/* ── 5. Builder Title text (cream) — value only, no "BUILDER TITLE" label ── */
	const titleText = (data.title || '').toUpperCase();
	if (titleText) {
		ctx.fillStyle = CREAM;
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		fitText(ctx, titleText, TEXT_MAX_W, 24, 12, FONT_FAMILY, '700');
		ctx.fillText(titleText, TEXT_X_LEFT, TITLE_Y);
	}

	return { builderId: options.builderId || '' };
}

/* ────────────────────────────────────────────────────────────
 * 2. DARK ID BACK — renderDarkIdBack()
 * ──────────────────────────────────────────────────────────── */

/**
 * Renders the Dark ID Back card (1024×1536).
 * Draw order: background → QR code (final only) → builder ID text.
 * No photo on back card.
 */
export async function renderDarkIdBack(
	data: SinglePosterData,
	canvas: HTMLCanvasElement,
	options: DarkCompositorOptions = { mode: 'preview' }
): Promise<{ builderId: string }> {
	canvas.width = BACK_W;
	canvas.height = BACK_H;
	const ctx = canvas.getContext('2d');
	if (!ctx) return { builderId: '' };

	await document.fonts.ready;

	/* ── 1. Background ── */
	const bgImg = await loadImage(ID_BACK_SRC);
	ctx.drawImage(bgImg, 0, 0, BACK_W, BACK_H);

	/* ── Resolve builder ID ── */
	let builderId = options.builderId || '';
	if (!builderId) {
		const result = await fetchBuilderId();
		builderId = result.builderId;
	}

	/* ── 2. QR code — inside the dashed circle crosshair ── */
	try {
		const qrUrl = builderId
			? `https://hhgoa.taskdrift.in/verify/${builderId.replace('#', '')}`
			: 'https://hhgoa.taskdrift.in/verify';
		const qrImg = await generateQRImage(qrUrl, QR_RENDER_SIZE, CREAM);
		ctx.drawImage(
			qrImg,
			QR_CX - QR_RENDER_SIZE / 2,
			QR_CY - QR_RENDER_SIZE / 2,
			QR_RENDER_SIZE,
			QR_RENDER_SIZE
		);
	} catch {
		// QR generation failure is non-critical
	}

	/* ── 3. Builder ID value — next to "BUILDER ID :" label in SYSTEM panel ── */
	const idDisplayText = builderId.startsWith('#') ? builderId.substring(1) : builderId;

	// Render dynamic Builder ID text in orange (#E8871E) with 100% transparent background
	ctx.fillStyle = ORANGE;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'middle';
	ctx.font = `bold 18px ${FONT_FAMILY}`;
	ctx.fillText(idDisplayText, BUILDER_ID_X, BUILDER_ID_Y);

	return { builderId };
}



/* ────────────────────────────────────────────────────────────
 * Fallback avatar for square clip areas
 * ──────────────────────────────────────────────────────────── */

/**
 * Draws a fallback initial-letter square when no photo is available.
 */
function drawSquareFallback(
	ctx: CanvasRenderingContext2D,
	name: string,
	cx: number,
	cy: number,
	size: number
): void {
	const halfSize = size / 2;
	ctx.save();
	ctx.beginPath();
	ctx.rect(cx - halfSize, cy - halfSize, size, size);
	ctx.clip();

	ctx.fillStyle = DARK_BG;
	ctx.fillRect(cx - halfSize, cy - halfSize, size, size);

	ctx.fillStyle = CREAM;
	const fontSize = Math.round(size * 0.35);
	ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(
		name ? name.charAt(0).toUpperCase() : '?',
		cx,
		cy
	);
	ctx.restore();
}
