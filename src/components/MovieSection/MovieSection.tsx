import moviesData from "./../../mocks/movies.json";
import { MovieCard } from "./../MovieCard";
import styles from "./MovieSection.module.css";

interface MovieSectionProps {
	type: string;
	maxNbrCards: number;
	oneLine: boolean;
}

export const MovieSection = ({
	type,
	maxNbrCards,
	oneLine,
}: MovieSectionProps) => {
	return (
		<>
			<div className={styles.sectionMovies}>
				<h2 className={styles.sectionTitle}>Films - {type}</h2>
				<div className={styles.container}>
					<ul
						className={oneLine ? styles.moviesListOneLine : styles.moviesList}
					>
						{moviesData.results
							.filter((movie, index) => movie && index < maxNbrCards)
							.map((movie) => (
								<li
									key={movie.id}
									className={oneLine ? styles.movieItemFixedWidth : ""}
								>
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
			</div>
		</>
	);
};
