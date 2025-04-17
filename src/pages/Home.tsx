import { useEffect } from "react";
import { MovieSection } from "../components/MovieSection";
import { useHeader } from "../providers/HeaderProvider";
import movies from "../mocks/movies.json"
const HomePage = () => {
	const { setTopmovie } = useHeader();

	useEffect(() => {
		setTopmovie(() => movies.results[0])
	}, [])

	return (
		<>
			<MovieSection type="Populaires" maxNbrCards={20} oneLine={true} />
			<MovieSection type="Mieux notés" maxNbrCards={20} oneLine={true} />
			<MovieSection type="Recents" maxNbrCards={20} oneLine={true} />
		</>
	);
};

export default HomePage;
