import type { ChangeEventHandler } from "react";
import type { ToggleAction, ToggleState } from "./types";
import { useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../../providers/AppProvider";
import { Icons, Button, Foldable, Image } from "../../components";
import { CategoryList, WatchList } from "./dropdown";
import { formatters } from "../../utils/formatters";
import styles from "./Header.module.css";
import clsx from "clsx";

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
    const { searchValue, setSearchValue, topmovie, watchListPush, error } = useApp();
    const [toggle, setToggle] = useReducer(toggleReducer, {
        categoryList: false,
        watchList: false
    });

    useEffect(() => {
        if (!searchValue) return;
    
        const timeout = setTimeout(() => {
            navigate("/search/" + searchValue);
        }, 300);
    
        return () => clearTimeout(timeout);
      }, [searchValue, navigate]);

    const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (!e.currentTarget.value) navigate("");
        setSearchValue(e.currentTarget.value);
    }

    const topmovieGenres = formatters.movieGenres(topmovie);

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
                        aria-controls="foldable-category-list"
                        onClick={() => setToggle("CATEGORY_LIST")}
                    >
                        <Icons.Category />
                    </Button>
                    <Foldable
                        id="foldable-category-list"
                        isOpen={toggle.categoryList}
                        styles={{
                            section: styles.foldable,
                            content: clsx(styles.foldableContent, "scroll")
                        }}
                        onFocusOut={() => setToggle("CATEGORY_LIST")}
                        onClickOut={() => setToggle("CATEGORY_LIST")}
                    >
                        <CategoryList close={() => setToggle("CATEGORY_LIST")} />
                    </Foldable>
                </div>
                <div className={styles.topbarRight}>
                    <div className={styles.context}>
                        <Button
                            isActive={toggle.watchList}
                            aria-label="Vos films enregistrés"
                            aria-expanded={toggle.watchList}
                            aria-controls="foldable-watch-list"
                            onClick={() => setToggle("WATCH_LIST")}
                        >
                            <Icons.Reel />
                        </Button>
                        <Foldable
                            id="foldable-watch-list"
                            isOpen={toggle.watchList}
                            styles={{
                                section: styles.foldable,
                                content: clsx(styles.foldableContent, "scroll")
                            }}
                            onFocusOut={() => setToggle("WATCH_LIST")}
                            onClickOut={() => setToggle("WATCH_LIST")}
                            onEventOff={[{ name: "data-event-off", value: "foldable-watch-list" }]}
                        >
                            <WatchList close={() => setToggle("WATCH_LIST")} />
                        </Foldable>
                    </div>
                </div>
            </div>
            <div className={styles.topmovie}>
                {topmovie && (
                    <>
                        <div className={styles.topmovieUnderlay}>
                            {topmovie.backdrop_path ? (
                                <Image
                                    styles={{
                                        box: styles.backdrop,
                                        img: styles.backdropContent
                                    }}
                                    role="presentation"
                                    isWaitable={true}
                                    isLoadable={topmovie.backdrop_path}
                                    src={`https://image.tmdb.org/t/p/original${topmovie.backdrop_path}`}
                                />
                            ) : (
                                <Image
                                    styles={{
                                        box: styles.poster,
                                        img: styles.posterContent
                                    }}
                                    role="presentation"
                                    isWaitable={true}
                                    isLoadable={topmovie.poster_path}
                                    src={`https://image.tmdb.org/t/p/original${topmovie.poster_path}`}
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
                                    data-event-off="foldable-watch-list"
                                    onClick={() => topmovie && watchListPush(topmovie)}
                                >
                                    <Icons.AddToList />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
                {error && (
                    <div className={styles.topmovieError}>
                        <div className={styles.title}>{error.title}</div>
                        <div className={styles.message}>{error.message}</div>
                    </div>
                )}
            </div>
        </header>
    );
}

/*

*/
