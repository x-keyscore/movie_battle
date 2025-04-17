export interface CreditBase {
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

export interface CreditCast extends CreditBase {
	cast_id: number;
	character: string;
	order: number;
}

export interface CreditCrew extends CreditBase {
	department: string;
	job: string;
}

export interface Credits {
	id: number;
	cast: CreditCast[];
	crew: CreditCrew[];
}
