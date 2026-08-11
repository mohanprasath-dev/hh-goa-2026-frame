import type { SinglePosterData, TeamPosterData } from '@/types/builder';

// TODO (Opus 4.6): Prompt 5 & Prompt 6 - Canvas Compositor Engine
// Opus 4.6 will replace the vector graphic drawing logic with full SVG-to-Canvas compositing.

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
 * Renders the Single Builder Poster (1200 x 1600 px).
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
	ctx.fillStyle = '#F5F0E1';
	ctx.fillRect(0, 0, 1200, 1600);

	// Layer 2: Decorative Outer Border Frame
	ctx.strokeStyle = '#F0176D';
	ctx.lineWidth = 12;
	ctx.strokeRect(30, 30, 1140, 1540);

	ctx.strokeStyle = '#FFD400';
	ctx.lineWidth = 6;
	ctx.setLineDash([20, 12]);
	ctx.strokeRect(50, 50, 1100, 1500);
	ctx.setLineDash([]); // Reset dash pattern

	// Layer 3: Header Brand Wordmark
	ctx.fillStyle = '#0B3D2E';
	ctx.font = '900 64px serif';
	ctx.textAlign = 'center';
	ctx.fillText('HACKER HOUSE', 600, 150);

	// Devanagari Goa Pill Badge
	ctx.fillStyle = '#F0176D';
	ctx.beginPath();
	ctx.roundRect(500, 175, 200, 60, 30);
	ctx.fill();

	ctx.fillStyle = '#FFFFFF';
	ctx.font = 'bold 36px sans-serif';
	ctx.fillText('गोवा', 600, 218);

	ctx.fillStyle = '#0B3D2E';
	ctx.font = '900 52px serif';
	ctx.fillText('GOA 2026', 600, 300);

	// Layer 4: Profile Photo (Circular crop with dual ring frame)
	const centerX = 600;
	const centerY = 650;
	const radius = 230;

	// Dual Ring Frame (Pink & Yellow)
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius + 24, 0, Math.PI * 2);
	ctx.fillStyle = '#F0176D';
	ctx.fill();

	ctx.beginPath();
	ctx.arc(centerX, centerY, radius + 12, 0, Math.PI * 2);
	ctx.fillStyle = '#FFD400';
	ctx.fill();

	// Circular Photo Crop Clip
	ctx.save();
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
	ctx.clip();

	if (data.photoUrl) {
		try {
			const img = await loadImage(data.photoUrl);
			ctx.drawImage(
				img,
				centerX - radius,
				centerY - radius,
				radius * 2,
				radius * 2
			);
		} catch {
			// Fallback user avatar background
			ctx.fillStyle = '#0B3D2E';
			ctx.fillRect(
				centerX - radius,
				centerY - radius,
				radius * 2,
				radius * 2
			);
		}
	} else {
		// Fallback user avatar background
		ctx.fillStyle = '#0B3D2E';
		ctx.fillRect(
			centerX - radius,
			centerY - radius,
			radius * 2,
			radius * 2
		);
		ctx.fillStyle = '#F5F0E1';
		ctx.font = 'bold 120px sans-serif';
		ctx.fillText(
			data.name ? data.name.charAt(0).toUpperCase() : '?',
			centerX,
			centerY + 40
		);
	}
	ctx.restore();

	// Layer 5: Name Banner
	ctx.fillStyle = '#0B3D2E';
	ctx.font = 'bold 72px sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText(data.name || 'Your Name', 600, 1000);

	// Layer 6: Builder Title Pill
	if (data.title) {
		ctx.fillStyle = '#FFD400';
		ctx.beginPath();
		const titleWidth = Math.max(400, ctx.measureText(data.title).width + 80);
		ctx.roundRect(600 - titleWidth / 2, 1050, titleWidth, 76, 38);
		ctx.fill();

		ctx.fillStyle = '#0B3D2E';
		ctx.font = 'bold 40px sans-serif';
		ctx.fillText(data.title, 600, 1104);
	}

	// Layer 7: Stack / Role Tag
	if (data.stack) {
		ctx.fillStyle = '#F0176D';
		ctx.font = 'bold 32px sans-serif';
		ctx.fillText(`// ${data.stack}`, 600, 1200);
	}

	// Layer 8: Footer Bar
	ctx.fillStyle = '#0B3D2E';
	ctx.fillRect(50, 1420, 1100, 100);

	ctx.fillStyle = '#FFD400';
	ctx.font = 'bold 36px sans-serif';
	ctx.textAlign = 'left';
	ctx.fillText('#FrameInGoa', 100, 1482);

	ctx.fillStyle = '#F5F0E1';
	ctx.textAlign = 'right';
	ctx.fillText('hhgoa.com', 1100, 1482);
}

