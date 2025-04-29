import type { ChangeEventHandler } from "react";
import type { ToggleAction, ToggleState } from "./types";
import { useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { Icons, Button, Collapsible, Image } from "../../components";
import { CategoryList, WatchList } from "./dropdown";
import { normalize } from "../../utils/normalize";
import styles from "./Header.module.css";

const toggleReducer = (
    state: ToggleState,
    action: ToggleAction
): ToggleState => {
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
    const { searchValue, setSearchValue, topmovie, watchListPush } = useApp();
    const [toggle, setToggle] = useReducer(toggleReducer, {
        categoryList: false,
        watchList: false
    });

    useEffect(() => {
        if (!searchValue) return;
    
        const timeout = setTimeout(() => {
            console.log("search : ", searchValue)
            navigate("/search/" + searchValue);
        }, 300);
    
        return () => clearTimeout(timeout);
      }, [searchValue, navigate]);

    const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchValue(e.currentTarget.value);
    }

    const topmovieGenres = normalize.movieGenres(topmovie);

    return (
        <header className={styles.header}>
            <div className={styles.topbar}>
                <div className={styles.topbarLeft}>
                    <Link to="/" className={styles.logo} aria-label="Menu">
                        <Icons.BrandLogo />
                    </Link>
                </div>
                <div className={styles.topbarCenter}>
                    <div className={styles.search}>
                        <Icons.Search />
                        <input
                            type="text"
                            placeholder="Recherche"
                            value={searchValue}
                            onChange={handleChangeSearch}
                        />
                    </div>
                    <Button
                        isActive={toggle.categoryList}
                        aria-label="Catégories"
                        aria-expanded={toggle.categoryList}
                        aria-controls="collapse-category-list"
                        onClick={() => setToggle("CATEGORY_LIST")}
                    >
                        <Icons.Category />
                    </Button>
                    <Collapsible
                        id="collapse-category-list"
                        isOpen={toggle.categoryList}
                        styles={{
                            wrapper: styles.collapsibleWrapper,
                            content: styles.collapsibleContent
                        }}
                        onFocusOut={() => setToggle("CATEGORY_LIST")}
                        onClickOut={() => setToggle("CATEGORY_LIST")}
                    >
                        <CategoryList close={() => setToggle("CATEGORY_LIST")} />
                    </Collapsible>
                </div>
                <div className={styles.topbarRight}>
                    <div className={styles.context}>
                        <Button
                            isActive={toggle.watchList}
                            aria-label="Vos films enregistrés"
                            aria-expanded={toggle.watchList}
                            aria-controls="collapse-watch-list"
                            onClick={() => setToggle("WATCH_LIST")}
                        >
                            <Icons.Reel />
                        </Button>
                        <Collapsible
                            id="collapse-watch-list"
                            isOpen={toggle.watchList}
                            styles={{
                                wrapper: styles.collapsibleWrapper,
                                content: styles.collapsibleContent
                            }}
                            onFocusOut={() => setToggle("WATCH_LIST")}
                            onClickOut={() => setToggle("WATCH_LIST")}
                            onEventOff={[{ name: "data-event-off", value: "collapse-watch-list" }]}
                        >
                            <WatchList close={() => setToggle("WATCH_LIST")} />
                        </Collapsible>
                    </div>
                </div>
            </div>
            <div className={styles.topmovie}>
                {topmovie && (<>
                    <div className={styles.topmovieUnderlay}>
                        {topmovie.backdrop_path ? (
                            <Image
                                className={styles.backdrop}
                                role="presentation"
                                src={`https://image.tmdb.org/t/p/original${topmovie.backdrop_path}`}
                                isLazy={true}
                                isAvailable={topmovie.backdrop_path}
                            />
                        ) : (
                            <Image
                                className={styles.poster}
                                role="presentation"
                                src={`https://image.tmdb.org/t/p/original${topmovie.poster_path}`}
                                isLazy={true}
                                isAvailable={topmovie.poster_path}
                            />
                        )}
                    </div>
                    <div className={styles.topmovieContent}>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                {topmovie.title}
                            </div>
                            {topmovie?.overview && (
                                <div className={styles.synopsis}>
                                    {topmovie.overview}
                                </div>
                            )}
                            {topmovieGenres.length ? (
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
                            ) : null}
                        </div>
                        <div className={styles.action}>
                            <Button size="small" onClick={() => navigate(`/movie/${topmovie?.id}`)}>
                                <span>Voir plus</span>
                            </Button>
                            <Button
                                size="small"
                                aria-label="Ajouter aux films enregistrés"
                                data-event-off="collapse-watch-list"
                                onClick={() => topmovie && watchListPush(topmovie)}
                            >
                                <Icons.AddToList />
                            </Button>
                        </div>
                    </div>
                </>)}
            </div>
        </header>
    );
}

/*

*/
