import { Link } from "react-router";
import styles from "./CategoryList.module.css";

interface GenreListProps {
    genres: { id: number; name: string; }[];
}

export function CategoryList({ genres }: GenreListProps) {
    return (
        <>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link  className={styles.itemLink} to="/category/popular">
                        Populaires
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link className={styles.itemLink} to="/category/recent">
                        Récents
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link className={styles.itemLink} to="/category/bestvote">
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