export interface SingleBuilder {
	name: string;
	title: string;
	stack: string;
	photoUrl: string | null;
}

export interface Teammate {
	id: string;
	name: string;
	photoUrl: string | null;
}

export type GeneratorMode = 'single' | 'team';

export interface SinglePosterData {
	name: string;
	title: string;
	stack: string;
	photoUrl: string | null;
}

export interface TeamPosterData {
	primaryBuilder: SingleBuilder;
	teammates: Teammate[];
}

export interface CropArea {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface CroppedAreaPixels {
	x: number;
	y: number;
	width: number;
	height: number;
}
