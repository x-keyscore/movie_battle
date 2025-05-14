import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Movie, MovieWithDetails } from "../api";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { requests } from "../api";
import { useLocation } from "react-router";

type SearchValueState = string;
type SearchValueSetState = Dispatch<SetStateAction<SearchValueState>>;

type TopmovieState = Movie | MovieWithDetails | null;
type TopmovieSetState = Dispatch<SetStateAction<TopmovieState>>;

type ErrorState = { title: string, message: string } | null;
type ErrorSetState = Dispatch<SetStateAction<ErrorState>>;

type WatchListState = MovieWithDetails[];

const AppContext = createContext<{
	error: ErrorState;
	setError: ErrorSetState;

	topmovie: TopmovieState;
	setTopmovie: TopmovieSetState;

	watchList: WatchListState;
	watchListPush: (movie: Movie | MovieWithDetails) => void;
	watchListRemove: (id: number) => void;

	searchValue: SearchValueState;
	setSearchValue: SearchValueSetState;
} | null>(null);

export function useApp() {
	const value = useContext(AppContext);
	if (value === null) {
		throw new Error("Value is null");
	}
	return (value);
}

interface AppProviderProps {
	children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
	const { pathname } = useLocation();
	const [searchValue, setSearchValue] = useState("");
	const [watchList, setWatchList] = useLocalStorage<MovieWithDetails[]>("WATCH-LIST", []);
	const [topmovie, setTopmovie] = useState<TopmovieState>(null);
	const [error, setError] = useState<ErrorState>(null);

	const watchListPush = (movie: Movie | MovieWithDetails) => {
		if (watchList.some((item) => item.id === movie.id)) return;

		if ("genres" in movie) {
			setWatchList((prev) => {
				return [...prev, movie];
			});
		} else {
			requests.movie
				.getMovieDetails({ language: "fr-FR", movie_id: movie.id })
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

	useEffect(() => {
		return () => setError(null);
	}, [pathname]);

	return (
		<AppContext.Provider
			value={{
				error,
				setError,
				topmovie,
				setTopmovie,
				watchList,
				watchListPush,
				watchListRemove,
				searchValue,
				setSearchValue
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
