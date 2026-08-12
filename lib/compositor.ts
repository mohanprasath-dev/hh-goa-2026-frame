/**
 * HH Goa 2026 Builder Card Compositor.
 *
 * Renders a 1024×1536 builder card using a static background image
 * with locked, pre-measured geometry. All coordinate values are measured
 * directly from card-background.png.
 */

import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { pickRandom, LOADOUT_POOL, STATUS_POOL } from './curated-pools';
import type { SinglePosterData, TeamPosterData } from '@/types/builder';

/* ────────────────────────────────────────────────────────────
 * LOCKED GEOMETRY — measured from card-background.png
 * ──────────────────────────────────────────────────────────── */

const CANVAS_W = 1024;
const CANVAS_H = 1536;

/** Photo circle */
const PHOTO_CX = 509;
const PHOTO_CY = 687;
const PHOTO_CLIP_R = 240; // 480px diameter clip

/** Ring overlay draw diameter */
const RING_DIAMETER = 510;

/** Goa sticker position & size (centered in wordmark gap between HACKER and HOUSE) */
const STICKER_CX = 505;
const STICKER_CY = 255;
const STICKER_W = 210;

/** Name bar zone (dark green bar) */
const NAME_Y_TOP = 1030;
const NAME_Y_BOT = 1095;
const NAME_X_LEFT = 60;
const NAME_X_RIGHT = 964;

/** Role pill zone (yellow outline pill) */
const ROLE_Y_TOP = 1120;
const ROLE_Y_BOT = 1170;
const ROLE_CX = CANVAS_W / 2;

/** Footer columns geometry */
/** Left column: SCAN TO VERIFY (Center X = 180, Box Y = 1265..1400) */
const COL_LEFT_CX = 180;
const QR_SIZE = 116;
const QR_TOP_Y = 1274;

/** Middle column: LOADOUT (Icon Ys = 1285, 1340, 1395, Text X = 475) */
const LOADOUT_TEXT_X = 475;
const LOADOUT_ROW_YS = [1285, 1340, 1395];

/** Right column: STATUS & BUILDER ID & BARCODE (Center X = 840) */
const COL_RIGHT_CX = 840;
const STATUS_START_Y = 1285;
const BUILDER_ID_Y = 1342;
const BARCODE_X = 735;
const BARCODE_Y = 1392;
const BARCODE_W = 210;
const BARCODE_H = 42;

/** Bottom hashtag ribbon */
const RIBBON_Y_CENTER = 1503;

/* ────────────────────────────────────────────────────────────
 * Brand palette
 * ──────────────────────────────────────────────────────────── */
const CREAM = '#F5F0E1';
const YELLOW = '#FFD400';
const PINK = '#F0176D';
const GREEN = '#0B3D2E';

/* ────────────────────────────────────────────────────────────
 * Asset paths (relative to /public/)
 * ──────────────────────────────────────────────────────────── */
const BG_SRC = '/brand/card-background.png';
const RING_SRC = '/brand/photo-ring.png';
const STICKER_SRC = '/brand/goa-sticker.png';

/* ────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────── */

export function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => resolve(img);
		img.onerror = (err) => reject(err);
		img.src = src;
	});
}

/**
 * Auto-shrink font size to fit text within a given pixel width.
 */
export function fitText(
	ctx: CanvasRenderingContext2D,
	text: string,
	maxWidth: number,
	maxFontSize: number,
	minFontSize: number,
	fontFamily: string,
	fontWeight = 'bold'
): number {
	let size = maxFontSize;
	while (size > minFontSize) {
		ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
		if (ctx.measureText(text).width <= maxWidth) break;
		size -= 1;
	}
	ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
	return size;
}

/**
 * Renders user photo on an offscreen canvas with 'cover' scaling,
 * warm color-grade filter (+15-20% warm saturation), and subtle grain,
 * then draws it into the main canvas clipped circle.
 * Prevents black gaps/vignette or canvas clip leaks.
 */
