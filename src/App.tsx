import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { HeaderProvider } from "./providers/HeaderProvider";
import styles from "./App.module.css";

export function App() {
	return (
		<HeaderProvider>
			<Header />
			<div className={styles.body}>
				<Outlet />
			</div>
			<footer>footer</footer>
		</HeaderProvider>
	);
}
