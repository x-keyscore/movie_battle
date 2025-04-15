import { MovieSection } from "../components/MovieSection";

const HomePage = () => {
	return (
		<>
			<MovieSection type="Populaires" maxNbrCards={20} oneLine={true} />
			<MovieSection type="Mieux notés" maxNbrCards={20} oneLine={true} />
			<MovieSection type="Recents" maxNbrCards={20} oneLine={true} />
		</>
	);
};

export default HomePage;
