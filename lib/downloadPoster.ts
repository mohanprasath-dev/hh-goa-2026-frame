/**
 * Sanitizes a builder name into a safe filename slug.
 * Optional cardStyle suffix for multi-card downloads.
 */
export function sanitizeFilename(name: string, cardStyle?: string): string {
	const cleanName = name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	const suffix = cardStyle ? `-${cardStyle}` : '';
	return cleanName ? `hh-goa-2026-${cleanName}${suffix}.png` : `hh-goa-2026-poster${suffix}.png`;
}

/**
 * Exports HTML5 Canvas to PNG Blob and triggers client download with iOS Safari fallback.
 */
export async function downloadPoster(
	canvas: HTMLCanvasElement,
	builderName: string,
	cardStyle?: string
): Promise<void> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (!blob) {
					reject(new Error('Failed to generate poster PNG image blob.'));
					return;
				}

				try {
					downloadBlob(blob, sanitizeFilename(builderName, cardStyle));
					resolve();
				} catch (err) {
					console.error('Download trigger error:', err);
					reject(err);
				}
			},
			'image/png',
			1.0
		);
	});
}

/** Triggers a browser download for an already-rendered PNG Blob. */
export function downloadBlob(blob: Blob, fileName: string): void {
	const blobUrl = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = blobUrl;
	a.download = fileName;
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}
