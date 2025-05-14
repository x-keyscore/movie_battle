import type {
	MovieList,
	MovieListWithDate,
	MovieWithDetails,
} from "../types/movie";
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

interface GetDiscoverMovieParams {
	language?: string;
	page?: number;
	primary_release_year?: number; // 2006 - List of movies from that year
	"primary_release_date.gte"?: string; // 2006-01-01 - LOM released at that date and later
	"primary_release_date.lte"?: string; // 2006-12-31 - LOM released at that date and before
	sort_by?:
		| "popularity.desc"
		| "revenue.desc"
		| "vote_count.desc"
		| "vote_average.desc"; // Defaults to popularity
	"vote_average.gte"?: number; // Between 0 and 10 - LOM at this rating or greater
	"vote_average.lte"?: number; // Between 0 and 10 - LOM at this rating or lesser
	"vote_count.gte"?: number; // LOM with this number of votes or greater
	with_people?: string; // String of cast/crew IDs - Can be used with and "," or "|" - LOM with people in it
	with_cast?: string; // Same but only for cast
	with_crew?: string; // Same but only for crew
	with_companies?: string; // String of company IDs
	without_companies?: string; // String of company IDs to exclude
	with_genres?: string; // String of genre IDs
	without_genres?: string;
	with_keywords?: string; // String of keywords IDs
	with_origin_country?: string; // FR - Use iso3166 - LOM from origin country
	with_original_language?: string; // fr - Use iso639 - LOM with origin language
}

export const getDiscoverMovie = (params: GetDiscoverMovieParams) =>
	tmdb.get<MovieList>("/discover/movie", { params });
