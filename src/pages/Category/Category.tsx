import { useParams } from "react-router";
import { requests } from "../../api";
import { MovieSectionPagination } from "../../components/MovieSection";

export function CategoryPage() {
	const { category, genre_id } = useParams();

	async function fetchMovieTypeList(pageIndex: number) {
		switch (category) {
			case "popular":
				return (
					await requests.movie.getPopular({
						page: pageIndex,
						language: "fr-Fr",
					})
				).data.results;
			case "top-rated":
				return (
					await requests.movie.getTopRated({
						page: pageIndex,
						language: "fr-Fr",
					})
				).data.results;
			case "now-playing":
				return (
					await requests.movie.getNowPlaying({
						page: pageIndex,
						language: "fr-Fr",
					})
				).data.results;
			case "genre":
				if (genre_id) {
					return (
						await requests.movie.getSelectedGenre({
							with_genres: genre_id,
							page: pageIndex,
						})
					).data.results;
				}
				return [];
			default:
				console.error(`Unknown category: ${category}`);
				return [];
		}
	}

	return (
		<>
			<div key={category + (genre_id || "")}>
				<MovieSectionPagination
					fetchMovieTypeList={fetchMovieTypeList}
					inline={false}
					startIndex={1}
				/>
			</div>
		</>
	);
}
