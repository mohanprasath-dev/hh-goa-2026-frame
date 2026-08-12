import type { SinglePosterData, TeamPosterData } from '@/types/builder';
import { fitText } from './compositor';

/**
 * Brand colour palette constants.
 */
const COLORS = {
	deepGreen: '#0B3D2E',
	yellow: '#FFD400',
	pink: '#F0176D',
	cream: '#F5F0E1',
	white: '#FFFFFF',
} as const;

/**
 * Loads an image from Data URL or Blob URL safely for HTML5 Canvas rendering.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => resolve(img);
		img.onerror = (err) => reject(err);
		img.src = src;
	});
}

/**
 * Draws a scalloped/dashed decorative border frame on the canvas.
 */
function drawDecorativeBorder(ctx: CanvasRenderingContext2D, w: number, h: number): void {
	// Outer solid pink border
	ctx.strokeStyle = COLORS.pink;
	ctx.lineWidth = 12;
	ctx.strokeRect(24, 24, w - 48, h - 48);

	// Inner dashed yellow border
	ctx.strokeStyle = COLORS.yellow;
	ctx.lineWidth = 4;
	ctx.setLineDash([16, 10]);
	ctx.strokeRect(48, 48, w - 96, h - 96);
	ctx.setLineDash([]);

	// Corner accent dots — each corner gets a yellow circle + pink dot
	const corners = [
		[58, 58],
		[w - 58, 58],
		[58, h - 58],
		[w - 58, h - 58],
	];
	for (const [cx, cy] of corners) {
		ctx.beginPath();
		ctx.arc(cx, cy, 12, 0, Math.PI * 2);
		ctx.fillStyle = COLORS.yellow;
		ctx.globalAlpha = 0.8;
		ctx.fill();
		ctx.globalAlpha = 1;

		ctx.beginPath();
		ctx.arc(cx, cy, 5, 0, Math.PI * 2);
		ctx.fillStyle = COLORS.pink;
		ctx.fill();
	}
}

/**
 * Draws the brand wordmark header (HACKER / गोवा pill / HOUSE + GOA 2026).
 */
function drawWordmarkHeader(ctx: CanvasRenderingContext2D, centerX: number, startY: number): void {
	// "HACKER"
	ctx.fillStyle = COLORS.deepGreen;
	ctx.font = '900 68px Georgia, "Times New Roman", serif';
	ctx.textAlign = 'center';
	ctx.letterSpacing = '6px';
	ctx.fillText('HACKER', centerX, startY);

	// Devanagari गोवा pill badge
	const pillW = 200;
	const pillH = 56;
	const pillX = centerX - pillW / 2;
	const pillY = startY + 18;
	ctx.fillStyle = COLORS.pink;
	ctx.beginPath();
	ctx.roundRect(pillX, pillY, pillW, pillH, 28);
	ctx.fill();

	ctx.fillStyle = COLORS.white;
	ctx.font = 'bold 34px "Noto Sans Devanagari", sans-serif';
	ctx.letterSpacing = '0px';
	ctx.fillText('गोवा', centerX, pillY + 40);

	// Flanking decorative dots
	ctx.fillStyle = COLORS.yellow;
	ctx.beginPath();
	ctx.arc(pillX - 16, pillY + pillH / 2, 6, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(pillX + pillW + 16, pillY + pillH / 2, 6, 0, Math.PI * 2);
	ctx.fill();

	// "HOUSE"
	ctx.fillStyle = COLORS.deepGreen;
	ctx.font = '900 68px Georgia, "Times New Roman", serif';
	ctx.letterSpacing = '6px';
	ctx.fillText('HOUSE', centerX, pillY + pillH + 52);

	// Thin decorative lines
	ctx.strokeStyle = COLORS.yellow;
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(centerX - 180, startY - 28);
	ctx.lineTo(centerX + 180, startY - 28);
	ctx.stroke();

	// "GOA 2026" subtitle
	ctx.fillStyle = COLORS.deepGreen;
	ctx.font = '900 48px Georgia, "Times New Roman", serif';
	ctx.letterSpacing = '4px';
	ctx.fillText('GOA 2026', centerX, pillY + pillH + 110);
	ctx.letterSpacing = '0px';
}

/**
 * Draws a circular photo with dual ring frame, with initial-letter fallback.
 */
async function drawCircularPhoto(
	ctx: CanvasRenderingContext2D,
	photoUrl: string | null,
	name: string,
	centerX: number,
	centerY: number,
	radius: number
): Promise<void> {
	// Outer ring — pink (subtle accent)
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2);
	ctx.fillStyle = COLORS.pink;
	ctx.fill();

	// Inner ring — yellow (subtle accent)
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius + 3, 0, Math.PI * 2);
	ctx.fillStyle = COLORS.yellow;
	ctx.fill();

	// Circular clip region for photo
	ctx.save();
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
	ctx.clip();

	if (photoUrl) {
		try {
			const img = await loadImage(photoUrl);
			const diameter = radius * 2;
			const scale = Math.max(diameter / img.width, diameter / img.height);
			const drawW = img.width * scale;
			const drawH = img.height * scale;
			const drawX = centerX - drawW / 2;
			const drawY = centerY - drawH / 2;
			ctx.drawImage(img, drawX, drawY, drawW, drawH);
		} catch {
			drawPhotoFallback(ctx, name, centerX, centerY, radius);
		}
	} else {
		drawPhotoFallback(ctx, name, centerX, centerY, radius);
	}
	ctx.restore();
}

