import type {
	Credits,
	ImageList,
	Movie,
	MovieList,
	MovieWithDetails,
} from "../../api";

export interface MovieDetailsData {
	movie: MovieWithDetails;
	credits: Credits;
	similarMovies: MovieList;
	movieImages: ImageList;
}

export interface QuestionItem {
	title: string;
	correctAnswer: string;
	answers: string[];
	imagePath: string;
}

export interface createQuestionType {
	title: string;
	correctAnswer: string | null;
	wrongAnswers: string[] | null;
	imagePath: string;
	subject?: string;
}

export interface createQuestionMovieType {
	title: string;
	correctAnswers: Movie[] | null;
	wrongAnswers: Movie[] | null;
	imagePath: string;
	subject?: string;
}

export interface modifyDateType {
	years?: number;
	months?: number;
	days?: number;
}
