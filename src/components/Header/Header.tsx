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
import { useHeader } from "../../providers/HeaderProvider";

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
    const { topmovie } = useHeader();
    const [toggle, setToggle] = useReducer(toggleReducer, {
        categoryList: false,
        watchList: false
    });
    console.log(topmovie?.backdrop_path);
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
                        without="bottom"
                        zIndex={100}
                        styles={{
                            wrapper: styles.collapsibleWrapper,
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
                            without="bottom"
                            zIndex={100}
                            styles={{
                                wrapper: styles.collapsibleWrapper,
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
            </div>
            <div className={styles.topmovie}>
                <div className={styles.topmovieBackdrop}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${topmovie?.backdrop_path}`}
                        draggable="false"
                        role="presentation"
                    />
                </div>
                <div className={styles.topmovieContent}>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            {topmovie?.title}
                        </div>
                        <div className={styles.synopsis}>
                            {topmovie?.overview}
                        </div>
                        <ul className={styles.genres}>
                            {
                                topmovie?.genre_ids.map((genre_id) => (
                                    <li key={genre_id}>
                                        <Link to={`/category/genre/${genre_id}`} className={styles.link}>
                                            {genresData.genres.find(({ id }) => id === genre_id)?.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={styles.action}>
                        <Button size="small">
                            <span>Voir plus</span>
                        </Button>
                        <Button size="small" aria-label="Ajouter aux films enregistrés">
                            <Icons.AddToList />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}