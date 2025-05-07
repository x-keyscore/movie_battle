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
	const [pageGroup, setPageGroup] = useState(1);
	return (
		<>
			<button onClick={() => setPage(0)}>
				Go to 1
			</button>
			<button onClick={() => setPage(1)}>
				Go to 2
			</button>
			<button onClick={() => setPage(2)}>
				Go to 3
			</button>
			<button onClick={() => setPage(3)}>
				Go to 4
			</button>
			<button onClick={() => setPageGroup(0)}>
				Go to 1 - group
			</button>
			<button onClick={() => setPageGroup(1)}>
				Go to 2 - group
			</button>
			<button onClick={() => setPageGroup(2)}>
				Go to 3 - group
			</button>
			<Slidable className={styles.slidable} duration={10000}>
				<Slide isOpen={page === 0} className={styles.slide}>
					<div style={{ backgroundColor: "blue"}}>
						1
					</div>
				</Slide>
				<Slide isOpen={page === 1} className={styles.slide}>
					<div style={{ backgroundColor: "yellow"}}>
						2
					</div>
				</Slide>
				<Slide isOpen={page === 2} className={styles.slide}>
					<div style={{ backgroundColor: "red"}}>
						3
					</div>
				</Slide>
				<Slide isOpen={page === 3} className={styles.slide} isGroup>
					<Slide isOpen={pageGroup === 0} className={styles.slide}>
						<div style={{ backgroundColor: "aqua"}}>
							1 - group
						</div>
					</Slide>
					<Slide isOpen={pageGroup === 1} className={styles.slide}>
						<div style={{ backgroundColor: "violet"}}>
							2 - group
						</div>
					</Slide>
					<Slide isOpen={pageGroup === 2} className={styles.slide}>
						<div style={{ backgroundColor: "sienna"}}>
							3 - group
						</div>
					</Slide>
				</Slide>
			</Slidable>
		</>
		
	)
}