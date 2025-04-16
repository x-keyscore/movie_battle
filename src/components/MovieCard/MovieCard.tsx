import { Link } from "react-router";
import { Button } from "../Button";
import { Icons } from "../Icons";
import styles from "./MovieCard.module.css";

import genresData from "../../mocks/genres.json";

interface MovieCardProps {
	id: number;
	title: string;
	genreIds: number[];
	backdropPath: string;
}

export const MovieCard = ({
	id,
	title,
	genreIds,
	backdropPath,
}: MovieCardProps) => {
	const getMovieGenres = () => {
		return genreIds.map((genreId) => {
			const { name } = genresData.genres.find((genre) => genre.id === genreId)!;

			return {
				name,
				genreId,
			};
		});
	};

	const handleWatchlist = (id: number) => {
		console.log("ADD/REM Watchlist: ", id);
	};

	return (
		<div className={styles.card} role="button">
			<figure className={styles.figure}>
				<Link to={`/movie/${id}`}>
					<img
						className={styles.figureImage}
						src={`https://image.tmdb.org/t/p/w780${backdropPath}`}
						alt={title}
						draggable="false"
					/>
				</Link>
				<figcaption className={styles.figcaption}>
					<div className={styles.figcaptionInfo}>
						<h2 className={styles.title}>{title}</h2>
						<ul className={styles.genres}>
							{getMovieGenres().map(({ name, genreId }, index) => {
								return (
									<li key={genreId}>
										<Link
											to={`/search/genre/${genreId}`}
											className={styles.link}
										>
											{name}
										</Link>
										{index < genreIds.length - 1 && " -"}
									</li>
								);
							})}
						</ul>
					</div>
					<Button
						size="small"
						variant="ghost"
						className={styles.button}
						onClick={(e) => {
							e.preventDefault();
							handleWatchlist(id);
						}}
					>
						<Icons.AddToList />
					</Button>
				</figcaption>
			</figure>
		</div>
	);
};
