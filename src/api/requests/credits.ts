import type { Credits } from "../types/credits";
import { tmdb } from "../instance";

interface GetCreditsParams {
	language?: string;
	movie_id: string;
}

export const getCredits = (params: GetCreditsParams) =>
	tmdb.get<Credits>(`/movie/${params.movie_id}/credits`, {
		params: { language: params.language },
	});
