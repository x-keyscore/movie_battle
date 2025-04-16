import type { ToggleAction, ToggleState } from "./types";
import { useReducer } from "react";
import { Link } from "react-router";
import { Collapsible } from "../Collapsible";
import { CategoryList } from "./dropdown";
import { WatchList } from "./dropdown/WatchList";
import { Button } from "../Button";
import { Icons } from "../Icons";
import styles from "./Header.module.css";

import genresData from "../../mocks/genres.json";

const toggleReducer = (state: ToggleState, action: ToggleAction): ToggleState => {
    switch (action) {
        case "CATEGORY_LIST":
            return { ...state, categoryList: !state.categoryList };
        case "WATCH_LIST":
            return { ...state, watchList: !state.watchList };
        case "RESET":
            return { categoryList: false, watchList: false };
        default:
            return state;
    }
};

export function Header() {
    const [toggle, setToggle] = useReducer(toggleReducer, {
        categoryList: false,
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
                        isActive={toggle.categoryList}
                        aria-label="Catégories"
                        aria-expanded={toggle.categoryList}
                        aria-controls="collaps-category-list"
                        onClick={() => setToggle("CATEGORY_LIST")}
                    >
                        <Icons.Category />
                    </Button>
                    <Collapsible
                        id="collaps-category-list"
                        without="bottom"
                        styles={{
                            wrapper: styles.collapsible,
                            content: styles.collapsibleContent
                        }}
                        isOpen={toggle.categoryList}
                        onFocusOut={() => setToggle("CATEGORY_LIST")}
                        onClickOut={() => setToggle("CATEGORY_LIST")}
                    >
                        <CategoryList genres={genresData.genres} />
                    </Collapsible>
                </div>
                <div className={styles.topbarRight}>
                    <Button
                        isActive={toggle.watchList}
                        aria-label="Vos films enregistrés"
                        aria-expanded={toggle.watchList}
                        aria-controls="collaps-watch-list"
                        onClick={() => setToggle("WATCH_LIST")}
                    >
                        <Icons.Reel />
                    </Button>
                    <Collapsible
                        id="collaps-watch-list"
                        without="bottom"
                        styles={{
                            wrapper: styles.collapsible,
                            content: styles.collapsibleContent
                        }}
                        isOpen={toggle.watchList}
                        onFocusOut={() => setToggle("WATCH_LIST")}
                        onClickOut={() => setToggle("WATCH_LIST")}
                    >
                        <WatchList />
                    </Collapsible>
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