import { useReducer } from "react";
import { Link } from "react-router";
import { Collapsible } from "../Collapsible";
import { GenreList } from "./dropdown";
import { Button } from "../Button";
import { Icons } from "../Icons";
import styles from "./Header.module.css";

import genresData from "../../mocks/genres.json";
import { useHeader } from "../../providers/HeaderProvider";

type ToggleState = {
    genreList: boolean;
    watchList: boolean;
};

type ToggleAction =
    | "CLOSE_GENRE_LIST"
    | "TOGGLE_GENRE_LIST"
    | "OPEN_WATCH_LIST"
    | "TOGGLE_WATCH_LIST"
    | "RESET";

const toggleReducer = (state: ToggleState, action: ToggleAction): ToggleState => {
    switch (action) {
        case "CLOSE_GENRE_LIST":
            return { ...state, genreList: false };
        case "TOGGLE_GENRE_LIST":
            return { ...state, genreList: !state.genreList };
        case "OPEN_WATCH_LIST":
            return { ...state, watchList: true };
        case "TOGGLE_WATCH_LIST":
            return { ...state, watchList: !state.watchList };
        case "RESET":
            return { genreList: false, watchList: false };
        default:
            return state;
    }
};

export function Header() {
    const { topmovie } = useHeader();
    const [toggle, setToggle] = useReducer(toggleReducer, {
        genreList: false,
        watchList: false
    });

    return (
        <div className={styles.header}>
            <div className={styles.topbar}>
                <div className={styles.topbarLeft}>
                    <Link to="/" className={styles.logo} aria-label="Menu">
                        <Icons.Logo />
                    </Link>
                </div>
                <div className={styles.topbarCenter}>
                    <div className={styles.search}>
                        <Icons.Search />
                        <input type="text" placeholder="Recherche" />
                    </div>
                    <Button
                        isActive={toggle.genreList}
                        aria-label="Choisir une catégorie"
                        aria-expanded={toggle.genreList}
                        aria-controls="genre-list-controls"
                        onClick={() => setToggle("TOGGLE_GENRE_LIST")}
                        onBlur={(e) => {
                            if (!e.relatedTarget?.closest('#genre-list-controls')) {
                                setToggle("CLOSE_GENRE_LIST");
                            }
                        }}
                    >
                        <Icons.Category />
                    </Button>
                    <div className={styles.droparea} id="genre-list-controls">
                        <Collapsible
                            without="bottom"
                            isOpen={toggle.genreList}
                            onBlur={() => setToggle("TOGGLE_GENRE_LIST")}
                        >
                            <GenreList genres={genresData.genres} />
                        </Collapsible>
                    </div>
                </div>
                <div className={styles.topbarRight}>
                    <Button aria-label="Vos films enregistrés">
                        <Icons.Reel />
                    </Button>
                </div>
            </div>
            <div className={styles.topmovie}>
                <div className={styles.topmovieBackdrop}>
                    <img src="/mocks/backdrop.png" role="presentation" />
                </div>
                <div className={styles.topmovieContent}>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            {topmovie?.title}
                        </div>
                        <div className={styles.synopsis}>
                            {topmovie?.overview}
                        </div>
                        <div className={styles.genres}>

                        </div>
                    </div>
                    <div className={styles.action}>
                        <Button size="small">
                            <span>Voir plus</span>
                        </Button>
                        <Button aria-label="Ajouter aux films enregistrés" size="small">
                            <Icons.AddToList />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}