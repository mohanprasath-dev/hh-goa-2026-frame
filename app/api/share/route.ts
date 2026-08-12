import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

/**
 * POST /api/share
 * Accepts a poster PNG as FormData file upload, stores it in Vercel Blob,
 * and returns the public URL for social sharing.
 */
export async function POST(request: Request): Promise<NextResponse> {
	if (!process.env.BLOB_READ_WRITE_TOKEN) {
		return NextResponse.json(
			{ error: 'Vercel Blob storage is not configured. Add BLOB_READ_WRITE_TOKEN to your environment variables.' },
			{ status: 503 }
		);
	}

	try {
		const formData = await request.formData();
		const file = formData.get('poster') as File | null;

		if (!file) {
			return NextResponse.json(
				{ error: 'No poster file provided in form data.' },
				{ status: 400 }
			);
		}

		// Validate the file is actually an image
		if (!file.type.startsWith('image/')) {
			return NextResponse.json(
				{ error: 'Invalid file type. Only image files are accepted.' },
				{ status: 400 }
			);
		}

		// Upload to Vercel Blob storage
		const blob = await put(file.name || 'poster.png', file, {
			access: 'public',
			addRandomSuffix: true,
		});

		return NextResponse.json({ url: blob.url });
	} catch (error) {
		console.error('Share upload error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Unknown upload error';
		const isConfigurationIssue = /token|unauthorized|access denied|store does not exist|suspended/i.test(errorMessage);

		if (isConfigurationIssue) {
			return NextResponse.json(
				{ error: 'Vercel Blob storage token is invalid or store is not accessible.' },
				{ status: 503 }
			);
		}

		return NextResponse.json(
			{ error: `Failed to upload poster for sharing: ${errorMessage}` },
			{ status: 500 }
		);
	}
}

