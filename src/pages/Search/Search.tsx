import type { Movie } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { MovieSection } from "../../components";
import { requests } from "../../api";

interface UseRequestData {
	movies: Movie[];
	maxPages: number;
}

export function SearchPage() {
	const { movieTitle } = useParams();
	const { setSearchValue, setTopmovie } = useApp();
	const [pageIndex, setPageIndex] = useState(1);
	const [data] = useRequest<UseRequestData>({ 
		initial: { movies: [], maxPages: 1 },
		subscribes: [pageIndex, movieTitle]
	}, async (prevData) => {
		if (movieTitle) {
			const { data } = await requests.movie.getMoviesByTitle({
				page: pageIndex,
				query: movieTitle,
				language: "fr-FR"
			});

			if (pageIndex === 1) {
				return ({
					maxPages: data.total_pages,
					movies: [...data.results]
				});
			} else {
				return ({
					maxPages: data.total_pages,
					movies: [...prevData.movies, ...data.results]
				});
			}
		}

		return (prevData);
	});

	useEffect(() => {
		if (movieTitle) setSearchValue(movieTitle);
		return (() => {
			setSearchValue("");
		})
	}, []);

	useEffect(() => {
		if (data.movies[0]) setTopmovie(data.movies[0]);
	}, [data, setTopmovie]);

	useEffect(() => {
		setPageIndex(1);
	}, [movieTitle]);

	return (
		<MovieSection
			movies={data.movies}
			inline={false}
			startIndex={1}
			onScrollEnd={() => {
				setPageIndex(prev => {
					if (prev > data.maxPages) return (prev);
					return (prev + 1);
				});
			}}
		/>
	);
}
