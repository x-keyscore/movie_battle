import type { Movie } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { MovieSection } from "../../components";
import { requests } from "../../api";

interface UseRequestData {
	movies: Movie[];
	totalPages: number;
	totalResults: number;
}

export function SearchPage() {
	const { movieTitle } = useParams();
	const { searchValue, setSearchValue, setTopmovie, setError } = useApp();
	const [pageIndex, setPageIndex] = useState(1);
	const [data] = useRequest<UseRequestData>({ 
		initial: { movies: [], totalPages: 1, totalResults: 0 },
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
					totalResults: data.total_results,
					totalPages: data.total_pages,
					movies: [...data.results]
				});
			} else {
				return ({
					totalResults: data.total_results,
					totalPages: data.total_pages,
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
		if (!data.totalResults) {
			setTopmovie(null);
			setError({
				title: "",
				message: `Nous n'avons pas trouvé de film du nom de "${searchValue}"`
			});
		} else {
			setTopmovie(data.movies[0]);
			setError(null);
		}
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
					if (prev > data.totalPages) return (prev);
					return (prev + 1);
				});
			}}
		/>
	);
}
