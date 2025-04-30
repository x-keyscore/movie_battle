import type { Movie } from "../../api/types/movie";
import { Link } from "react-router";
import { MovieCard } from "./../MovieCard";
import styles from "./MovieSection.module.css";
import clsx from "clsx";

interface MovieSectionProps {
	url?: string;
	title?: string;
	inline: boolean;
	startIndex?: number;
	endIndex?: number;
	movies: Movie[];
}

export const MovieSection = ({
	url,
	title,
	movies,
	inline,
	startIndex = 0,
	endIndex = 0
}: MovieSectionProps) => {
	return (
		<div className={styles.section}>
			{title ? (
				<h2 className={styles.sectionTitle}>
					<span>Films - </span>
					{url ? (
						<Link className={styles.link} to={url}>
							{title}
						</Link>
					) : (
						<span className={styles.highlight}>{title}</span>
					)}
				</h2>
			) : null}
			<ul
				className={clsx(
					styles.sectionMovies,
					inline ? styles.inline : styles.grid,
				)}
			>
				{movies.slice(startIndex, endIndex || movies.length).map((movie, index) => {
					return (
						<li key={movie.id + "-" + index} className={styles.item}>
							<MovieCard movie={movie} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};
