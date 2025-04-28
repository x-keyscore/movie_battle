import { useParams } from "react-router";
import { useApp } from "../../providers/AppProvider";

export function CategoryPage() {
	const { category, genre_id } = useParams();
	const { setTopmovie } = useApp();
	console.log(category, genre_id);

	return <></>;
}
