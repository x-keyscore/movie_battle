import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { Movie } from "../requests/tmdb-types/tmdbMovie";

type TopmovieState = Movie | null;

type TopmovieSetState = Dispatch<SetStateAction<TopmovieState>>;

interface HeaderContextValue {
    topmovie: TopmovieState;
    setTopmovie: TopmovieSetState;
}

const HeaderContext = createContext<HeaderContextValue | null>(null);

export function useHeader() {
    const value = useContext(HeaderContext);

    if (value === null) throw new Error("Value is null");

    return (value);
}

interface HeaderProviderProps {
    children: ReactNode;
}

export function HeaderProvider({ children }: HeaderProviderProps) {
    const [topmovie, setTopmovie] = useState<TopmovieState>(null);

    return (
        <HeaderContext.Provider value={{ topmovie, setTopmovie }}>
            {children}
        </HeaderContext.Provider>
    )
}