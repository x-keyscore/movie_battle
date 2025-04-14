import styles from "./GenreList.module.css";

interface GenreListProps {
    genres: { id: number; name: string; }[];
}

export function GenreList({ genres }: GenreListProps) {

    return (
        <ul className={styles.list}>
        {
            genres.map((genre) => {
                return (
                   <li key={genre.id} className={styles.link}>{genre.name}</li>
                );
            })
        }
        </ul>
    );
}