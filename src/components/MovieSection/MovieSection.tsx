import moviesData from "./../../mocks/movies.json";
import { MovieCard } from "./../MovieCard";
import styles from "./MovieSection.module.css";

interface MovieSectionProps {
	type: string;
}

export const MovieSection = ({ type }: MovieSectionProps) => {
	return (
		<>
			<h2 className={styles.sectionTitle}>{type}</h2>
			<div className={styles.container}>
				<ul className={styles.moviesList}>
					{moviesData.results.map((movie) => (
						<li key={movie.id} className={styles.movieItem}>
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
		</>
	);
};
