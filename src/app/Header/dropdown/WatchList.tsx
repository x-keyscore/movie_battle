import { Link } from "react-router";
import { Icons, Button, Image } from "../../../components";
import { useApp } from "../../../providers/AppProvider";
import { formatters } from "../../../utils/formatters";
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
                        draggable="false"
                        aria-label="Aller au détail du film"
                        onClick={() => close()}
                    >
                        {movie.poster_path && <Image
                            styles={{
                                surface: styles.image,
                                content: styles.imageContent
                            }}
                            role="presentation"
                            isWaitable={false}
                            isLoadable={true}
                            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                        />}
                        <div className={styles.info}>
                            <div className={styles.title}>{movie.title}</div>
                            <div className={styles.runtime}>{formatters.movieRuntime(movie.runtime)}</div>
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