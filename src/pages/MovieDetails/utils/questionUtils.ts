import type { MovieList } from "../../../api";
import type {
	createQuestionMovieType,
	createQuestionType,
	questionType,
} from "../types";

function pickRandomMovies(movies: MovieList, id: number, count = 1) {
	const filteredMovies = movies.results.filter((movie) => movie.id !== id);

	if (filteredMovies.length < count) return null;

	const randomMovies = [];
	const usedIndices = new Set<number>();

	while (randomMovies.length < count) {
		const randomIndex = Math.floor(Math.random() * filteredMovies.length);
		if (!usedIndices.has(randomIndex)) {
			usedIndices.add(randomIndex);
			randomMovies.push(filteredMovies[randomIndex]);
		}
	}

	console.log(randomMovies);
	return randomMovies;
}

function createQuestion({
	query,
	correctAnswer,
	wrongAnswers,
	imagePath,
	subject,
}: createQuestionType): questionType | null {
	if (!correctAnswer || !wrongAnswers) return null;

	const message = subject ? `${query} ${subject} ?` : query;
	const answers = shuffleAnswers([...wrongAnswers, correctAnswer]);

	return { query: message, correctAnswer, answers, imagePath };
}

function createQuestionMovie({
	query,
	correctAnswers,
	wrongAnswers,
	imagePath,
	subject,
}: createQuestionMovieType): questionType | null {
	if (!correctAnswers || !wrongAnswers) return null;

	const message = subject ? `${query} ${subject} ?` : query;
	const correctAnswer = correctAnswers[0].title;
	const answers = shuffleAnswers(
		correctAnswers.concat(wrongAnswers).map((movie) => movie.title),
	);

	return { query: message, correctAnswer, answers, imagePath };
}

function shuffleAnswers(array: string[]) {
	const shuffledArray = array.slice();
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

function returnOnInvestment(budget: number, revenue: number): number | null {
	if (budget <= 0 || revenue <= 0) {
		return null;
	}
	const percentage = (revenue / budget) * 100;
	return Math.round(percentage);
}

function getBase(percentage: number) {
	return Math.round(percentage / 5);
}

function generateWrongPercentages(correctPercentage: number): number[] {
	const wrongAnswers = [];
	const base = getBase(correctPercentage);
	const positions = [0, 1, 2, 3];
	const randomPosition = Math.floor(Math.random() * positions.length);
	let start = correctPercentage - randomPosition * base;

	while (wrongAnswers.length < 3) {
		if (start !== correctPercentage) {
			wrongAnswers.push(start);
		}
		start += base;
	}

	return wrongAnswers;
}

export const questionUtils = {
	shuffleAnswers,
	pickRandomMovies,
	createQuestion,
	createQuestionMovie,
	returnOnInvestment,
	generateWrongPercentages,
};
