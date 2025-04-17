import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./main.css";

import { HomePage } from "./pages/Home";
import { CategoryPage } from "./pages/Category";

import SearchPage from "./pages/Search";
import MovieDetailsPage from "./pages/MovieDetails";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				Component: HomePage
			},
			{
				path: "/search",
				Component: SearchPage,
			},
			{
				path: "/movie",
				Component: MovieDetailsPage,
			},
			{
				path: "/category",
				children: [
					{
						path: ":category",
						Component: CategoryPage,
					},
					{
						path: ":category/:genre_id",
						Component: CategoryPage,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);