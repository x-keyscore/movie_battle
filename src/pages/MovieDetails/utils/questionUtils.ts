import type { MovieList } from "../../../api";
import type { createQuestionType, questionType } from "../types";

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

	return randomMovies;
}

function createQuestion({
	query,
	correctAnswers,
	wrongAnswers,
	imagePath,
	subject,
}: createQuestionType): questionType | null {
	if (!correctAnswers || !wrongAnswers) return null;

	const message = subject ? `${query} ${subject} ?` : query;
	const correctAnswer = correctAnswers[0].title;
	const answers = correctAnswers
		.concat(wrongAnswers)
		.map((movie) => movie.title);

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

export const questionUtils = {
	shuffleAnswers,
	pickRandomMovies,
	createQuestion,
};
