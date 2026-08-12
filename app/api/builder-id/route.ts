import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const COUNTER_KEY = 'hh-goa-builder-counter';

/**
 * POST /api/builder-id
 * Atomically increments a sequential counter in Vercel KV and returns
 * a zero-padded builder ID in the format HH-GOA-XXXXX.
 *
 * On KV failure: returns a random fallback ID prefixed with HH-GOA-R
 * to distinguish it from verified sequential IDs.
 */
export async function POST(): Promise<NextResponse> {
	try {
		// INCR is atomic in Redis/KV — guaranteed unique sequential value
		const counter = await kv.incr(COUNTER_KEY);
		const builderId = `HH-GOA-${String(counter).padStart(5, '0')}`;

		return NextResponse.json({ builderId, verified: true });
	} catch (error) {
		console.error('Builder ID counter error (falling back to random):', error);

		// Fallback: client-distinguishable random ID
		const randomId = Math.floor(10000 + Math.random() * 90000);
		const builderId = `HH-GOA-R${randomId}`;

		return NextResponse.json({
			builderId,
			verified: false,
			note: 'Verification may sync later. KV counter unavailable.',
		});
	}
}
