import { useParams } from "react-router"

export function CategoryPage() {
    const { category, genre_id } = useParams();
    console.log(category, genre_id);

    return (<></>);
}


