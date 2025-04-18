import { useEffect } from "react";
import { MovieSection } from "../components/MovieSection";
import { useHeader } from "../providers/HeaderProvider";
import { useRequest } from "../hooks/useRequest";
import { requests } from "../api";

export function HomePage() {
	const [data] = useRequest(async () => {
		const [popular, topRated, nowPlaying] = await Promise.all([
			requests.movie.getPopular(),
			requests.movie.getTopRated(),
			requests.movie.getNowPlaying(),
		]);

		return {
			popularMovies: popular.data,
			topRatedMovies: topRated.data,
			nowPlayingMovies: nowPlaying.data,
		};
	});
	const { setTopmovie } = useHeader();

	useEffect(() => {
		if (!data) return;

		setTopmovie(data.popularMovies.results[0]);
	}, [data, setTopmovie]);

	if (!data) return null;

	return (
		<>
			<MovieSection
				title="Populaires"
				movies={data.popularMovies}
				maxCards={20}
				inline={false}
			/>
			<MovieSection
				title="Mieux notés"
				movies={data.topRatedMovies}
				maxCards={20}
				inline={true}
			/>
			<MovieSection
				title="Recents"
				movies={data.nowPlayingMovies}
				maxCards={20}
				inline={true}
			/>
		</>
	);
}
