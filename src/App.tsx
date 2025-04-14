import { Outlet } from "react-router";
import { Header } from "./components/Header";
import styles from "./App.module.css"

export function App() {
	return (
		<>
			<Header />
			<div className={styles.body}>
				<Outlet />
			</div>
			<footer>footer</footer>
		</>
	);
}

/*
<header>
	<nav>
		<Link to="/">Home</Link>
		<Link to="/search">Search</Link>
		<Link to="/movie">movie</Link>
		<Link to="/watchlist">Watchlist</Link>
	</nav>
</header>
*/
