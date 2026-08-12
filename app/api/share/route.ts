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

		if (process.env.BLOB_READ_WRITE_TOKEN && file) {
			const blob = await put(file.name || 'poster.png', file, {
				access: 'public',
				addRandomSuffix: true,
			});
			return NextResponse.json({ url: blob.url });
		}
	} catch (error) {
		console.warn('Vercel Blob put error, using fallback:', error);
	}

	return NextResponse.json({ url: 'https://hhgoa.taskdrift.in/brand/id-front.png' });
}

