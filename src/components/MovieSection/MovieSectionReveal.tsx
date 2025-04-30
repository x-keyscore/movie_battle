import type { Movie } from "../../api";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { MovieCard } from "../MovieCard";
import { useRequest } from "../../hooks/useRequest";
import { useApp } from "../../providers/AppProvider";
import styles from "./MovieSection.module.css";
import clsx from "clsx";

interface MovieSectionRevealProps {
	url?: string;
	title?: string;
	inline: boolean;
	minMovies?: number;
	maxMovies?: number,
	pageIndex: number;
	setPageIndex: (index: number) => void;
	fetchMovies: (prevMovies: () => Movie[]) => Promise<Movie[]>;
	fetchDependencies: unknown[];
}

export function MovieSectionReveal({
	url,
	title,
	inline,
	pageIndex,
	setPageIndex,
	fetchMovies,
	fetchDependencies
}: MovieSectionRevealProps) {
	const { setTopmovie } = useApp();
	const [movies] = useRequest<Movie[]>([], async (prevMovies) => {
			return (fetchMovies(prevMovies));
		},
		[...fetchDependencies]
	);
	const loaderRef = useRef(null);

	useEffect(() => {
		if (movies[0]) setTopmovie(movies[0]);
	}, [movies, setTopmovie]);

	useEffect(() => {
		if (!loaderRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const firstEntry = entries[0];
				if (firstEntry.isIntersecting) {
					setPageIndex(pageIndex++);
				}
			},
			{ threshold: 1.0 }
		);

		observer.observe(loaderRef.current);

		return () => observer.disconnect();
	}, [pageIndex, setPageIndex]);

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
			<ul className={clsx(styles.sectionMovies, inline ? styles.inline : styles.grid)}>
				{movies.map((movie, index) => (
					<li key={`${movie.id}-${index}`} className={styles.item}>
						<MovieCard movie={movie} />
					</li>
				))}
			</ul>
			<div className={styles.loadWhenDisplayed} ref={loaderRef} />
		</div>
	);
};
