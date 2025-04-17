import axios from "axios";
import { MovieList, MovieListWithDate } from "./types/movie";

export const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + import.meta.env.VITE_TMDB_API_TOKEN
    }
});

interface PopularMoviesParams {
    language?: string;
    page?: number;
    region?: string;
}

export const getPopularMovies = async (params?: PopularMoviesParams) =>
    await tmdb.get<MovieList>("/movie/popular", { params });

interface RecentMoviesParams {
    language?: string;
    page?: number;
    region?: string;
}

export const getRecentMovies = (params?: RecentMoviesParams) => 
    tmdb.get<MovieListWithDate>("/movie/now_playing", { params });

interface RatedMoviesParams {
    language?: string;
    page?: number;
    region?: string;
}

export const getRatedMovies = (params?: RatedMoviesParams) =>
    tmdb.get<MovieList>("/movie/top_rated", { params })
        .catch((err) => console.log(err));