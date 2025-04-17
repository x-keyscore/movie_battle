import { useParams } from "react-router"

export function Category() {
    const { category, genre_id } = useParams();
    console.log(category, genre_id);
    return (<></>)
}