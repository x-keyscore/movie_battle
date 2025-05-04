import { Movie, MovieWithDetails } from "../api";
import genres from "../assets/data/movie-genres.json";

function movieRuntime(runtime: number) {
    const h = Math.floor(runtime / 60), m = runtime % 60;

    if (h) return (`${h}h ${m}m`);
    else if (m) return (`${m}m`);
    else return ("");
}

function movieGenres(movie: Movie | MovieWithDetails | null): MovieWithDetails['genres'] {
    if (!movie) return ([]);

    if ("genres" in movie) {
        return (movie.genres);
    }

    if ("genre_ids" in movie) {
        return (movie.genre_ids.map((genre_id) => ({
            id: genre_id,
            name: genres.find(({ id }) => id === genre_id)!.name
        })));
    }

    return ([]);
}

export const formatters = {
    movieRuntime,
    movieGenres
}