function renderPhotoCoverWithGrade(
	ctx: CanvasRenderingContext2D,
	photoImg: HTMLImageElement,
	cx: number,
	cy: number,
	radius: number
): void {
	const diameter = radius * 2; // 480

	// 1. Create offscreen canvas for exact 480x480 photo cover rendering
	const offscreen = document.createElement('canvas');
	offscreen.width = diameter;
	offscreen.height = diameter;
	const offCtx = offscreen.getContext('2d');
	if (!offCtx) return;

	// 2. Calculate Cover scaling (fill 480px completely on shorter dimension)
	const scale = Math.max(diameter / photoImg.width, diameter / photoImg.height);
	const drawW = photoImg.width * scale;
	const drawH = photoImg.height * scale;
	const drawX = (diameter - drawW) / 2;
	const drawY = (diameter - drawH) / 2;

	offCtx.drawImage(photoImg, drawX, drawY, drawW, drawH);

	// 3. Apply warm color grade + subtle grain to offscreen canvas pixels
	const imageData = offCtx.getImageData(0, 0, diameter, diameter);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const red = data[i];
		const green = data[i + 1];
		const blue = data[i + 2];

		// Warm saturation shift: boost red/green, suppress blue slightly
		data[i] = Math.min(255, red + 10);
		data[i + 1] = Math.min(255, green + 5);
		data[i + 2] = Math.max(0, blue - 8);

		// Subtle grain noise (±8)
		const noise = (Math.random() - 0.5) * 16;
		data[i] = Math.min(255, Math.max(0, data[i] + noise));
		data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
		data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
	}

	offCtx.putImageData(imageData, 0, 0);

	// 4. Draw offscreen canvas onto main canvas inside circular clip
	ctx.save();
	ctx.beginPath();
	ctx.arc(cx, cy, radius, 0, Math.PI * 2);
	ctx.clip();
	ctx.drawImage(offscreen, cx - radius, cy - radius);
	ctx.restore();
}

/**
 * Generates a QR code as an HTMLImageElement.
 */
export async function generateQRImage(
	text: string,
	size: number,
	darkColor: string = GREEN
): Promise<HTMLImageElement> {
	const dataUrl = await QRCode.toDataURL(text, {
		width: size,
		margin: 1,
		color: {
			dark: darkColor,
			light: '#00000000', // Transparent background
		},
		errorCorrectionLevel: 'M',
	});
	return loadImage(dataUrl);
}

/**
 * Generates a barcode as an HTMLCanvasElement.
 */
function generateBarcodeCanvas(text: string, width: number, height: number): HTMLCanvasElement {
	const barcodeCanvas = document.createElement('canvas');
	const cleanText = text.replace(/[^A-Z0-9-]/g, '');
	JsBarcode(barcodeCanvas, cleanText, {
		format: 'CODE128',
		width: 1.5,
		height,
		displayValue: false,
		background: 'transparent',
		lineColor: GREEN,
		margin: 0,
	});
	return barcodeCanvas;
}

/* ────────────────────────────────────────────────────────────
 * Builder ID client-side fetch + cache
 * ──────────────────────────────────────────────────────────── */

let cachedBuilderId: string | null = null;
let cachedVerified = false;

/**
 * Fetches a sequential builder ID from the API. Returns cached value
 * if already fetched. On failure, generates a client-side random fallback.
 */
export async function fetchBuilderId(): Promise<{ builderId: string; verified: boolean }> {
	if (cachedBuilderId) {
		return { builderId: cachedBuilderId, verified: cachedVerified };
	}

	try {
		const res = await fetch('/api/builder-id', { method: 'POST' });
		if (!res.ok) throw new Error(`API returned ${res.status}`);
		const data = await res.json();
		cachedBuilderId = data.builderId;
		cachedVerified = data.verified ?? false;
		return { builderId: cachedBuilderId!, verified: cachedVerified };
	} catch (err) {
		console.warn('Builder ID API unavailable, using client fallback:', err);
		const randomId = Math.floor(10000 + Math.random() * 90000);
		cachedBuilderId = `HH-GOA-R${randomId}`;
		cachedVerified = false;
		return { builderId: cachedBuilderId, verified: false };
	}
}

/**
 * Resets the cached builder ID so a new one is fetched on next export.
 */
