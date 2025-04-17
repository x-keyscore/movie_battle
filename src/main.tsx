import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Category } from "./pages/Category";
import { App } from "./App";
import "./main.css";

import { HomePage, homeLoader } from "./pages/Home";
import SearchPage from "./pages/Search";
import MovieDetailsPage from "./pages/MovieDetails";
import { CategoryPage } from "./pages/Category/Category";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				loader: homeLoader,
				Component: HomePage
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
				path: "/category",
				children: [
					{
						path: "/:category",
						Component: CategoryPage,
					},
					{
						path: "/:category/:genre_id",
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
	</StrictMode>,
);