import { tmdb } from "../instance";
import { MovieList, MovieListWithDate } from "../types/movie";

interface GetPopularParams {
    language?: string;
    page?: number;
    region?: string;
}

const getPopular = async (params?: GetPopularParams) =>
    await tmdb.get<MovieList>("/movie/popular", { params });

interface GetRatedMoviesParams {
    language?: string;
    page?: number;
    region?: string;
}

const getTopRated = (params?: GetRatedMoviesParams) =>
    tmdb.get<MovieList>("/movie/top_rated", { params });

interface GetNowPlayingParams {
    language?: string;
    page?: number;
    region?: string;
}

const getNowPlaying = (params?: GetNowPlayingParams) => 
    tmdb.get<MovieListWithDate>("/movie/now_playing", { params });

export const movie = {
    getPopular,
    getTopRated,
    getNowPlaying
};