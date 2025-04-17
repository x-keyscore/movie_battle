import movieCredits from "./../mocks/credits-movie.json";
import { ActorCard } from "../components/ActorCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { MovieDetails } from "../requests/tmdb-types/tmdbMovie";
import styles from "./MovieDetails.module.css";
import { MovieSection } from "../components/MovieSection";

const MovieDetailsPage = () => {
	const { movie_id } = useParams();

	const [movie, setMovie] = useState<MovieDetails | null>(null);

	useEffect(() => {
		const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=fr-FR`;
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
			},
		};

		fetch(url, options)
			.then((res) => res.json())
			.then((json) => setMovie(json))
			.catch((err) => console.error(err));
	}, [movie_id]);

	if (!movie) return <h1>Can't find movie</h1>;

	return (
		<>
			<MovieSection type="Similaire" maxNbrCards={10} oneLine={true} />
			<div className={styles.detailsSection}>
				<figure className={styles.detailsContainer}>
					<div className={styles.imgContainer}>
						<img
							src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
							alt={movie.title}
							className={styles.img}
						/>
					</div>
					<figcaption className={styles.details}>
						<ul>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Durée :</h3>
								<p className={styles.detail}>{movie.runtime}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Date de sortie :</h3>
								<p className={styles.detail}>{movie.release_date}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Budgget :</h3>
								<p className={styles.detail}>{movie.budget}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Revenue :</h3>
								<p className={styles.detail}>{movie.revenue}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Langue d'origine :</h3>
								<p className={styles.detail}>{movie.original_language}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Pays d'origine :</h3>
								<p className={styles.detail}>{movie.origin_country[0]}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Directeurs :</h3>
								<ul className={styles.detailList}>
									{movieCredits.cast
										.filter(
											(member) => member.known_for_department === "Directing",
										)
										.map((director) => {
											return (
												<li key={director.id}>{director.original_name}</li>
											);
										})}
								</ul>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Maisons de production :</h3>
								<ul className={styles.detailList}>
									{movie.production_companies.map((company) => {
										return <li key={company.id}>{company.name}</li>;
									})}
								</ul>
							</li>
						</ul>
					</figcaption>
				</figure>
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
		</>
	);
};

export default MovieDetailsPage;
