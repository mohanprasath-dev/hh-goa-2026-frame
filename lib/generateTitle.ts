export const ADJECTIVES = [
	'Terminal',
	'Binary',
	'Full-Stack',
	'Async',
	'Midnight',
	'Beachside',
	'Ctrl+Shift',
] as const;

export const NOUNS = [
	'Wizard',
	'Wanderer',
	'Custodian',
	'Architect',
	'Beachcomber',
	'Shipwright',
] as const;

export type Adjective = (typeof ADJECTIVES)[number];
export type Noun = (typeof NOUNS)[number];

// Curated matrix mapping adjectives to highly compatible nouns to ensure natural titles
const RECOMMENDED_PAIRS: Record<Adjective, Noun[]> = {
	Terminal: ['Wizard', 'Architect', 'Custodian', 'Shipwright'],
	Binary: ['Architect', 'Wanderer', 'Shipwright'],
	'Full-Stack': ['Wizard', 'Architect', 'Shipwright', 'Custodian'],
	Async: ['Custodian', 'Wanderer', 'Architect'],
	Midnight: ['Wizard', 'Beachcomber', 'Wanderer', 'Shipwright'],
	Beachside: ['Beachcomber', 'Wanderer', 'Architect', 'Custodian'],
	'Ctrl+Shift': ['Wizard', 'Shipwright', 'Architect'],
};

/**
 * Generates a hand-curated, natural sounding builder title.
 * Prevents jarring/awkward combinations through explicit pairing matrix rules.
 */
export function generateTitle(currentTitle?: string): string {
	// Filter out the current title if possible to prevent duplicate generation
	const validAdjectives = [...ADJECTIVES];
	const selectedAdjective =
		validAdjectives[Math.floor(Math.random() * validAdjectives.length)];

	const compatibleNouns = RECOMMENDED_PAIRS[selectedAdjective] || [...NOUNS];
	const selectedNoun =
		compatibleNouns[Math.floor(Math.random() * compatibleNouns.length)];

	const title = `${selectedAdjective} ${selectedNoun}`;

	if (currentTitle && title === currentTitle) {
		// Retry once to get a fresh title
		return generateTitle();
	}

	return title;
}
