import { Link, Outlet } from "react-router";
import { Icons, Header } from "./components";
import { AppProvider } from "./providers/AppProvider";
import styles from "./App.module.css";

export function App() {
	return (
		<AppProvider>
			<Header />
			<div className={styles.body}>
				<Outlet />
			</div>
			<footer className={styles.footer}>
				<div className={styles.container}>
					<Link to="/" className={styles.brandlogo} aria-label="Menu">
						<Icons.Logo />
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
						<Icons.TmdbLogoSquare />
					</a>
				</div>
			</footer>
		</AppProvider>
	);
}
