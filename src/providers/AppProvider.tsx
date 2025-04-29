import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Movie, MovieWithDetails } from "../api";
import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { requests } from "../api";

type TopmovieState = Movie | MovieWithDetails | null;
type TopmovieSetState = Dispatch<SetStateAction<TopmovieState>>;

type WatchListState = MovieWithDetails[];

const AppContext = createContext<{
	topmovie: TopmovieState;
	setTopmovie: TopmovieSetState;
	watchList: WatchListState;
	watchListPush: (movie: Movie | MovieWithDetails) => void;
	watchListRemove: (id: number) => void;
} | null>(null);

export function useApp() {
	const value = useContext(AppContext);
	if (value === null) throw new Error("Value is null");
	return value;
}

interface AppProviderProps {
	children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
	const [topmovie, setTopmovie] = useState<TopmovieState>(null);
	const [watchList, setWatchList] = useLocalStorage<MovieWithDetails[]>(
		"WATCH-LIST",
		[],
	);

	const watchListPush = (movie: Movie | MovieWithDetails) => {
		if (watchList.some((item) => item.id === movie.id)) return;

		if ("genres" in movie) {
			setWatchList((prev) => {
				return [...prev, movie];
			});
		} else {
			requests.movie
				.getMovieDetails({ language: "fr-Fr", movie_id: movie.id })
				.then((result) => {
					setWatchList((prev) => {
						return [...prev, result.data];
					});
				});
		}
	};

	const watchListRemove = (id: Movie["id"]) => {
		setWatchList((prev) => {
			const index = prev.findIndex((item) => item.id === id);
			if (index < 0) return prev;

			return [...prev.slice(0, index), ...prev.slice(index + 1)];
		});
	};

	return (
		<AppContext.Provider
			value={{
				topmovie,
				setTopmovie,
				watchList,
				watchListPush,
				watchListRemove,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
