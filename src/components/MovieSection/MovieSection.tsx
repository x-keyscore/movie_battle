import type { Movie } from "../../api/types/movie";
import { Link } from "react-router";
import { MovieCard } from "./../MovieCard";
import styles from "./MovieSection.module.css";
import clsx from "clsx";
import { useRef, useState } from "react";

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
	endIndex = 0,
}: MovieSectionProps) => {
	const containerRef = useRef<HTMLUListElement>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [startX, setStartX] = useState<number>(0);
	const [scrollLeft, setScrollLeft] = useState<number>(0);

	function handleMouseDown(e: React.MouseEvent<HTMLUListElement>) {
		if (!containerRef.current) return;
		setIsDragging(true);
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
		const walk = (e.pageX - startX) * 1;
		containerRef.current.scrollLeft = scrollLeft - walk;
	}

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
				)}
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
		</div>
	);
};
