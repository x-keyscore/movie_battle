import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Category } from "./pages/Category";
import "./main.css";

// page components

import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import MovieDetailsPage from "./pages/MovieDetails";

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
				path: "/movie/:movie_id",
				element: <MovieDetailsPage />,
			},
			{
				path: "/category",
				children: [
					{
						path: ":category",
						element: <Category />,
					},
					{
						path: ":category/:genre_id",
						element: <Category />,
					},
				],
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
