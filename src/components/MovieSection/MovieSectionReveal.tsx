import type { Movie } from "../../api/types/movie";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { MovieCard } from "./../MovieCard";
import styles from "./MovieSection.module.css";
import clsx from "clsx";

interface MovieSectionProps {
	url?: string;
	title?: string;
	movies: Movie[];
	inline: boolean;
	startIndex?: number;
	endIndex?: number;
	onScrollEnd?: () => void;
}

export const MovieSectionReveal = ({
	url,
	title,
	movies,
	inline,
	startIndex = 0,
	endIndex = 0,
	onScrollEnd
}: MovieSectionProps) => {
	const onScrollEndRef = useRef(onScrollEnd);
	const loaderRef = useRef(null);

	onScrollEndRef.current = onScrollEnd;

	useEffect(() => {
		if (!loaderRef.current || !onScrollEndRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const firstEntry = entries[0];
				if (firstEntry.isIntersecting) {
					onScrollEndRef.current?.();
				}
			},
			{ threshold: 1.0 }
		);

		observer.observe(loaderRef.current);

		return () => observer.disconnect();
	}, []);

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
			<div className={styles.loadWhenDisplayed} ref={loaderRef} />
		</div>
	);
};