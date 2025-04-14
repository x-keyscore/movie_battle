import { MovieCard } from "../components/movieCard";
import moviesData from "./../mocks/movies.json";

const TESTMOVIES = moviesData.results;

const HomePage = () => {
	return (
		<>
			<h1>Home Page</h1>
			<div
				style={{
					display: "grid",
					placeItems: "center",
					gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
					gap: "16px",
					padding: "16px",
				}}
			>
				{TESTMOVIES.map((TESTMOVIE) => {
					return (
						<MovieCard
							key={TESTMOVIE.id}
							id={TESTMOVIE.id}
							title={TESTMOVIE.title}
							genre_ids={TESTMOVIE.genre_ids}
							backdrop_path={TESTMOVIE.backdrop_path}
						/>
					);
				})}
			</div>
		</>
	);
};

export default HomePage;
