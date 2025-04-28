import { useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { ActorCard } from "../../components/ActorCard";
import { MovieSection } from "../../components/MovieSection";
import { requests } from "../../api";
import language from "../../data/iso3166-french.json";
import country from "../../data/iso639-french.json";
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
		return value || "Non renseigné";
	}

	function toHoursAndMinutes(totalMinutes: number) {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return `${hours} h ${minutes} m`;
	}

	useEffect(() => {
		if (!data) return;

		setTopmovie(data.movie);
	}, [data, setTopmovie]);

	if (!data) return null;

	const directors = data.credits.crew
		.filter((member) => member.known_for_department === "Directing")
		.filter(
			(director, index, self) =>
				index === self.findIndex((d) => d.id === director.id),
		);

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
								<p className={styles.detail}>
									{data.movie.runtime
										? toHoursAndMinutes(data.movie.runtime)
										: "Non renseigné"}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Date de sortie :</h3>
								<p className={styles.detail}>
									{normalize(data.movie.release_date)}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Budgget :</h3>
								<p className={styles.detail}>
									{normalize(data.movie.budget).toLocaleString("en-US", {
										style: "currency",
										currency: "USD",
									})}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Revenue :</h3>
								<p className={styles.detail}>
									{normalize(data.movie.revenue).toLocaleString("en-US", {
										style: "currency",
										currency: "USD",
									})}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Langue d'origine :</h3>
								<p className={styles.detail}>
									{normalize(
										language[
											data.movie.original_language as keyof typeof language
										],
									)}
								</p>
							</li>
							<li className={styles.detailItem}>
								<h3 className={styles.detailTitle}>Pays d'origine :</h3>
								<p className={styles.detail}>
									{normalize(
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
}
