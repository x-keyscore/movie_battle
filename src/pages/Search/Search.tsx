import type { Movie } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MovieSectionReveal } from "../../components";
import { requests } from "../../api";

type FetchMovies = Parameters<typeof MovieSectionReveal>[0]['fetchMovies'];

export function SearchPage() {
	const { movieTitle } = useParams();
	const [pageIndex, setPageIndex] = useState(1);

	useEffect(() => {
		setPageIndex(1);
	}, [movieTitle]);

	const fetchMovies: FetchMovies = async (prevMovies) => {
		let movies: null | Movie[] = [];

		if (movieTitle) {
			movies = (await requests.movie.getMoviesByTitle({
				query: movieTitle,
				page: pageIndex,
				language: "fr-FR"
			})).data.results;
		}

		if (pageIndex === 1) return (movies.slice(1));
		else return ([...prevMovies(), ...movies]);
	}

	return (
		<>
			<MovieSectionReveal
				inline={false}
				pageIndex={pageIndex}
				setPageIndex={setPageIndex}
				fetchMovies={fetchMovies}
				fetchDependencies={[pageIndex, movieTitle]}
			/>
		</>
	);
}
