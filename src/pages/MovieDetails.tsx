import movie from "./../mocks/movie.json";
import movieCredits from "./../mocks/credits-movie.json";
import { MovieSection } from "../components/MovieSection";
import { ActorCard } from "../components/ActorCard";
import styles from "./MovieDetails.module.css";

const MovieDetailsPage = () => {
	console.log(movie);
	return (
		<div className={styles.movieDetails}>
			<h1 className={styles.pageTitle}>Details</h1>
			<ul className={styles.detailsList}>
				<li className={styles.detailItem}>
					<h3 className={styles.detailTitle}>Durée</h3>
					<p className={styles.detail}>
						{/* formatMovieLength */ movie.runtime}
					</p>
				</li>
				<li className={styles.detailItem}>
					<h3 className={styles.detailTitle}>Date de sortie</h3>
					<p className={styles.detail}>
						{/* formatReleaseDate */ movie.release_date}
					</p>
				</li>
				<li className={styles.detailItem}>
					<h3 className={styles.detailTitle}>Budgget</h3>
					<p className={styles.detail}>{/* formatCost */ movie.budget}</p>
				</li>
				<li className={styles.detailItem}>
					<h3 className={styles.detailTitle}>Revenue</h3>
					<p className={styles.detail}>{/* formatCost */ movie.revenue}</p>
				</li>
			</ul>

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
		</div>
	);
};

export default MovieDetailsPage;
