import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App";
import "./main.css";

// page components

import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import MovieDetailsPage from "./pages/MovieDetails";
import WatchlistPage from "./pages/Watchlist";

// router creation

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/search",
				element: <SearchPage />,
			},
			{
				path: "/movie",
				element: <MovieDetailsPage />,
			},
			{
				path: "/watchlist",
				element: <WatchlistPage />,
			},
		],
	},
]);

// rendering

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}
