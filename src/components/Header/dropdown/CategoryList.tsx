import { Link } from "react-router";
import genres from "../../../data/genres.json";
import styles from "./CategoryList.module.css";

export function CategoryList() {
    return (
        <>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link
                        className={styles.itemLink}
                        to="/category/popular"
                        draggable="false"
                    >
                        Populaires
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link
                        className={styles.itemLink}
                        to="/category/now-playing"
                        draggable="false"
                    >
                        Récents
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link
                        className={styles.itemLink}
                        to="/category/top-rated"
                        draggable="false"
                    >
                        Meilleur notes
                    </Link>
                </li>
            </ul>
            <div className={styles.spacer} />
            <ul className={styles.list}>
                {
                    genres.map((genre) => {
                        return (
                            <li key={genre.id} className={styles.item}>
                                <Link 
                                    className={styles.itemLink}
                                    to={`/category/genre/${genre.id}`}
                                    draggable="false"
                                >
                                    {genre.name}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
}