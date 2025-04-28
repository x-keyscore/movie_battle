import type { Movie, MovieWithDetails } from "../../api";
import { Link } from "react-router";
import { Icons, Image, Button } from "../";
import { useApp } from "../../providers/AppProvider";
import { normalize } from "../../utils/normalize";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
	movie: Movie | MovieWithDetails;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
	const { watchListPush } = useApp();

	const movieGenres = normalize.movieGenres(movie);
	const movieImagePath = movie.backdrop_path || movie.poster_path;

	return (
		<div className={styles.card}>
			<figure className={styles.figure}>
				<Link
					to={`/movie/${movie.id}`}
					draggable="false"
					aria-label={`Voir les détails du film ${movie.title}`}
				>
					<Image
						className={styles.image}
						draggable="false"
						role="presentation"
						loading="lazy"
						src={`https://image.tmdb.org/t/p/original${movieImagePath}`}
					/>
				</Link>
				<figcaption className={styles.figcaption}>
					<div className={styles.figcaptionInfo}>
						<h2 className={styles.title}>{movie.title}</h2>
						<ul className={styles.genres}>
							{movieGenres.map((genre) => {
								return (
									<li key={genre.id}>
										<Link
											to={`/category/genre/${genre.id}`}
											className={styles.link}
										>
											{genre.name}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
					<Button
						className={styles.button}
						size="small"
						variant="ghost"
						aria-label="Ajouter aux films enregistrés"
						data-event-off="watch-list-collapse"
						onClick={() => watchListPush(movie)}
					>
						<Icons.AddToList />
					</Button>
				</figcaption>
			</figure>
		</div>
	);
};
