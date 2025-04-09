import { Link, Outlet } from "react-router";

export function App() {
	return (
		<>
			<header>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/search">Search</Link>
					<Link to="/movie">movie</Link>
					<Link to="/watchlist">Watchlist</Link>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>footer</footer>
		</>
	);
}
