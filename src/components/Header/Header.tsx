import { useReducer } from "react";
import { Link } from "react-router";
import { Collapsible } from "../Collapsible";
import { GenreList } from "./dropdown";
import { Button } from "../Button";
import { Icons } from "../Icons";
import styles from "./Header.module.css";

import genresData from "../../mocks/genres.json";

type ToggleState = {
    genreList: boolean;
    watchList: boolean;
};

type ToggleAction = "GENRE_LIST" | "WATCH_LIST" |"RESET";

const toggleReducer = (state: ToggleState, action: ToggleAction): ToggleState => {
    switch (action) {
        case "GENRE_LIST":
            return { ...state, genreList: !state.genreList };
        case "WATCH_LIST":
            return { ...state, watchList: !state.watchList };
        case "RESET":
            return { genreList: false, watchList: false };
        default:
            return state;
    }
};

export function Header() {
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
                        aria-label="Films par catégories"
                        isActive={toggle.genreList}
                        onClick={() => setToggle("GENRE_LIST")}
                        onFocus={() => setToggle("GENRE_LIST")}
                    >
                        <Icons.Category />
                    </Button>
                    <div className={styles.dropdown}>
                        <Collapsible without="bottom" isOpen={toggle.genreList}>
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
                            Novocaine
                        </div>
                        <div className={styles.synopsis}>
                            Quand la femme de ses rêves est kidnappée, Nate, un homme ordinaire,
                            réussit à mettre à profit sa capacité à ne pas ressentir la douleur.
                            Une force imprévue qui l'aidera dans sa lutte pour la récupérer.
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