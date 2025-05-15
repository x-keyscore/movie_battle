import type { Movie, MovieWithDetails } from "../../api";
import { Link } from "react-router";
import { Icons, Image, Button } from "../";
import { useApp } from "../../providers/AppProvider";
import { formatters } from "../../utils/formatters";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
	movie: Movie | MovieWithDetails;
}

export function MovieCard({ movie }: MovieCardProps) {
	const { watchList, watchListPush, watchListRemove } = useApp();
	const movieGenres = formatters.movieGenres(movie);
	const movieImagePath = movie.backdrop_path || movie.poster_path;
	const isInWatchlist = watchList.find((item) => item.id === movie.id);

	const handleWatchlist = () => {
		if (isInWatchlist) {
			watchListRemove(movie.id);
		} else {
			watchListPush(movie);
		}
	};

	return (
		<div className={styles.card}>
			<figure className={styles.figure}>
				<Link
					to={`/movie/${movie.id}`}
					draggable="false"
					aria-label={`Voir les détails du film ${movie.title}`}
				>
					<Image
						styles={{
							box: styles.image,
							img: styles.imageContent
						}}
						role="presentation"
						isLoadable={movieImagePath}
						src={`https://image.tmdb.org/t/p/w780${movieImagePath}`}
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
						data-event-off="foldable-watch-list"
						onClick={handleWatchlist}
					>
						{isInWatchlist ? <Icons.Cross /> : <Icons.AddToList />}
					</Button>
				</figcaption>
			</figure>
		</div>
	);
}
