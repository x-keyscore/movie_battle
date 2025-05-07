import { useEffect, useRef, useState } from "react";
import { Question } from "./Question";
import type { dataMovieDetails, questionType } from "../types";
import styles from "./Game.module.css";
import { fetchUtils } from "../utils/fetchUtils";
import { useRequest } from "../../../hooks/useRequest";
import { requests } from "../../../api";
import { questionUtils } from "../utils/questionUtils";

interface GameProps {
	data: dataMovieDetails;
}

export function Game({ data }: GameProps) {
	const { movie, credits, movieImages } = data;
	// const [questions, setQuestions] = useState<questionType[]>([]);

	const [questionData] = useRequest(
		{
			initial: null,
			subscribes: [data],
		},
		async () => {
			if (!data) return;

			const [movieWithCompany, movieWithoutCompany] = await Promise.all([
				requests.movie.getDiscoverMovie({
					language: "fr-Fr",
					"primary_release_date.gte": fetchUtils.modifyYears(
						movie.release_date,
						-2,
					),
					"primary_release_date.lte": fetchUtils.modifyYears(
						movie.release_date,
						2,
					),
					with_companies: movie.production_companies[0].id.toString(),
				}),
				requests.movie.getDiscoverMovie({
					language: "fr-Fr",
					"primary_release_date.gte": fetchUtils.modifyYears(
						movie.release_date,
						-2,
					),
					"primary_release_date.lte": fetchUtils.modifyYears(
						movie.release_date,
						2,
					),
					without_companies: movie.production_companies[0].id.toString(),
					with_genres: fetchUtils.idsToString(movie.genres),
					with_original_language: movie.original_language,
				}),
			]);

			const questionCompany = questionUtils.createQuestion({
				query: "Parmi ces films, lequel a aussi été produit par",
				correctAnswers: questionUtils.pickRandomMovies(
					movieWithCompany.data,
					movie.id,
					1,
				),
				wrongAnswers: questionUtils.pickRandomMovies(
					movieWithoutCompany.data,
					movie.id,
					3,
				),
				imagePath: "je suis un path d'image",
				subject: movie.production_companies[0].name,
			});

			console.log(questionCompany);

			return [questionCompany];
		},
	);

	//TEMP
	// const didRun = useRef(false);
	// useEffect(() => {
	// 	if (didRun.current) return;
	// 	didRun.current = true;
	// 	const tempQuestion = {
	// 		imagePath: "CHEMIN IMAGE",
	// 		query: "Qu'elle est la bonne réponse a cette question?",
	// 		answers: questionUtils.shuffleAnswers(["1", "2", "3", "4"]),
	// 		correctAnswer: "2",
	// 	};
	// 	setQuestions((prev) => [...prev, tempQuestion]);
	// }, []);

	return (
		<div className={styles.quizzSection}>
			<div className={styles.quizzContainer}>
				<h3 className={styles.questionNumber}>QUESTION 3/4</h3>
				{questionData?.map((question, index) => {
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index} style={{ width: "100%" }}>
							<Question quizzQuestion={question} />
						</div>
					);
				})}
				{/* <ul className={styles.questionButtonList}>
                <li>
                    <button
                        type="button"
                        className={`${styles.questionButton} ${styles.correct}`}
                    >
                        1
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={`${styles.questionButton} ${styles.correct}`}
                    >
                        2
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={`${styles.questionButton} ${styles.incorrect}`}
                    >
                        3
                    </button>
                </li>
                <li>
                    <button type="button" className={`${styles.questionButton}`}>
                        4
                    </button>
                </li>
            </ul> */}
			</div>
		</div>
	);
}
