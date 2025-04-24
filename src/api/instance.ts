import axios from "axios";

export const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + import.meta.env.VITE_TMDB_TOKEN
    }
});