import { Link } from "react-router";
import { MovieCard } from "./../MovieCard";
import type { MovieList } from "../../api/types/movie";
import styles from "./MovieSection.module.css";
import clsx from "clsx";

interface MovieSectionProps {
	url?: string;
	title: string;
	movies: MovieList;
	inline: boolean;
	maxCards: number;
}

export const MovieSection = ({
	url,
	title,
	movies,
	inline,
	maxCards,
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
					inline ? styles.inline : styles.grid,
				)}
			>
				{movies.results.slice(0, maxCards).map((movie) => (
					<li key={movie.id} className={styles.item}>
						<MovieCard
							id={movie.id}
							title={movie.title}
							genreIds={movie.genre_ids}
							backdropPath={movie.backdrop_path}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
