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

export function CategoryPage() {
	const { category, genre_id } = useParams();
	const { setTopmovie } = useApp();
	const [pageIndex, setPageIndex] = useState(1);
	const [data] = useRequest<UseRequestData>(
		{ movies: [], maxPages: 1 },
		async (getPrevData) => {
			const prevData = getPrevData();
			let data: null | MovieList = null;

			if (pageIndex > prevData.maxPages) return (prevData);

			switch (category) {
				case "popular":
					data = (await requests.movie.getPopular({
						page: pageIndex,
						language: "fr-Fr",
					})).data;
					break;
				case "top-rated":
					data = (await requests.movie.getTopRated({
						page: pageIndex,
						language: "fr-Fr"
					})).data;
					break;
				case "now-playing":
					data = (await requests.movie.getNowPlaying({
						page: pageIndex,
						language: "fr-Fr",
					})).data;
					break;
				case "genre":
					if (genre_id) {
						data = (await requests.movie.getMoviesByGenre({
							with_genres: genre_id,
							page: pageIndex
						})).data;
					}
					break;
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
		[pageIndex, category, genre_id]
	);

	useEffect(() => {
		if (data.movies[0]) setTopmovie(data.movies[0]);
	}, [data, setTopmovie]);

	useEffect(() => {
		setPageIndex(1);
	}, [category, genre_id]);

	return (
		<MovieSectionReveal
			inline={false}
			movies={data.movies}
			onScrollEnd={() => setPageIndex(prev => prev + 1)}
		/>
	);
}
