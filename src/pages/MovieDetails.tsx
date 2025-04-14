import movieCredits from "./../mocks/credits-movie.json";
import { ActorCard } from "./../components/actorCard";

const MovieDetailsPage = () => {
	return (
		<>
			<h1>Movie Details Page</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
					gap: "16px",
					padding: "16px",
				}}
			>
				{movieCredits.cast
					.filter((member) => member.known_for_department === "Acting")
					.map((actor) => {
						return (
							<ActorCard
								key={actor.id}
								id={actor.id}
								name={actor.original_name}
								character={actor.character}
								profile_path={actor.profile_path}
							/>
						);
					})}
			</div>
		</>
	);
};

export default MovieDetailsPage;
