import { Link } from "react-router";
import { Icons } from "../../components";
import styles from "./Footer.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Link to="/" className={styles.brandlogo} aria-label="Menu">
                    <Icons.BrandLogo />
                </Link>
                <div className={styles.infos}>
                    <p className={styles.copyright}>© 2025 CinéScope.</p>
                    <a
                        className={styles.link}
                        href="https://github.com/x-keyscore/movie_battle"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Projet GitHub
                    </a>
                </div>
                <a
                    className={styles.tmdbLogo}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icons.TmdbLogo />
                </a>
            </div>
        </footer>
    );
}