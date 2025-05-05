import styles from "./QuizzQuestion.module.css";

export function QuizzQuestion() {
	return (
		<div className={styles.questionContainer}>
			<p className={styles.questionTitle}>
				En qu'elle année le film est il sorti ?
			</p>
			<div className={styles.flexContainer}>
				<div className={styles.imgContainer}>
					<div className={styles.box}>IMAGE</div>
				</div>
				<ul className={styles.questionOptions}>
					<li>
						<button
							type="button"
							className={`${styles.questionButton} ${styles.correct}`}
						>
							2004
						</button>
					</li>
					<li>
						<button type="button" className={`${styles.questionButton} `}>
							2005
						</button>
					</li>
					<li>
						<button type="button" className={`${styles.questionButton} `}>
							2006
						</button>
					</li>
					<li>
						<button
							type="button"
							className={`${styles.questionButton} ${styles.incorrect}`}
						>
							2007
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
