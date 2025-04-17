import { MovieSection } from "../components/MovieSection";
import { useHeader } from "../providers/HeaderProvider";
import type { MovieList } from "../api/tmdb";
import { getPopularMovies, getRecentMovies } from "../api/tmdb";
import { Params, useLoaderData } from "react-router";

type HomeParams = Params<"category" | "genre_id">;

interface HomeData {
	popularMovies: MovieList,
	recentMovies: MovieList,
}

export async function homeLoader({ params }: { params: HomeParams }): Promise<HomeData> {
	console.log("homeLoader: ", params);
	return ({
		popularMovies: (await getPopularMovies()).data,
		recentMovies: (await getRecentMovies()).data,
		
	});
}

export function HomePage() {
	const { popularMovies } = useLoaderData<HomeData>();
	const { setTopmovie } = useHeader();

	console.log("homeLoader: ", params);
	return (
		<>
			<MovieSection type="Populaires" maxNbrCards={20} oneLine={true} />
			<MovieSection type="Mieux notés" maxNbrCards={20} oneLine={true} />
			<MovieSection type="Recents" maxNbrCards={20} oneLine={true} />
		</>
	);
}