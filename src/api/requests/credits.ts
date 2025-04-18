import { tmdb } from "../instance";
import type { Credits } from "../types/credits";

interface GetCreditsParams {
	language?: string;
	movie_id: string;
}

export const getCredits = (params: GetCreditsParams) =>
	tmdb.get<Credits>(`/movie/${params.movie_id}/credits`, {
		params: { language: params.language },
	});