/**
 * Draws a fallback avatar with initial letter when no photo is available.
 */
function drawPhotoFallback(
	ctx: CanvasRenderingContext2D,
	name: string,
	centerX: number,
	centerY: number,
	radius: number
): void {
	ctx.fillStyle = COLORS.deepGreen;
	ctx.fillRect(
		centerX - radius,
		centerY - radius,
		radius * 2,
		radius * 2
	);
	ctx.fillStyle = COLORS.cream;
	ctx.font = `bold ${Math.round(radius * 0.9)}px sans-serif`;
	ctx.textAlign = 'center';
	ctx.fillText(
		name ? name.charAt(0).toUpperCase() : '?',
		centerX,
		centerY + radius * 0.3
	);
}

/**
 * Draws a small decorative stamp badge in the corner of the poster.
 */
function drawStampBadge(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
	// Stamp rect
	ctx.fillStyle = COLORS.cream;
	ctx.strokeStyle = COLORS.pink;
	ctx.lineWidth = 2;
	ctx.fillRect(x, y, size, size);
	ctx.strokeRect(x, y, size, size);

	// Dashed inner border
	ctx.setLineDash([3, 2]);
	ctx.strokeStyle = COLORS.deepGreen;
	ctx.lineWidth = 1;
	ctx.strokeRect(x + 6, y + 6, size - 12, size - 12);
	ctx.setLineDash([]);

	// Sun circle
	ctx.beginPath();
	ctx.arc(x + size / 2, y + size / 2, size * 0.15, 0, Math.PI * 2);
	ctx.fillStyle = COLORS.yellow;
	ctx.fill();

	// Text
	ctx.fillStyle = COLORS.deepGreen;
	ctx.font = `bold ${Math.round(size * 0.14)}px Georgia, serif`;
	ctx.textAlign = 'center';
	ctx.fillText('GOA', x + size / 2, y + size * 0.28);
	ctx.font = `bold ${Math.round(size * 0.12)}px Georgia, serif`;
	ctx.fillText('INDIA', x + size / 2, y + size * 0.82);
}

/**
 * Draws a simple palm tree decoration at the specified position.
 */
function drawPalmAccent(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number): void {
	ctx.save();
	ctx.translate(x, y);
	ctx.scale(scale, scale);
	ctx.globalAlpha = 0.15;

	// Trunk
	ctx.strokeStyle = COLORS.deepGreen;
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(0, 80);
	ctx.quadraticCurveTo(-5, 50, 0, 10);
	ctx.stroke();

	// Fronds — green
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(0, 10);
	ctx.quadraticCurveTo(-30, 0, -45, 15);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, 10);
	ctx.quadraticCurveTo(30, 0, 45, 15);
	ctx.stroke();

	// Fronds — yellow
	ctx.strokeStyle = COLORS.yellow;
	ctx.lineWidth = 2.5;
	ctx.beginPath();
	ctx.moveTo(0, 10);
	ctx.quadraticCurveTo(-20, 20, -35, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, 10);
	ctx.quadraticCurveTo(20, 20, 35, 30);
	ctx.stroke();

	ctx.globalAlpha = 1;
	ctx.restore();
}

/**
 * Draws the footer bar with #FrameInGoa and hhgoa.com.
 */
function drawFooterBar(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number
): void {
	// Gradient-like footer bar
	ctx.fillStyle = COLORS.deepGreen;
	ctx.beginPath();
	ctx.roundRect(x, y, w, h, 8);
	ctx.fill();

	// Subtle top highlight line
	ctx.strokeStyle = COLORS.yellow;
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(x + 8, y);
	ctx.lineTo(x + w - 8, y);
	ctx.stroke();

	ctx.font = 'bold 36px sans-serif';
	ctx.fillStyle = COLORS.yellow;
	ctx.textAlign = 'left';
	ctx.fillText('#FrameInGoa', x + 50, y + h / 2 + 13);

	ctx.fillStyle = COLORS.cream;
	ctx.textAlign = 'right';
	ctx.fillText('hhgoa.com', x + w - 50, y + h / 2 + 13);
}

