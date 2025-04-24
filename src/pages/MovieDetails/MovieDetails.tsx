import { useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { ActorCard } from "../../components/ActorCard";
import { MovieSection } from "../../components/MovieSection";
import { requests } from "../../api";
import styles from "./MovieDetails.module.css";

export function MovieDetailsPage() {
	const { movie_id } = useParams();
	const { setTopmovie } = useApp();

	const [data] = useRequest(async () => {
		if (!movie_id) return;

		const [movie, similarMovie, credits] = await Promise.all([
			requests.movie.getMovieDetail({ language: "fr-Fr", movie_id }),
			requests.movie.getSimilar({ language: "fr-Fr", movie_id }),
			requests.credits.getCredits({ language: "fr-Fr", movie_id }),
		]);

		return {
			movie: movie.data,
			similarMovie: similarMovie.data,
			credits: credits.data,
		};
	}, [movie_id]);

	function normalize(value: string | number) {
		return (value || "Non renseigné");
	}

	useEffect(() => {
		if (!data) return;

		setTopmovie(data.movie);
	}, [data, setTopmovie]);

	if (!data) return null;

	return (
		<>
			<MovieSection
				title="Similaires"
				inline={true}
				movies={data.similarMovie}
				endIndex={10}
			/>
			<div className={styles.detailsSection}>
				<figure className={styles.detailsContainer}>
					<div className={styles.imgContainer}>
						<img
							src={`https://image.tmdb.org/t/p/w780${data.movie.poster_path}`}
							alt={data.movie.title}
							className={styles.img}
						/>
					</div>
					<figcaption className={styles.details}>
						<div className={styles.titleContainer}>
							<h1 className={styles.pageTitle}>Details</h1>
							<div className={styles.spacer} />
						</div>
						<div className={`${styles.detailItem} ${styles.overview}`}>
							<h3 className={styles.detailTitle}>Synopsis :</h3>
							<p className={styles.detail}>{normalize(data.movie.overview)}</p>
						</div>
						<ul className={styles.detailItemList}>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Durée :</h3>
								<p className={styles.detail}>{normalize(data.movie.runtime)}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Date de sortie :</h3>
								<p className={styles.detail}>
									{normalize(data.movie.release_date)}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Budgget :</h3>
								<p className={styles.detail}>{normalize(data.movie.budget)}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Revenue :</h3>
								<p className={styles.detail}>{normalize(data.movie.revenue)}</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Langue d'origine :</h3>
								<p className={styles.detail}>
									{normalize(data.movie.original_language)}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Pays d'origine :</h3>
								<p className={styles.detail}>
									{normalize(data.movie.origin_country[0])}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Directeurs :</h3>
								<ul>
									{data.credits.cast
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
								<ul>
									{data.movie.production_companies.map((company) => {
										return <li key={company.id}>{company.name}</li>;
									})}
								</ul>
							</li>
						</ul>
					</figcaption>
				</figure>
			</div>
			<div className={styles.distribution}>
				<div className={styles.titleContainer}>
					<h2 className={styles.title}>Distribution</h2>
					<div className={styles.spacer} />
				</div>

				<div className={styles.actorCardsContainer}>
					<div className={styles.actorCards}>
						{data.credits.cast
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
			</div>
		</>
	);
};
