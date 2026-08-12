/**
 * Curated text pools for the builder card footer sections.
 * All pools are intentionally small and hand-curated for quality.
 */

/** Loadout — icon description + label pairs for the centre footer column. */
export const LOADOUT_POOL = [
	'Solidity',
	'Next.js',
	'Rust',
	'TypeScript',
	'Python',
	'React Native',
	'Node.js',
	'Web3',
	'AI / ML',
	'Swift',
	'Go',
	'DevOps',
	'Figma',
	'Kotlin',
	'GraphQL',
	'Supabase',
] as const;

/** Status taglines for the right footer column (max 2 lines). */
export const STATUS_POOL = [
	'READY TO SHIP',
	'LOCKED IN & BUILDING',
	'ZERO TO ONE MODE',
	'SHIPPING FROM GOA',
	'CODE · BUILD · REPEAT',
	'BUILDING IN PARADISE',
	'FULL SEND ENGAGED',
	'PROOF OF WORK: ACTIVE',
	'BEACH MODE: ON\nBUILD MODE: ON',
	'CTRL+SHIFT+SHIP',
	'OCEAN VIEW, DEEP FOCUS',
] as const;

/**
 * Returns N unique random items from a pool using Fisher-Yates partial shuffle.
 * Deterministic within a single call but random across calls.
 */
export function pickRandom<T>(pool: readonly T[], count: number): T[] {
	const items = [...pool];
	const result: T[] = [];
	for (let i = 0; i < Math.min(count, items.length); i++) {
		const j = i + Math.floor(Math.random() * (items.length - i));
		[items[i], items[j]] = [items[j], items[i]];
		result.push(items[i]);
	}
	return result;
}
