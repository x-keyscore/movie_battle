import type { Movie } from "../../api/types/movie";
import React, { useEffect, useRef, useState } from "react";
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
	const listRef = useRef<HTMLUListElement>(null);
	const sentinelRef = useRef(null);
	const onScrollEndRef = useRef(onScrollEnd);
	const [isDragging, setIsDragging] = useState(false);

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

	useEffect(() => {
		const container = listRef.current;
		if (!container) return;

		const onMouseDown = (e: MouseEvent) => {
			
			setIsDragging(false);
			let startX = e.pageX - container.offsetLeft;
			let  scrollLeft = container.scrollLeft;

			const onMouseMove = (e: MouseEvent) => {
				const x = e.pageX - container.offsetLeft;
				const walk = x - startX;

				if (Math.abs(walk) > 5) {
					setIsDragging(true);
					container.scrollLeft = scrollLeft - walk;
				}
			};

			const onMouseUp = () => {
				window.removeEventListener("mousemove", onMouseMove);
				window.removeEventListener("mouseup", onMouseUp);
			};

			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
		};

		container.addEventListener("mousedown", onMouseDown);

		return () => {
			container.removeEventListener("mousedown", onMouseDown);
		};
	}, []);

	const onClickCapture = (e: React.MouseEvent) => {
		if (isDragging) {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);
		}
	};

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
				ref={listRef}
				className={clsx(
					styles.sectionMovies,
					inline ? styles.inline : styles.grid,
					isDragging && styles.dragging,
				)}
				onClickCapture={onClickCapture}
			>
				{movies
					.slice(startIndex, endIndex || movies.length)
					.map((movie, index) => {
						return (
							<li key={`${movie.id}-${index}`} className={styles.item}>
								<MovieCard movie={movie} />
							</li>
						);
					})}
			</ul>
			{onScrollEnd && <div className={styles.sentinel} ref={sentinelRef} />}
		</div>
	);
};