/**
 * Renders the Team Combine Poster (1600 x 900 px).
 */
export async function renderTeamPosterCanvas(
	data: TeamPosterData,
	canvas: HTMLCanvasElement
): Promise<void> {
	canvas.width = 1600;
	canvas.height = 900;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	// Background
	ctx.fillStyle = '#F5F0E1';
	ctx.fillRect(0, 0, 1600, 900);

	// Top Yellow Header Bar
	ctx.fillStyle = '#FFD400';
	ctx.fillRect(0, 0, 1600, 140);

	ctx.fillStyle = '#0B3D2E';
	ctx.font = '900 48px serif';
	ctx.textAlign = 'left';
	ctx.fillText('HACKER HOUSE GOA 2026', 60, 88);

	ctx.fillStyle = '#F0176D';
	ctx.font = 'bold 32px sans-serif';
	ctx.textAlign = 'right';
	ctx.fillText('TEAM SQUAD', 1540, 88);

	// Calculate team members list
	const members = [
		{
			name: data.primaryBuilder.name || 'Builder 01',
			photoUrl: data.primaryBuilder.photoUrl,
			role: data.primaryBuilder.title || 'Lead Builder',
		},
		...data.teammates.map((t, idx) => ({
			name: t.name || `Builder 0${idx + 2}`,
			photoUrl: t.photoUrl,
			role: `Builder 0${idx + 2}`,
		})),
	];

	const totalMembers = members.length;
	const sectionWidth = 1600 / totalMembers;

	for (let i = 0; i < totalMembers; i++) {
		const member = members[i];
		const centerX = sectionWidth * i + sectionWidth / 2;
		const centerY = 450;
		const radius = 150;

		// Dual Ring
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius + 16, 0, Math.PI * 2);
		ctx.fillStyle = '#F0176D';
		ctx.fill();

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
		ctx.fillStyle = '#FFD400';
		ctx.fill();

		// Circular Photo Clip
		ctx.save();
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
		ctx.clip();

		if (member.photoUrl) {
			try {
				const img = await loadImage(member.photoUrl);
				ctx.drawImage(
					img,
					centerX - radius,
					centerY - radius,
					radius * 2,
					radius * 2
				);
			} catch {
				ctx.fillStyle = '#0B3D2E';
				ctx.fillRect(
					centerX - radius,
					centerY - radius,
					radius * 2,
					radius * 2
				);
			}
		} else {
			ctx.fillStyle = '#0B3D2E';
			ctx.fillRect(
				centerX - radius,
				centerY - radius,
				radius * 2,
				radius * 2
			);
			ctx.fillStyle = '#F5F0E1';
			ctx.font = 'bold 80px sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(
				member.name ? member.name.charAt(0).toUpperCase() : '?',
				centerX,
				centerY + 28
			);
		}
		ctx.restore();

		// Label "Builder 0X"
		ctx.fillStyle = '#F0176D';
		ctx.font = 'bold 24px sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText(`BUILDER 0${i + 1}`, centerX, centerY + 210);

		// Name
		ctx.fillStyle = '#0B3D2E';
		ctx.font = 'bold 36px sans-serif';
		ctx.fillText(member.name, centerX, centerY + 255);
	}

	// Footer Bar
	ctx.fillStyle = '#0B3D2E';
	ctx.fillRect(0, 810, 1600, 90);

	ctx.fillStyle = '#FFD400';
	ctx.font = 'bold 32px sans-serif';
	ctx.textAlign = 'left';
	ctx.fillText('#FrameInGoa', 60, 866);

	ctx.fillStyle = '#F5F0E1';
	ctx.textAlign = 'right';
	ctx.fillText('hhgoa.com', 1540, 866);
}
