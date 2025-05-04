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
	onScrollEnd?: () => ((() => void) | void);
}

export function MovieSection({
	url,
	title,
	movies,
	inline,
	startIndex = 0,
	endIndex = 0,
	onScrollEnd
}: MovieSectionProps) {
	const onScrollEndRef = useRef(onScrollEnd);
	const sentinelRef = useRef(null);

	useEffect(() => {
		if (onScrollEnd) onScrollEndRef.current = onScrollEnd;
	}, [onScrollEnd]);

	useEffect(() => {
		if (!onScrollEnd || !sentinelRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					onScrollEndRef.current?.();
				}
			},
			{ threshold: 1.0 }
		);

		observer.observe(sentinelRef.current);

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
			{onScrollEnd && <div className={styles.sentinel} ref={sentinelRef} />}
		</div>
	);
};
