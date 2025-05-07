import { useState } from "react";
import styles from "./Question.module.css";
import clsx from "clsx";
import type { questionType } from "../types";

interface MovieQuestionProps {
	quizzQuestion: questionType;
}

export function Question({ quizzQuestion }: MovieQuestionProps) {
	const { imagePath, query, answers, correctAnswer } = quizzQuestion;
	const [selectedAnswer, setSelectAnswer] = useState<string | null>(null);

	const handleSelected = (selected: string) => {
		if (!selected) return;

		setSelectAnswer(selected);
	};

	return (
		<div className={styles.questionContainer}>
			<p className={styles.questionTitle}>{query}</p>
			<div className={styles.flexContainer}>
				<div className={styles.imgContainer}>
					<div className={styles.box}>{imagePath}</div>
				</div>
				<ul className={styles.questionOptions}>
					{answers.map((answer, index) => {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<li key={index}>
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
									{answer}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
