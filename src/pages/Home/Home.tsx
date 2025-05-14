import { useEffect } from "react";
import { MovieSection } from "../../components";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { requests } from "../../api";

export function HomePage() {
	const { setTopmovie } = useApp();
	const [data] = useRequest({
		initial: null,
		subscribes: []
	}, async () => {
		const [popular, topRated, nowPlaying, action, comedy, horror] = await Promise.all([
			requests.movie.getPopular({ page: 3, language: "fr-Fr" }),
			requests.movie.getTopRated({ language: "fr-Fr" }),
			requests.movie.getNowPlaying({ language: "fr-Fr" }),
			requests.movie.getMoviesByGenre({
				with_genres: "28", sort_by: "vote_count.desc", language: "fr-FR"
			}),
			requests.movie.getMoviesByGenre({
				with_genres: "35", sort_by: "vote_count.desc", language: "fr-FR"
			}),
			requests.movie.getMoviesByGenre({
				with_genres: "27", sort_by: "vote_count.desc", language: "fr-FR"
			})
		]);

		return ({
			popularMovies: popular.data.results,
			topRatedMovies: topRated.data.results,
			nowPlayingMovies: nowPlaying.data.results,
			actionMovies: action.data.results,
			comedyMovies: comedy.data.results,
			horrorMovies: horror.data.results

		});
	});

	useEffect(() => {
		if (!data) return;

		setTopmovie(data.popularMovies[0]);
	}, [data, setTopmovie]);

	if (!data) return (null);

	return (
		<>
			<MovieSection
				url="/category/now-playing"
				title="Recents"
				movies={data.nowPlayingMovies}
				inline={true}
				endIndex={20}
			/>
			<MovieSection
				url="/category/popular"
				title="Populaires"
				movies={data.popularMovies}
				inline={true}
				startIndex={1}
				endIndex={20}
			/>
			<MovieSection
				url="/category/top-rated"
				title="Meilleures notes"
				movies={data.topRatedMovies}
				inline={true}
				endIndex={20}
			/>
			<MovieSection
				url="/category/genre/28"
				title="Action"
				movies={data.actionMovies}
				inline={true}
				endIndex={20}
			/>
			<MovieSection
				url="/category/genre/35"
				title="Comédie"
				movies={data.comedyMovies}
				inline={true}
				endIndex={20}
			/>
			<MovieSection
				url="/category/genre/27"
				title="Horreur"
				movies={data.horrorMovies}
				inline={true}
				endIndex={20}
			/>
		</>
	);
}
