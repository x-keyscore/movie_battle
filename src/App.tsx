import { Link, Outlet, useLocation } from "react-router";
import { Icons, Header } from "./components";
import { AppProvider } from "./providers/AppProvider";
import styles from "./App.module.css";
import { useEffect } from "react";

export function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		const rootElem = document.getElementById("root");
		const exactPath = ["/"];
		const startsWithPath = ["/category", "/movie"];

		if (!rootElem) return;

		if (
			exactPath.includes(pathname) ||
			startsWithPath.some((path) => pathname.startsWith(path))
		) {
			rootElem.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		}
	}, [pathname]);

	return (
		<AppProvider>
			<Header />
			<div className={styles.body}>
				<Outlet />
			</div>
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
		</AppProvider>
	);
}
