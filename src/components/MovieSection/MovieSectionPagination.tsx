import type { MovieList } from "../../api";
import { Link } from "react-router";
import { MovieCard } from "./../MovieCard";
import styles from "./MovieSection.module.css";
import clsx from "clsx";
import { useRequest } from "../../hooks/useRequest";
import { useEffect, useState } from "react";
import { useApp } from "../../providers/AppProvider";

interface MovieSectionProps {
	url?: string;
	title?: string;
	movies?: MovieList;
	inline: boolean;
	startIndex?: number;
	endIndex?: number;
	fetchMovieTypeList: (page: number) => Promise<MovieList["results"]>;
}

export const MovieSectionPagination = ({
	url,
	title,
	inline,
	startIndex = 0,
	endIndex = Number.POSITIVE_INFINITY,
	fetchMovieTypeList,
}: MovieSectionProps) => {
	const { setTopmovie } = useApp();
	const [pageIndex, setPageIndex] = useState(1);
	const [data] = useRequest<MovieList["results"]>(
		[],
		async (getPrev) => {
			const movieFetched = await fetchMovieTypeList(pageIndex);
			return [...getPrev(), ...movieFetched];
		},
		[pageIndex],
	);

	useEffect(() => {
		if (!data[0]) return;
		setTopmovie(data[0]);
	}, [setTopmovie, data]);

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
				{data.slice(startIndex, endIndex).map((movie) => (
					<li key={movie.id} className={styles.item}>
						<MovieCard movie={movie} />
					</li>
				))}
			</ul>
			<button type="button" onClick={() => setPageIndex((prev) => prev + 1)}>
				TEST
			</button>
		</div>
	);
};
