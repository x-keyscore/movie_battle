import { tmdb } from "../instance";
import type { ImageList } from "../types";

interface GetImagesParams {
	movie_id: number;
	include_image_language: string; // fr,null - String of iso69 separated by commas
}

export const getImages = (params: GetImagesParams) =>
	tmdb.get<ImageList>(`/movie/${params.movie_id}/images`, {
		params: { include_image_language: params.include_image_language },
	});
