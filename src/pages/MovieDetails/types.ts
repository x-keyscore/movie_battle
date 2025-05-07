import type {
	Credits,
	ImageList,
	Movie,
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
	query: string;
	correctAnswer: string;
	answers: string[];
	imagePath: string;
}

export interface createQuestionType {
	query: string;
	correctAnswers: Movie[] | null;
	wrongAnswers: Movie[] | null;
	imagePath: string;
	subject?: string;
}
