import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { AppProvider } from "../providers/AppProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from "./App.module.css";

function pathMatch(candidate: string, exactPaths: string[], startPaths: string[]) {
	return (exactPaths.includes(candidate) || startPaths.some((path) => candidate.startsWith(path)));
}

export function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		if (pathMatch(pathname, ["/"], ["/category", "/movie", "/search"])) {
			const rootElement = document.getElementById("root")!;
			rootElement.scrollTo({
				top: 0,
				left: 0,
				behavior: "auto"
			});
		}
	}, [pathname]);

	return (
		<AppProvider>
			<Header />
			<main className={styles.body}>
				<Outlet />
			</main>
			<Footer />
		</AppProvider>
	);
}
