import { useEffect } from "react";
import { MovieSection } from "../../components/MovieSection";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { requests } from "../../api";

export function HomePage() {
	const { setTopmovie } = useApp();
	const [data] = useRequest(async () => {
		console.log("fetch")
		const [popular, topRated, nowPlaying] = await Promise.all([
			requests.movie.getPopular({ language: "fr-Fr" }),
			requests.movie.getTopRated({ language: "fr-Fr" }),
			requests.movie.getNowPlaying({ language: "fr-Fr" })
		]);

		return {
			popularMovies: popular.data,
			topRatedMovies: topRated.data,
			nowPlayingMovies: nowPlaying.data
		};
	}, []);

	useEffect(() => {
		if (!data) return;

		setTopmovie(data.popularMovies.results[0]);
	}, [data, setTopmovie]);

	if (!data) return (null);

	return (
		<>
			<MovieSection
				title="Populaires"
				movies={data.popularMovies}
				inline={true}
				startIndex={1}
				endIndex={20}
			/>
			<MovieSection
				title="Mieux notés"
				movies={data.topRatedMovies}
				inline={true}
				endIndex={20}
			/>
			<MovieSection
				title="Recents"
				movies={data.nowPlayingMovies}
				inline={true}
				endIndex={20}
			/>
		</>
	);
}
