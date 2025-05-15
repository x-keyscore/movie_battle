import { useEffect } from "react";
import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { useRequest } from "../../hooks/useRequest";
import { ActorCard, Image, MovieSection } from "../../components";
import { formatters } from "../../utils/formatters";
import { requests } from "../../api";
import language from "../../assets/data/iso3166-french.json";
import country from "../../assets/data/iso639-french.json";
import styles from "./MovieDetails.module.css";
import clsx from "clsx";

export function MovieDetailsPage() {
	const { movie_id } = useParams();
	const { setTopmovie } = useApp();

	const [data] = useRequest(
		{
			initial: null,
			subscribes: [movie_id],
		},
		async () => {
			if (!movie_id) return;

			const [movie, credits, similarMovies] = await Promise.all([
				requests.movie.getMovieDetails({ language: "fr-Fr", movie_id }),
				requests.credits.getCredits({ language: "fr-Fr", movie_id }),
				requests.movie.getSimilar({ language: "fr-Fr", movie_id }),
			]);

			return {
				movie: movie.data,
				credits: credits.data,
				similarMovies: similarMovies.data,
			};
		},
	);

	useEffect(() => {
		if (data) setTopmovie(data.movie);
	}, [data, setTopmovie]);

	function fallback(value: string | number) {
		return value || "Non renseigné";
	}

	if (!data) return (null);

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
			<div className={clsx(styles.section, styles.similar)}>
				{data.similarMovies.total_results ? (
					<MovieSection
						title="Similaires"
						inline={true}
						movies={data.similarMovies.results.sort(
							(a, b) => b.vote_count - a.vote_count,
						)}
						endIndex={12}
					/>
				) : null}
			</div>
			<div className={clsx(styles.section, styles.details)}>
				<Image
					styles={{
						box: styles.poster,
						img: styles.posterContent,
					}}
					alt={`Poster du film ${data.movie.title}`}
					src={`https://image.tmdb.org/t/p/w780${data.movie.poster_path}`}
				/>
				<div className={styles.content}>
					<div className={styles.title}>
						<h1 className={styles.text}>Details</h1>
						<div className={styles.spacer} />
					</div>
					<div className={`${styles.item} ${styles.overview}`}>
						<h3 className={styles.title}>Synopsis :</h3>
						<p className={styles.detail}>{fallback(data.movie.overview)}</p>
					</div>
					<ul className={styles.list}>
						<li className={styles.item}>
							<h3 className={styles.title}>Durée :</h3>
							<p className={styles.detail}>
								{fallback(formatters.movieRuntime(data.movie.runtime))}
							</p>
						</li>
						<li className={styles.item}>
							<h3 className={styles.title}>Date de sortie :</h3>
							<p className={styles.detail}>
								{fallback(data.movie.release_date)}
							</p>
						</li>
						<li className={styles.item}>
							<h3 className={styles.title}>Budgget :</h3>
							<p className={styles.detail}>
								{fallback(data.movie.budget).toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})}
							</p>
						</li>
						<li className={styles.item}>
							<h3 className={styles.title}>Revenue :</h3>
							<p className={styles.detail}>
								{fallback(data.movie.revenue).toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})}
							</p>
						</li>
						<li className={styles.item}>
							<h3 className={styles.title}>Langue d'origine :</h3>
							<p className={styles.detail}>
								{fallback(
									language[
										data.movie.original_language as keyof typeof language
									],
								)}
							</p>
						</li>
						<li className={styles.item}>
							<h3 className={styles.title}>Pays d'origine :</h3>
							<p className={styles.detail}>
								{fallback(
									country[data.movie.origin_country[0] as keyof typeof country],
								)}
							</p>
						</li>
						<li className={styles.item}>
							<h3 className={styles.title}>Directeurs :</h3>
							<ul>
								{directors.length
									? directors.map((director) => (
											<li key={director.id}>{director.original_name}</li>
										))
									: "Non renseigné"}
							</ul>
						</li>
						<li className={styles.item}>
							<h3 className={styles.title}>Maisons de production :</h3>
							<ul>
								{data.movie.production_companies.length
									? data.movie.production_companies.map((company) => (
											<li key={company.id}>{company.name}</li>
										))
									: "Non renseigné"}
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div className={clsx(styles.section, styles.distribution)}>
				<div className={styles.title}>
					<h1 className={styles.text}>Distribution</h1>
					<div className={styles.spacer} />
				</div>
				<div className={styles.actors}>
					{actors.length ? (
						actors.map((actor, index) => (
							<ActorCard
								key={`${actor.id}-${index}`}
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
		</>
	);
}
