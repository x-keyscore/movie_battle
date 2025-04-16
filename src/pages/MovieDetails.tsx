import movie from "./../mocks/movie.json";
import movieCredits from "./../mocks/credits-movie.json";
import { MovieSection } from "../components/MovieSection";
import { ActorCard } from "../components/ActorCard";
import styles from "./MovieDetails.module.css";

const MovieDetailsPage = () => {
	return (
		<div className={styles.movieDetails}>
			<h1 className={styles.pageTitle}>Details</h1>
			<div className={styles.container}>
				<div>
					<div className={styles.detailItem}>
						<h3 className={styles.detailTitle}>Durée :</h3>
						<p className={styles.detail}>
							{/* formatMovieLength */ movie.runtime}
						</p>
					</div>
					<div className={styles.detailItem}>
						<h3 className={styles.detailTitle}>Date de sortie :</h3>
						<p className={styles.detail}>
							{/* formatReleaseDate */ movie.release_date}
						</p>
					</div>
					<div className={styles.detailItem}>
						<h3 className={styles.detailTitle}>Budgget :</h3>
						<p className={styles.detail}>{/* formatCost */ movie.budget}</p>
					</div>
					<div className={styles.detailItem}>
						<h3 className={styles.detailTitle}>Revenue :</h3>
						<p className={styles.detail}>{/* formatCost */ movie.revenue}</p>
					</div>
					<div className={styles.detailItem}>
						<h3 className={styles.detailTitle}>Langue d'origine :</h3>
						<p className={styles.detail}>{movie.original_language}</p>
					</div>
					<div className={styles.detailItem}>
						<h3 className={styles.detailTitle}>Pays d'origine :</h3>
						<p className={styles.detail}>{movie.origin_country}</p>
					</div>
					<div className={styles.detailItem}>
						<h3 className={styles.detailTitle}>Directeurs :</h3>
						<ul className={styles.detailList}>
							{movieCredits.cast
								.filter((member) => member.known_for_department === "Directing")
								.map((director) => {
									return <li key={director.id}>{director.original_name}</li>;
								})}
						</ul>
					</div>
				</div>
				<div className={styles.column}>
					<div className={styles.detailItem}>
						<h3 className={styles.detailTitle}>Maisons de production :</h3>
						<ul className={styles.detailList}>
							{movie.production_companies.map((company) => {
								return <li key={company.id}>{company.name}</li>;
							})}
						</ul>
					</div>
					<div className={styles.imgContainer}>
						<img
							src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
							alt={movie.title}
							className={styles.img}
						/>
					</div>
				</div>
			</div>

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
