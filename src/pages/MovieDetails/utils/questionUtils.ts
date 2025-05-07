import type { MovieList } from "../../../api";

function pickRandomMovie(movies: MovieList, id: number) {
	const randomIndex = Math.floor(Math.random() * movies.results.length);
	const randomMovie = movies.results[randomIndex];
	if (randomMovie.id === id) {
		pickRandomMovie(movies, id);
	}
	return randomMovie;
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
	pickRandomMovie,
};
