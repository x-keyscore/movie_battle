import type { QuestionItem } from "../../types";
import { useState } from "react";
import styles from "./Question.module.css";
import clsx from "clsx";

interface QuestionProps {
	questionItem: QuestionItem;
}

export function Question({ questionItem }: QuestionProps) {
	const { title, imagePath, answers, correctAnswer } = questionItem;
	const [selectedAnswer, setSelectAnswer] = useState<string | null>(null);

	const handleSelected = (selected: string) => {
		if (!selected) return;

		setSelectAnswer(selected);
	};

	return (
		<div className={styles.questionContainer}>
			<p className={styles.questionTitle}>{title}</p>
			<div className={styles.flexContainer}>
				<div className={styles.imgContainer}>
					<div className={styles.box}>{imagePath}</div>
				</div>
				<ul className={styles.questionOptions}>
					{answers.map((answer) => {
						return (
							<li key={answer}>
								<button
									type="button"
									onClick={() => handleSelected(answer)}
									className={clsx(
										styles.questionButton,
										selectedAnswer === null
											? undefined
											: answer === correctAnswer
												? styles.correct
												: styles.incorrect,
									)}
								>
									<span className={styles.truncateText}>{answer}</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
