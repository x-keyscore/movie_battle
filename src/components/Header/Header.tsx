import type { ToggleAction, ToggleState } from "./types";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { Icons, Button, Collapsible } from "../";
import { useApp } from "../../providers/AppProvider";
import { CategoryList,  WatchList } from "./dropdown";
import { normalize } from "../../utils/normalize";
import styles from "./Header.module.css";

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
    const navigate = useNavigate();
    const { topmovie, watchListPush } = useApp();
    const [toggle, setToggle] = useReducer(toggleReducer, {
        categoryList: false,
        watchList: false
    });

    const topmovieGenres = normalize.movieGenres(topmovie);

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
                        aria-controls="category-list-collapse"
                        onClick={() => setToggle("CATEGORY_LIST")}
                    >
                        <Icons.Category />
                    </Button>
                    <Collapsible
                        id="category-list-collapse"
                        isOpen={toggle.categoryList}
                        styles={{
                            wrapper: styles.collapsibleWrapper,
                            content: styles.collapsibleContent
                        }}
                        without="bottom"
                        onFocusOut={() => setToggle("CATEGORY_LIST")}
                        onClickOut={() => setToggle("CATEGORY_LIST")}
                    >
                        <CategoryList />
                    </Collapsible>
                </div>
                <div className={styles.topbarRight}>
                    <div className={styles.context}>
                        <Button
                            isActive={toggle.watchList}
                            aria-label="Vos films enregistrés"
                            aria-expanded={toggle.watchList}
                            aria-controls="watch-list-collapse"
                            onClick={() => setToggle("WATCH_LIST")}
                        >
                            <Icons.Reel />
                        </Button>
                        <Collapsible
                            id="watch-list-collapse"
                            isOpen={toggle.watchList}
                            styles={{
                                wrapper: styles.collapsibleWrapper,
                                content: styles.collapsibleContent
                            }}
                            without="bottom"
                            onEventOff={[{ name: "data-event-off", value: "watch-list-collapse" }]}
                            onFocusOut={() => setToggle("WATCH_LIST")}
                            onClickOut={() => setToggle("WATCH_LIST")}
                        >
                            <WatchList />
                        </Collapsible>
                    </div>
                </div>
            </div>
            <div className={styles.topmovie}>
                <div className={styles.topmovieUnderlay}>
                    {topmovie?.backdrop_path ? (
                        <img
                            className={styles.backdrop}
                            draggable="false"
                            role="presentation"
                            src={`https://image.tmdb.org/t/p/original${topmovie?.backdrop_path}`}
                        />
                    ) : (
                        <img
                            className={styles.poster}
                            draggable="false"
                            role="presentation"
                            src={`https://image.tmdb.org/t/p/original${topmovie?.poster_path}`}
                        />
                    )}
                </div>
                <div className={styles.topmovieContent}>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            {topmovie?.title}
                        </div>
                        {topmovie?.overview && (
                            <div className={styles.synopsis}>
                                {topmovie.overview}
                            </div>
                        )}
                        {topmovieGenres.length && (
                            <ul className={styles.genres}>
                                {topmovieGenres.map((genre) => (
                                    <li key={genre.id}>
                                        <Link
                                            draggable="false"
                                            className={styles.link}
                                            to={`/category/genre/${genre.id}`}
                                        >
                                            {genre.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className={styles.action}>
                        <Button size="small" onClick={() => navigate(`/movie/${topmovie?.id}`)}>
                            <span>Voir plus</span>
                        </Button>
                        <Button
                            size="small"
                            aria-label="Ajouter aux films enregistrés"
                            data-event-off="watch-list-collapse"
                            onClick={() => topmovie && watchListPush(topmovie)}
                        >
                            <Icons.AddToList />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*

*/