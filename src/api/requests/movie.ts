import { tmdb } from "../instance";

import type {
	MovieList,
	MovieListWithDate,
	MovieWithDetails,
} from "../types/movie";

interface GetPopularParams {
	language?: string;
	page?: number;
	region?: string;
}

export const getPopular = async (params?: GetPopularParams) =>
	await tmdb.get<MovieList>("/movie/popular", { params });

interface GetRatedMoviesParams {
	language?: string;
	page?: number;
	region?: string;
}

export const getTopRated = (params?: GetRatedMoviesParams) =>
	tmdb.get<MovieList>("/movie/top_rated", { params });

interface GetNowPlayingParams {
	language?: string;
	page?: number;
	region?: string;
}

export const getNowPlaying = (params?: GetNowPlayingParams) =>
	tmdb.get<MovieListWithDate>("/movie/now_playing", { params });

interface GetMovieDetailsParams {
	language?: string;
	movie_id: number | string;
}

export const getMovieDetails = (params: GetMovieDetailsParams) =>
	tmdb.get<MovieWithDetails>(`/movie/${params.movie_id}`, {
		params: { language: params.language },
	});

interface GetSimilarParams {
	language?: string;
	page?: number;
	movie_id: number | string;
}

export const getSimilar = (params: GetSimilarParams) =>
	tmdb.get<MovieList>(`/movie/${params.movie_id}/similar`, {
		params: { language: params.language, page: params.page },
	});

interface GetSelectedGenreParams {
	language?: string;
	page?: number;
	sort_by?: string;
	with_genres: string;
}

export const getSelectedGenre = (params: GetSelectedGenreParams) =>
	tmdb.get<MovieList>("/discover/movie", { params });
