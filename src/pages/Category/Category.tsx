import type { Movie } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MovieSectionReveal } from "../../components";
import { requests } from "../../api";

type FetchMovies = Parameters<typeof MovieSectionReveal>[0]['fetchMovies'];

export function CategoryPage() {
	const { category, genre_id } = useParams();
	const [pageIndex, setPageIndex] = useState(1);

	useEffect(() => {
		setPageIndex(1);
	}, [category, genre_id]);

	const fetchMovies: FetchMovies = async (prevMovies) => {
		let movies: null | Movie[] = [];

		switch (category) {
			case "popular":
				movies = (await requests.movie.getPopular({
					page: pageIndex,
					language: "fr-Fr",
				})).data.results;
				break;
			case "top-rated":
				movies = ( await requests.movie.getTopRated({
					page: pageIndex,
					language: "fr-Fr"
				})).data.results;
				break;
			case "now-playing":
				movies = (await requests.movie.getNowPlaying({
					page: pageIndex,
					language: "fr-Fr",
				})).data.results;
				break;
			case "genre":
				if (genre_id) {
					movies = (await requests.movie.getMoviesByGenre({
						with_genres: genre_id,
						page: pageIndex
					})).data.results;
				}
				break;
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
				fetchDependencies={[pageIndex, category, genre_id]}
			/>
		</>
	);
}
