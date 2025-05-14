import type { Movie, MovieList } from "../../api";
import type { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequestQueue } from "../../hooks/useRequestQueue";
import { MovieSection } from "../../components";
import { requests } from "../../api";
import genres from "../../assets/data/movie-genres.json";

interface UseRequestData {
	title: string;
	movies: Movie[];
	totalPages: number;
}

export function CategoryPage() {
	const { category, genre_id } = useParams();
	const { setTopmovie } = useApp();
	const [pageIndex, setPageIndex] = useState(1);
	const [data] = useRequestQueue<UseRequestData>({ 
		initial: { title: "", movies: [], totalPages: 1 },
		subscribes: [pageIndex, category, genre_id]
	}, async (prevData) => {
		let response: null | AxiosResponse<MovieList> = null;
		let title = "";

		switch (category) {
			case "popular":
				response = await requests.movie.getPopular({
					page: pageIndex,
					language: "fr-FR"
				});
				title = "Populaires";
				break;
			case "top-rated":
				response = await requests.movie.getTopRated({
					page: pageIndex,
					language: "fr-FR"
				});
				title = "Meilleures notes";
				break;
			case "now-playing":
				response = await requests.movie.getNowPlaying({
					page: pageIndex,
					language: "fr-FR"
				});
				title = "Recents";
				break;
			case "genre":
				if (genre_id) {
					response = await requests.movie.getMoviesByGenre({
						with_genres: genre_id,
						page: pageIndex,
						language: "fr-FR"
					});
					title = genres.find(genre => {
						return (genre.id.toString() === genre_id);
					})?.name!;
				}
				break;
		}

		if (!response) return (prevData);
		const { data } = response;

		if (pageIndex === 1) {
			return ({
				title,
				movies: data.results,
				totalPages: data.total_pages
			});
		}
		else {
			return ({
				title,
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
			title={data.title}
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
