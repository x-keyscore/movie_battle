export interface CreditMember {
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

export interface CastMember extends CreditMember {
	cast_id: number;
	character: string;
	order: number;
}

export interface CrewMember extends CreditMember {
	department: string;
	job: string;
}

export interface Credits {
	id: number;
	cast: CastMember[];
	crew: CrewMember[];
}
