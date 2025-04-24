import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { Movie, MovieWithDetails } from "../api/types/movie";
import { useLocalStorage } from "../hooks/useLocalStorage";

type TopmovieState = Movie | MovieWithDetails | null;
type TopmovieSetState = Dispatch<SetStateAction<TopmovieState>>;

type WatchListState = Movie[];

const AppContext = createContext<{
    topmovie: TopmovieState;
    setTopmovie: TopmovieSetState;
    watchList: WatchListState;
    watchListPush: (movie: Movie) => void;
    watchListRemove: (id: number) => void;
} | null>(null);

export function useApp() {
    const value = useContext(AppContext);
    if (value === null) throw new Error("Value is null");
    return (value);
}

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    const [topmovie, setTopmovie] = useState<TopmovieState>(null);
    const [watchList, setWatchList] = useLocalStorage<Movie[]>("WATCH-LIST", []);

    const watchListPush = (movie: Movie) => {
        setWatchList((prev) => {
            const index = prev.findIndex((item) => item.id === movie.id);
            if (index >= 0) return (prev);
            return ([...prev, movie]);
        });
    }

    const watchListRemove = (id: Movie['id']) => {
        setWatchList((prev) => {
            const index = prev.findIndex((item) => item.id === id);
            if (index < 0) return (prev);
            return (([
                ...prev.slice(0, index),
                ...prev.slice(index + 1)
            ]));
        });
    }

    return (
        <AppContext.Provider value={{ topmovie, setTopmovie, watchList, watchListPush, watchListRemove }}>
            {children}
        </AppContext.Provider>
    )
}