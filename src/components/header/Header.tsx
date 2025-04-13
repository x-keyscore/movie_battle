import { Link } from "react-router";
import { Button } from "../button";
import { Icons } from "../icons";
import styles from "./Header.module.css";

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.backdrop}>
                <img
                    className={styles.backdropImage}
                    src="/mocks/backdrop.png"
                    alt=""
                />
            </div>
            <div className={styles.topbar}>
                <div className={styles.topbarLeft}>
                    <Link to="/" className={styles.logo} aria-label="Menu">
                        <Icons.Logo />
                    </Link>
                </div>
                <div className={styles.topbarCenter}>
                    <div className={styles.search}>
                        <Icons.Search />
                        <input type="text" placeholder="Recherche" />
                    </div>
                    <Button aria-label="Films par catégories">
                        <Icons.Category />
                    </Button>
                </div>
                <div className={styles.topbarRight}>
                    <Button aria-label="Vos films enregistrés">
                        <Icons.Reel />
                    </Button>
                </div>
            </div>
            <div className={styles.topmovie}>
                <div className={styles.topmovieContent}>
                    <div className={styles.title}>
                        Novocaine
                    </div>
                    <div className={styles.synopsis}>
                        Quand la femme de ses rêves est kidnappée, Nate, un homme ordinaire,
                        réussit à mettre à profit sa capacité à ne pas ressentir la douleur.
                        Une force imprévue qui l'aidera dans sa lutte pour la récupérer.
                    </div>
                    <div className={styles.genres}>

                    </div>
                </div>
                <div className={styles.topmovieAction}>
                    <Button aria-label="Voir plus">
                        <span>Voir plus</span>
                    </Button>
                    <Button aria-label="Ajouter aux films enregistrés">
                        <Icons.AddToList />
                    </Button>
                </div>
            </div>
        </div>
    );
}