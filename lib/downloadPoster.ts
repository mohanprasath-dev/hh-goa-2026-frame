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

				const fileName = sanitizeFilename(builderName, cardStyle);
				const isIOS =
					/iPad|iPhone|iPod/.test(navigator.userAgent) ||
					(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

				const blobUrl = URL.createObjectURL(blob);

				try {
					if (isIOS) {
						// iOS Safari Fallback: Open PNG in new tab for long-press saving
						const newWindow = window.open(blobUrl, '_blank');
						if (!newWindow) {
							// If popup blocked, fallback to standard link download
							const a = document.createElement('a');
							a.href = blobUrl;
							a.download = fileName;
							document.body.appendChild(a);
							a.click();
							document.body.removeChild(a);
						}
					} else {
						// Standard Desktop Chrome/Firefox/Android Chrome trigger
						const a = document.createElement('a');
						a.href = blobUrl;
						a.download = fileName;
						a.style.display = 'none';
						document.body.appendChild(a);
						a.click();
						document.body.removeChild(a);
					}

					// Revoke blob URL after 10 seconds to allow browser save completing
					setTimeout(() => {
						URL.revokeObjectURL(blobUrl);
					}, 10000);

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
