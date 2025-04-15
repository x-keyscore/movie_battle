import { Icons } from "../Icons";
import styles from "./ActorCard.module.css";

interface ActorCardProps {
	id: number;
	name: string;
	character: string;
	profile_path: string | null;
}

export const ActorCard = ({
	id,
	name,
	character,
	profile_path,
}: ActorCardProps) => {
	return (
		<>
			<div className={styles.card}>
				<figure className={styles.cardFigure}>
					<div className={styles.imgContainer}>
						{profile_path ? (
							<img
								src={`https://image.tmdb.org/t/p/w185${profile_path}`}
								alt={name}
								className={styles.actorPicture}
							/>
						) : (
							<Icons.Avatar className={styles.icon} />
						)}
					</div>
					<figcaption className={styles.cardInfosContainer}>
						<p className={styles.characterName}>{character} joué par</p>
						<p>{name}</p>
					</figcaption>
				</figure>
			</div>
		</>
	);
};
