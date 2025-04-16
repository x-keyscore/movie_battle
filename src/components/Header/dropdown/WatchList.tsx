import { Link } from "react-router";
import { Button } from "../../Button";
import { Icons } from "../../Icons";
import styles from "./WatchList.module.css";

export function WatchList() {
    return (
        <ul className={styles.list}>
            <li className={styles.item}>
                <Link className={styles.itemLink} to="#">
                    <img
                        className={styles.image}
                        src="/mocks/poster.png"
                        alt=""
                        draggable="false"
                    />
                    <div className={styles.info}>
                        <div className={styles.title}>Novacaine</div>
                        <div className={styles.duration}>1h40</div>
                    </div>
                    <Button
                        size="mini"
                        variant="ghost"
                        aria-label="Supprimer des films enregistrés"
                    >
                        <Icons.Cross />
                    </Button>
                </Link>
            </li>
            <li className={styles.item}>
                
            </li>
            <li className={styles.item}>
                
            </li>
        </ul>
    );
}