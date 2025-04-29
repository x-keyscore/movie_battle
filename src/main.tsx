import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./pages/Home";
import { SearchPage } from "./pages/Search";
import { CategoryPage } from "./pages/Category";
import { MovieDetailsPage } from "./pages/MovieDetails";
import { App } from "./app/App";
import "./main.css";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				Component: HomePage
			},
			{
				path: "/movie/:movie_id",
				Component: MovieDetailsPage
			},
			{
				path: "/search/:movieTitle",
				Component: SearchPage
			},
			{
				path: "/category",
				children: [
					{
						path: ":category",
						Component: CategoryPage
					},
					{
						path: ":category/:genre_id",
						Component: CategoryPage
					}
				]
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
