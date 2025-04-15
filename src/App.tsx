import { Outlet } from "react-router";
import { Header } from "./components/Header";
import styles from "./App.module.css";

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
