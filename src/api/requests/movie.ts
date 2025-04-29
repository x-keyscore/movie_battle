import type { MovieList, MovieListWithDate, MovieWithDetails } from "../types/movie";
import { tmdb } from "../instance";

interface GetMovieDetailsParams {
	movie_id: number | string;
	language?: string;
}

export const getMovieDetails = (params: GetMovieDetailsParams) =>
	tmdb.get<MovieWithDetails>(`/movie/${params.movie_id}`, {
		params: { language: params.language },
	});

interface GetPopularParams {
	page?: number;
	region?: string;
	language?: string;
}

export const getPopular = async (params?: GetPopularParams) =>
	await tmdb.get<MovieList>("/movie/popular", { params });

interface GetRatedMoviesParams {
	page?: number;
	region?: string;
	language?: string;
}

export const getTopRated = (params?: GetRatedMoviesParams) =>
	tmdb.get<MovieList>("/movie/top_rated", { params });

interface GetNowPlayingParams {
	page?: number;
	region?: string;
	language?: string;
}

export const getNowPlaying = (params?: GetNowPlayingParams) =>
	tmdb.get<MovieListWithDate>("/movie/now_playing", { params });

interface GetSimilarParams {
	movie_id: number | string;
	page?: number;
	language?: string;
}

export const getSimilar = (params: GetSimilarParams) =>
	tmdb.get<MovieList>(`/movie/${params.movie_id}/similar`, {
		params: { language: params.language, page: params.page },
	});

interface GetMoviesByGenreParams {
	with_genres: string;
	sort_by?:
		| "popularity.asc"
		| "popularity.desc"
		| "title.asc"
		| "title.desc"
		| "original_title.asc"
		| "original_title.desc"
		| "revenue.asc"
		| "revenue.desc"
		| "vote_count.asc"
		| "vote_count.desc"
		| "vote_average.asc"
		| "vote_average.desc"
		| "primary_release_date.asc"
		| "primary_release_date.desc";
		
	page?: number;
	language?: string;
}

export const getMoviesByGenre = (params: GetMoviesByGenreParams) =>
	tmdb.get<MovieList>("/discover/movie", { params });

interface GetMoviesByTitleParams {
	query: string;
	year?: string;
	page?: number;
	region?: string;
	language?: string;
}

export const getMoviesByTitle = (params: GetMoviesByTitleParams) =>
	tmdb.get<MovieList>("/search/movie", { params });