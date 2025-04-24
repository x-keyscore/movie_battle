import { Link } from "react-router";
import { useApp } from "../../../providers/AppProvider";
import { Button } from "../../Button";
import { Icons } from "../../Icons";
import styles from "./WatchList.module.css";

export function WatchList() {
    const { watchList, watchListRemove } = useApp();

    if (!watchList.length) return (
        <div className={styles.void}>La list est vide</div>
    );

    return (
        <ul className={styles.list}>
            {
                watchList.map((movie) => (
                    <li key={movie.id} className={styles.item}>
                        <Link
                            className={styles.itemLink}
                            to={`/movie/${movie.id}`}
                            aria-label="Aller au détail du film"
                        >
                            <img
                                className={styles.image}
                                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                                alt=""
                                draggable="false"
                            />
                            <div className={styles.info}>
                                <div className={styles.title}>{movie.title}</div>
                                <div className={styles.duration}>[duration]</div>
                            </div>
                            <Button
                                type="button"
                                size="mini"
                                variant="ghost"
                                aria-label="Supprimer ce film de la liste"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    watchListRemove(movie.id);
                                }}
                            >
                                <Icons.Cross />
                            </Button>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}