/**
 * Renders the Single Builder Poster (1200 x 1600 px).
 * Layer compositing order: Background → Border → Header → Photo → Name → Title → Stack → Footer.
 */
export async function renderSinglePosterCanvas(
	data: SinglePosterData,
	canvas: HTMLCanvasElement
): Promise<void> {
	canvas.width = 1200;
	canvas.height = 1600;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	// Layer 1: Background Fill
	ctx.fillStyle = COLORS.cream;
	ctx.fillRect(0, 0, 1200, 1600);

	// Layer 2: Decorative Border Frame
	drawDecorativeBorder(ctx, 1200, 1600);

	// Decorative palm tree accents (background, subtle)
	drawPalmAccent(ctx, 100, 100, 1.2);
	drawPalmAccent(ctx, 1080, 120, -1.0);

	// Stamp badge in top-right area
	drawStampBadge(ctx, 1020, 80, 100);

	// Layer 3: Header Brand Wordmark
	drawWordmarkHeader(ctx, 600, 180);

	// Layer 4: Profile Photo
	await drawCircularPhoto(ctx, data.photoUrl, data.name, 600, 720, 220);

	// Layer 5: Name Banner
	ctx.fillStyle = COLORS.deepGreen;
	ctx.font = 'bold 72px sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText(data.name || 'Your Name', 600, 1050);

	// Layer 6: Builder Title Pill
	if (data.title) {
		ctx.font = 'bold 40px sans-serif';
		const titleWidth = Math.max(400, ctx.measureText(data.title).width + 80);
		ctx.fillStyle = COLORS.yellow;
		ctx.beginPath();
		ctx.roundRect(600 - titleWidth / 2, 1090, titleWidth, 76, 38);
		ctx.fill();

		ctx.fillStyle = COLORS.deepGreen;
		ctx.fillText(data.title, 600, 1144);
	}

	// Layer 7: Stack / Role Tag
	if (data.stack) {
		ctx.fillStyle = COLORS.pink;
		ctx.font = 'bold 32px sans-serif';
		ctx.fillText(`// ${data.stack}`, 600, 1240);
	}

	// Layer 8: Footer Bar
	drawFooterBar(ctx, 50, 1420, 1100, 110);
}

/** Asset path for team background */
const TEAM_BG_SRC = '/brand/team-card.png';

/**
 * Renders the Team Combine Poster (1536 x 1024 px).
 * Uses static /brand/team-card.png background and renders only member photos and names.
 */
export async function renderTeamPosterCanvas(
	data: TeamPosterData,
	canvas: HTMLCanvasElement
): Promise<void> {
	const W = 1536;
	const H = 1024;
	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	await document.fonts.ready;

	// 1. Draw static background image (team-card.png)
	try {
		const bgImg = await loadImage(TEAM_BG_SRC);
		ctx.drawImage(bgImg, 0, 0, W, H);
	} catch (err) {
		console.error('Failed to load team-card.png background:', err);
		ctx.fillStyle = COLORS.deepGreen;
		ctx.fillRect(0, 0, W, H);
	}

	// 2. Members data
	const members = [
		{
			name: data.primaryBuilder.name || 'Builder 01',
			photoUrl: data.primaryBuilder.photoUrl,
		},
		...data.teammates.map((t, idx) => ({
			name: t.name || `Builder 0${idx + 2}`,
			photoUrl: t.photoUrl,
		})),
	];

	const totalMembers = members.length;
	const sectionWidth = W / totalMembers;
	const centerY = 450;
	const radius = Math.min(135, sectionWidth * 0.28);

	// 3. Render ONLY member circular photo and name for each builder
	for (let i = 0; i < totalMembers; i++) {
		const member = members[i];
		const centerX = sectionWidth * i + sectionWidth / 2;

		// Draw circular photo with dual ring accent
		await drawCircularPhoto(ctx, member.photoUrl, member.name, centerX, centerY, radius);

		// Member Name (cream color, bold vintage font)
		const nameText = (member.name || '').toUpperCase();
		ctx.fillStyle = COLORS.cream;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		fitText(ctx, nameText, sectionWidth - 40, 36, 18, 'Georgia, "Times New Roman", serif', '900');
		ctx.fillText(nameText, centerX, centerY + radius + 46);
	}
}
