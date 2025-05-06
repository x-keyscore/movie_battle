import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { AppProvider } from "../providers/AppProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from "./App.module.css";
import { Slidable, Slide } from "../components";

function pathMatch(candidate: string, exactPaths: string[], startPaths: string[]) {
	return (exactPaths.includes(candidate) || startPaths.some((path) => candidate.startsWith(path)));
}
/*
export function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		if (pathMatch(pathname, ["/"], ["/category", "/movie", "/search"])) {
			const rootElement = document.getElementById("root")!;
			rootElement.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth"
			});
		}
	}, [pathname]);

	return (
		<AppProvider>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</AppProvider>
	);
}*/


export function App() {
	const [page, setPage] = useState(0);

	return (
		<>
			<button onClick={() => setPage(prev => prev + 1)}>
				change page
			</button>
			<Slidable className={styles.slidable} duration={5000}>
				<Slide isOpen={page === 0} isFirst className={styles.slide} >
					<div style={{ backgroundColor: "blue"}}>
						0
					</div>
				</Slide>
				<Slide isOpen={page === 1} className={styles.slide}  >
					<div style={{ backgroundColor: "yellow"}}>
						1
					</div>
				</Slide>
				<Slide isOpen={page === 2} className={styles.slide}  >
					<div style={{ backgroundColor: "red"}}>
						3
					</div>
				</Slide>
			</Slidable>
		</>
		
	)
}