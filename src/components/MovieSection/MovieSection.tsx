import type { Movie } from "../../api/types/movie";
import { useState, useEffect, useRef } from "react";
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
	const containerRef = useRef<HTMLUListElement>(null);
	const dragDistanceRef = useRef<number>(0);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [startX, setStartX] = useState<number>(0);
	const [scrollLeft, setScrollLeft] = useState<number>(0);

	function handleMouseDown(e: React.MouseEvent<HTMLUListElement>) {
		if (!containerRef.current) return;
		setIsDragging(true);
		dragDistanceRef.current = 0;
		setStartX(e.pageX);
		setScrollLeft(containerRef.current.scrollLeft);
	}

	function handleMouseUp() {
		if (isDragging) {
			setIsDragging(false);
		}
	}

	function handleMouseLeave() {
		if (isDragging) {
			setIsDragging(false);
		}
	}

	function handleMouseMove(e: React.MouseEvent<HTMLUListElement>) {
		if (!isDragging || !containerRef.current) return;
		e.preventDefault();
		const distance = Math.abs(e.pageX - startX);
		dragDistanceRef.current = distance;
		const walk = (e.pageX - startX) * 1;
		containerRef.current.scrollLeft = scrollLeft - walk;
	}

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
				ref={containerRef}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				className={clsx(
					styles.sectionMovies,
					inline ? styles.inline : styles.grid,
					isDragging && styles.dragging,
				)}
			>
				{movies
					.slice(startIndex, endIndex || movies.length)
					.map((movie, index) => {
						return (
							<li key={`${movie.id}-${index}`} className={styles.item}>
								<MovieCard movie={movie} dragDistanceRef={dragDistanceRef} />
							</li>
						);
					})}
			</ul>
			{onScrollEnd && <div className={styles.sentinel} ref={sentinelRef} />}
		</div>
	);
};