export function resetBuilderId(): void {
	cachedBuilderId = null;
	cachedVerified = false;
}

/* ────────────────────────────────────────────────────────────
 * MAIN RENDER — Single Builder Card
 * ──────────────────────────────────────────────────────────── */

export interface CompositorRenderOptions {
	/** 'preview' skips QR/barcode/API. 'final' renders everything. */
	mode: 'preview' | 'final';
	/** Pre-fetched builder ID (avoids re-fetching in final mode). */
	builderId?: string;
}

/**
 * Renders the single builder poster card (1024 × 1536).
 * Returns the builder ID used (relevant in 'final' mode).
 */
export async function renderBuilderCard(
	data: SinglePosterData,
	canvas: HTMLCanvasElement,
	options: CompositorRenderOptions = { mode: 'preview' }
): Promise<{ builderId: string }> {
	canvas.width = CANVAS_W;
	canvas.height = CANVAS_H;
	const ctx = canvas.getContext('2d');
	if (!ctx) return { builderId: '' };

	// Ensure brand fonts are loaded before rendering
	await document.fonts.ready;

	/* ── 1. Background (card-background.png) ── */
	const bgImg = await loadImage(BG_SRC);
	ctx.drawImage(bgImg, 0, 0, CANVAS_W, CANVAS_H);

	/* ── 2. Goa sticker (goa-sticker.png) centered between HACKER and HOUSE ── */
	try {
		const stickerImg = await loadImage(STICKER_SRC);
		const stickerW = STICKER_W;
		const stickerH = stickerW * (stickerImg.naturalHeight / stickerImg.naturalWidth);
		const drawX = STICKER_CX - stickerW / 2;
		const drawY = STICKER_CY - stickerH / 2;
		ctx.drawImage(stickerImg, drawX, drawY, stickerW, stickerH);
	} catch {
		// Sticker load failure is non-critical
	}

	/* ── 3. User photo with cover scaling + warm grade + grain ── */
	if (data.photoUrl) {
		try {
			const photoImg = await loadImage(data.photoUrl);
			renderPhotoCoverWithGrade(ctx, photoImg, PHOTO_CX, PHOTO_CY, PHOTO_CLIP_R);
		} catch {
			drawPhotoFallback(ctx, data.name);
		}
	} else {
		drawPhotoFallback(ctx, data.name);
	}

	/* ── 4. Photo ring overlay (photo-ring.png) ── */
	try {
		const ringImg = await loadImage(RING_SRC);
		ctx.drawImage(
			ringImg,
			PHOTO_CX - RING_DIAMETER / 2,
			PHOTO_CY - RING_DIAMETER / 2,
			RING_DIAMETER,
			RING_DIAMETER
		);
	} catch {
		// Ring load failure is non-critical
	}

	/* ── 5. Name text inside dark green bar zone (y=1030..1095) ── */
	const nameText = (data.name || 'YOUR NAME').toUpperCase();
	const nameMaxW = NAME_X_RIGHT - NAME_X_LEFT - 40; // 864px max
	const nameCenterY = (NAME_Y_TOP + NAME_Y_BOT) / 2; // 1062.5
	ctx.fillStyle = CREAM;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	fitText(ctx, nameText, nameMaxW, 46, 22, "'Outfit', sans-serif", '900');
	ctx.fillText(nameText, CANVAS_W / 2, nameCenterY);

	/* ── 6. Role/title text inside yellow pill zone (y=1120..1170) ── */
	if (data.title) {
		const roleText = `⚡  ${data.title.toUpperCase()}  ⚡`;
		const roleMaxW = 540;
		const roleCenterY = (ROLE_Y_TOP + ROLE_Y_BOT) / 2; // 1145
		ctx.fillStyle = PINK;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		fitText(ctx, roleText, roleMaxW, 26, 14, "'Outfit', sans-serif", '700');
		ctx.fillText(roleText, ROLE_CX, roleCenterY);
	}

	/* ── Resolve builder ID ── */
	let builderId = options.builderId || '';
	if (!builderId) {
		const result = await fetchBuilderId();
		builderId = result.builderId;
	}

	/* ── 7. QR code (left footer column, inside dashed box below SCAN TO VERIFY) ── */
	try {
		const qrUrl = builderId
			? `https://hhgoa.com/verify/${builderId.replace('#', '')}`
			: 'https://hhgoa.com/verify';
		const qrImg = await generateQRImage(qrUrl, QR_SIZE, GREEN);
		const qrX = COL_LEFT_CX - QR_SIZE / 2;
		ctx.drawImage(qrImg, qrX, QR_TOP_Y, QR_SIZE, QR_SIZE);
	} catch {
		// QR generation failure is non-critical
	}

	/* ── 8. Loadout labels (middle footer column, aligned to icon Ys) ── */
	// Note: Header 'LOADOUT' is pre-printed on background. We render ONLY the 3 item labels.
	const loadoutItems = pickRandom(LOADOUT_POOL, 3);
	ctx.fillStyle = GREEN;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'middle';
	ctx.font = "bold 17px 'Outfit', sans-serif";

	for (let i = 0; i < loadoutItems.length; i++) {
		const itemY = LOADOUT_ROW_YS[i];
		ctx.fillText(loadoutItems[i], LOADOUT_TEXT_X, itemY);
	}

	/* ── 9. Status tagline & 10. Builder ID (right footer column) ── */
	// Note: Header 'STATUS' is pre-printed on background.
	const statusTagline = pickRandom(STATUS_POOL, 1)[0];
	const statusLines = statusTagline.split('\n');
	ctx.fillStyle = GREEN;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = "bold 15px 'Outfit', sans-serif";

	for (let i = 0; i < statusLines.length; i++) {
		ctx.fillText(statusLines[i], COL_RIGHT_CX, STATUS_START_Y + i * 22);
	}

	// Builder ID text below status tagline inside box
	const idText = builderId.startsWith('#') ? builderId : `#${builderId}`;
	ctx.fillStyle = GREEN;
	ctx.font = "bold 14px 'Outfit', sans-serif";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(idText, COL_RIGHT_CX, BUILDER_ID_Y);

	/* ── 11. Barcode (right footer column bottom) — final mode only ── */
	if (options.mode === 'final') {
		try {
			const barcodeClean = builderId.replace(/[^A-Z0-9]/gi, '');
			const barcodeCanvas = generateBarcodeCanvas(barcodeClean, BARCODE_W, BARCODE_H);
			ctx.drawImage(barcodeCanvas, BARCODE_X, BARCODE_Y, BARCODE_W, BARCODE_H);
		} catch {
			// Barcode generation failure is non-critical
		}
	}

	/* ── 12. Hashtag text in bottom pink ribbon ── */
	ctx.fillStyle = CREAM;
	ctx.font = "bold 24px 'Outfit', sans-serif";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('#FrameInGoa  ·  hhgoa.com  ·  HH GOA 2026', CANVAS_W / 2, RIBBON_Y_CENTER);

	return { builderId };
}

/**
 * Draws a fallback avatar circle with initial letter when no photo is available.
 */
function drawPhotoFallback(ctx: CanvasRenderingContext2D, name: string): void {
	ctx.save();
	ctx.beginPath();
	ctx.arc(PHOTO_CX, PHOTO_CY, PHOTO_CLIP_R, 0, Math.PI * 2);
	ctx.clip();

	ctx.fillStyle = GREEN;
	ctx.fillRect(
		PHOTO_CX - PHOTO_CLIP_R,
		PHOTO_CY - PHOTO_CLIP_R,
		PHOTO_CLIP_R * 2,
		PHOTO_CLIP_R * 2
	);
	ctx.fillStyle = CREAM;
	ctx.font = "bold 160px 'Outfit', sans-serif";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(
		name ? name.charAt(0).toUpperCase() : '?',
		PHOTO_CX,
		PHOTO_CY
	);
	ctx.restore();
}

/* ────────────────────────────────────────────────────────────
 * TEAM COMBINE MODE (Stub — awaiting team-background.png)
 * ──────────────────────────────────────────────────────────── */

export { renderTeamPosterCanvas } from './canvasCompositor';
