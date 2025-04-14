import { Link } from "react-router";
import { Icons } from "../icons";
import styles from "./MovieCard.module.css";

import genresData from "../../mocks/genres.json";

interface MovieCardProps {
	id: number;
	title: string;
	genre_ids: number[];
	backdrop_path: string;
}

export const MovieCard = ({
	id,
	title,
	genre_ids,
	backdrop_path,
}: MovieCardProps) => {
	const handleWatchlist = (id: number) => {
		console.log("ADD/REM Watchlist: ", id);
	};

	/* console.log(genresData.genres); */

	return (
		<>
			<div className={styles.card}>
				<figure className={styles.cardFigure}>
					<Link to={`/movie/${id}`}>
						<img
							className={styles.cardImg}
							src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
							alt={title}
						/>
					</Link>
					<figcaption className={styles.cardInfosContainer}>
						<div className={styles.cardInfos}>
							<h2 className={styles.title}>{title}</h2>
							<ul className={styles.genres}>
								{genre_ids.map((genre_id, index) => {
									const genre = genresData.genres.find(
										(genre) => genre.id === genre_id,
									)!;
									return (
										<li key={genre_id}>
											<Link
												to={`/search/genre/${genre_id}`}
												className={styles.genre}
											>
												{genre.name}
											</Link>
											{index < genre_ids.length - 1 && " -"}
										</li>
									);
								})}
							</ul>
						</div>
						<button
							className={styles.button}
							type="button"
							onClick={(e) => {
								e.preventDefault();
								handleWatchlist(id);
							}}
						>
							<Icons.AddToList />
						</button>
					</figcaption>
				</figure>
			</div>
		</>
	);
};
