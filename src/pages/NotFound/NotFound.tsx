import { useEffect } from "react";
import { useApp } from "../../providers/AppProvider";

export function NotFoundPage() {
	const { setError, setTopmovie } = useApp();

	useEffect(() => {
		setTopmovie(null);
		setError({
			title: "404",
			message: "Page introuvable"
		});
	}, []);

	return (null);
}
