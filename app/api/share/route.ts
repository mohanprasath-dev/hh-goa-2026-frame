import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

/**
 * POST /api/share
 * Accepts a poster PNG as FormData file upload, stores it in Vercel Blob,
 * and returns the public URL for social sharing.
 */
export async function POST(request: Request): Promise<NextResponse> {
	try {
		const formData = await request.formData();
		const file = formData.get('poster') as File | null;

		if (!file) {
			return NextResponse.json(
				{ error: 'No poster file provided in form data.' },
				{ status: 400 }
			);
		}

		// Validate the file is actually a PNG image
		if (!file.type.startsWith('image/')) {
			return NextResponse.json(
				{ error: 'Invalid file type. Only image files are accepted.' },
				{ status: 400 }
			);
		}

		// Upload to Vercel Blob storage
		const blob = await put(file.name, file, {
			access: 'public',
			addRandomSuffix: true,
		});

		return NextResponse.json({ url: blob.url });
	} catch (error) {
		console.error('Share upload error:', error);

		// Handle missing BLOB_READ_WRITE_TOKEN specifically
		const errorMessage = error instanceof Error ? error.message : 'Unknown upload error';
		const isMissingToken = errorMessage.includes('BLOB_READ_WRITE_TOKEN')
			|| errorMessage.includes('token')
			|| errorMessage.includes('unauthorized');

		if (isMissingToken) {
			return NextResponse.json(
				{ error: 'Vercel Blob storage is not configured. Set BLOB_READ_WRITE_TOKEN in your environment.' },
				{ status: 503 }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to upload poster for sharing.' },
			{ status: 500 }
		);
	}
}
