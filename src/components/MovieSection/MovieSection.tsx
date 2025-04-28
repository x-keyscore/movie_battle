import type { MovieList } from "../../api";
import { Link } from "react-router";
import { MovieCard } from "./../MovieCard";
import styles from "./MovieSection.module.css";
import clsx from "clsx";

interface MovieSectionProps {
	url?: string;
	title: string;
	movies: MovieList;
	inline: boolean;
	startIndex?: number;
	endIndex?: number
}

export const MovieSection = ({
	url,
	title,
	movies,
	inline,
	startIndex = 0,
	endIndex = movies.results.length
}: MovieSectionProps) => {
	return (
		<div className={styles.section}>
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
			<ul
				className={clsx(
					styles.sectionMovies,
					inline ? styles.inline : styles.grid
				)}
			>
				{movies.results.slice(startIndex, endIndex).map((movie) => (
					<li key={movie.id} className={styles.item}>
						<MovieCard movie={movie} />
					</li>
				))}
			</ul>
		</div>
	);
};
