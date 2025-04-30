import type { Movie, MovieList } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { MovieSectionReveal } from "../../components";
import { requests } from "../../api";

interface UseRequestData {
	movies: Movie[];
	maxPages: number;
}

export function SearchPage() {
	const { movieTitle } = useParams();
	const { setTopmovie } = useApp();
	const [pageIndex, setPageIndex] = useState(1);

	const [data] = useRequest<UseRequestData>(
		{ movies: [], maxPages: 1 },
		async (getPrevData) => {
			const prevData = getPrevData();
			let data: null | MovieList = null;

			if (pageIndex > prevData.maxPages) return (prevData);

			if (movieTitle) {
				data = (await requests.movie.getMoviesByTitle({
					page: pageIndex,
					query: movieTitle,
					language: "fr-FR"
				})).data;
			}

			if (!data) {
				return ({ 
					maxPages: prevData.maxPages,
					movies: [...prevData.movies]
				});
			}
			else if (pageIndex === 1) {
				return ({
					maxPages: data.total_pages,
					movies: data.results.slice(1)
				});
			}
			else {
				return ({
					maxPages: prevData.maxPages,
					movies: [...prevData.movies, ...data.results]
				});
			}
		},
		[pageIndex, movieTitle]
	);

	useEffect(() => {
		if (data.movies[0]) setTopmovie(data.movies[0]);
	}, [data, setTopmovie]);

	useEffect(() => {
		setPageIndex(1);
	}, [movieTitle]);

	return (
		<>
			<MovieSectionReveal
				inline={false}
				movies={data.movies}
				onScrollEnd={() => setPageIndex(prev => prev + 1)}
			/>
		</>
	);
}
