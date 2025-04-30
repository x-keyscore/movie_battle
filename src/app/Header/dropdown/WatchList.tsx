import { Link } from "react-router";
import { Icons, Button, Image } from "../../../components";
import { useApp } from "../../../providers/AppProvider";
import { normalize } from "../../../utils/normalize";
import styles from "./WatchList.module.css";

interface WatchListProps {
    close: () => void;
}

export function WatchList({ close }: WatchListProps) {
    const { watchList, watchListRemove } = useApp();

    if (!watchList.length) return (
        <div className={styles.void}>La list est vide</div>
    );

    return (
        <ul className={styles.list}>
            {watchList.map((movie) => (
                <li key={movie.id} className={styles.item}>
                    <Link
                        className={styles.itemLink}
                        to={`/movie/${movie.id}`}
                        aria-label="Aller au détail du film"
                        onClick={() => close()}
                    >
                        <Image
                            className={styles.image}
                            alt=""
                            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                            isLazy={false}
                            isAvailable={true}
                        />
                        <div className={styles.info}>
                            <div className={styles.title}>{movie.title}</div>
                            <div className={styles.runtime}>{normalize.movieRuntime(movie.runtime)}</div>
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
            ))}
        </ul>
    );
}