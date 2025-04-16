export interface creditMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
}

export interface castMember extends creditMember {
	cast_id: number;
	character: string;
	order: number;
}

export interface crewMember extends creditMember {
	department: string;
	job: string;
}

export interface credits {
	id: number;
	cast: castMember[];
	crew: crewMember[];
}
