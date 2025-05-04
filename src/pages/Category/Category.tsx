import type { Movie, MovieList } from "../../api";
import type { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequestQueue } from "../../hooks/useRequestQueue";
import { MovieSection } from "../../components";
import { requests } from "../../api";

interface UseRequestData {
	movies: Movie[];
	totalPages: number;
}

export function CategoryPage() {
	const { category, genre_id } = useParams();
	const { setTopmovie } = useApp();
	const [pageIndex, setPageIndex] = useState(1);
	const [data] = useRequestQueue<UseRequestData>({ 
		initial: { movies: [], totalPages: 1 },
		subscribes: [pageIndex, category, genre_id]
	}, async (prevData) => {
		let response: null | AxiosResponse<MovieList> = null;
		console.log(pageIndex)
		switch (category) {
			case "popular":
				response = await requests.movie.getPopular({
					page: pageIndex,
					language: "fr-FR"
				});
				break;
			case "top-rated":
				response = await requests.movie.getTopRated({
					page: pageIndex,
					language: "fr-FR"
				});
				break;
			case "now-playing":
				response = await requests.movie.getNowPlaying({
					page: pageIndex,
					language: "fr-FR"
				});
				break;
			case "genre":
				if (genre_id) {
					response = await requests.movie.getMoviesByGenre({
						with_genres: genre_id,
						page: pageIndex,
						language: "fr-FR"
					});
				}
				break;
		}

		if (!response) return (prevData);
		const { data } = response;

		if (pageIndex === 1) {
			return ({
				movies: data.results,
				totalPages: data.total_pages
			});
		}
		else {
			return ({
				movies: [...prevData.movies, ...data.results],
				totalPages: prevData.totalPages
			});
		}
	});

	useEffect(() => {
		if (data.movies[0]) setTopmovie(data.movies[0]);
	}, [data, setTopmovie]);

	useEffect(() => {
		setPageIndex(1);
	}, [category, genre_id]);

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
