import { useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { ActorCard, MovieSection } from "../../components";
import { normalize } from "../../utils/normalize";
import { requests } from "../../api";
import language from "../../data/iso3166-french.json";
import country from "../../data/iso639-french.json";
import styles from "./MovieDetails.module.css";

export function MovieDetailsPage() {
	const { movie_id } = useParams();
	const { setTopmovie } = useApp();

	const [data] = useRequest(null, async () => {
			if (!movie_id) return;

			const [movie, similarMovie, credits] = await Promise.all([
				requests.movie.getMovieDetails({ language: "fr-Fr", movie_id }),
				requests.movie.getSimilar({ language: "fr-Fr", movie_id }),
				requests.credits.getCredits({ language: "fr-Fr", movie_id }),
			]);

			return {
				movie: movie.data,
				credits: credits.data,
				similarMovies: similarMovie.data
			};
		},
		[movie_id]
	);

	useEffect(() => {
		if (!data) return;

		setTopmovie(data.movie);
	}, [data, setTopmovie]);

	if (!data) return null;

	function fallback(value: string | number) {
		return value || "Non renseigné";
	}

	const actors = data.credits.cast.filter(
		(member) => member.known_for_department === "Acting",
	);

	const directors = data.credits.crew
		.filter((member) => member.known_for_department === "Directing")
		.filter(
			(director, index, self) =>
				index === self.findIndex((d) => d.id === director.id),
		);

	return (
		<>
			{data.similarMovies.total_results > 0 ? (
				<MovieSection
					title="Similaires"
					inline={true}
					movies={data.similarMovies.results}
					endIndex={10}
				/>
			) : (
				<div className={styles.noSimilar} />
			)}

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
							<p className={styles.detail}>{fallback(data.movie.overview)}</p>
						</div>
						<ul className={styles.detailItemList}>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Durée :</h3>
								<p className={styles.detail}>
									{fallback(normalize.movieRuntime(data.movie.runtime))}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Date de sortie :</h3>
								<p className={styles.detail}>
									{fallback(data.movie.release_date)}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Budgget :</h3>
								<p className={styles.detail}>
									{fallback(data.movie.budget).toLocaleString("en-US", {
										style: "currency",
										currency: "USD",
									})}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Revenue :</h3>
								<p className={styles.detail}>
									{fallback(data.movie.revenue).toLocaleString("en-US", {
										style: "currency",
										currency: "USD",
									})}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Langue d'origine :</h3>
								<p className={styles.detail}>
									{fallback(
										language[
											data.movie.original_language as keyof typeof language
										],
									)}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Pays d'origine :</h3>
								<p className={styles.detail}>
									{fallback(
										country[
											data.movie.origin_country[0] as keyof typeof country
										],
									)}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Directeurs :</h3>
								<ul>
									{directors.length
										? directors.map((director) => (
												<li key={director.id}>{director.original_name}</li>
											))
										: "Non renseigné"}
								</ul>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Maisons de production :</h3>
								<ul>
									{data.movie.production_companies.length
										? data.movie.production_companies.map((company) => (
												<li key={company.id}>{company.name}</li>
											))
										: "Non renseigné"}
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
						{actors.length > 0 ? (
							actors.map((actor, index) => (
								<ActorCard
									key={actor.id + "-" + index}
									name={actor.original_name}
									character={actor.character}
									profile_path={actor.profile_path}
								/>
							))
						) : (
							<p>Non renseigné</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
