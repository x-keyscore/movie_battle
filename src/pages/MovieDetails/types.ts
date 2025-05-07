import type {
	Credits,
	ImageList,
	MovieList,
	MovieWithDetails,
} from "../../api";

export interface dataMovieDetails {
	movie: MovieWithDetails;
	credits: Credits;
	similarMovies: MovieList;
	movieImages: ImageList;
}

export interface questionType {
	imagePath: string;
	query: string;
	answers: string[];
	correctAnswer: string;
}
