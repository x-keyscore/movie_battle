import { requests } from "../../../api";
import { useRequest } from "../../../hooks/useRequest";
import { fetchUtils } from "./utils/fetch";
import { questionUtils } from "./utils/question";
import { Question } from "./Question";
import type { MovieDetailsData } from "../types";
import styles from "./Quizz.module.css";

interface QuizzProps {
	data: MovieDetailsData;
}

export function Quizz({ data }: QuizzProps) {
	const { movie } = data;

	const [questionData] = useRequest(
		{ initial: null, subscribes: [data] },
		async () => {
			if (!data) return;

			const [
				movieWithCompany,
				movieWithoutCompany,
				movieBeforeDate,
				movieAfterDate,
			] = await Promise.all([
				// Whit Company
				requests.movie.getDiscoverMovie({
					language: "fr-Fr",
					"primary_release_date.gte": fetchUtils.modifyDate(
						movie.release_date,
						{ years: -2 },
					),
					"primary_release_date.lte": fetchUtils.modifyDate(
						movie.release_date,
						{ years: 2 },
					),
					with_companies: movie.production_companies[0].id.toString(),
				}),
				// Whithout Company
				requests.movie.getDiscoverMovie({
					language: "fr-Fr",
					"vote_count.gte": 5,
					"primary_release_date.gte": fetchUtils.modifyDate(
						movie.release_date,
						{ years: -2 },
					),
					"primary_release_date.lte": fetchUtils.modifyDate(
						movie.release_date,
						{ years: 2 },
					),
					without_companies: movie.production_companies[0].id.toString(),
					with_genres: fetchUtils.idsToString(movie.genres),
					with_original_language: movie.original_language,
				}),
				// Before Date
				requests.movie.getDiscoverMovie({
					language: "fr-Fr",
					"vote_count.gte": 5,
					"primary_release_date.gte": fetchUtils.modifyDate(
						movie.release_date,
						{ years: -1 },
					),
					"primary_release_date.lte": fetchUtils.modifyDate(
						movie.release_date,
						{ days: -1 },
					),
					with_genres: fetchUtils.idsToString(movie.genres),
					with_original_language: movie.original_language,
				}),
				// After Date
				requests.movie.getDiscoverMovie({
					language: "fr-Fr",
					"vote_count.gte": 5,
					"primary_release_date.gte": fetchUtils.modifyDate(
						movie.release_date,
						{ days: 1 },
					),
					with_genres: fetchUtils.idsToString(movie.genres),
					with_original_language: movie.original_language,
				}),
			]);

			const questionCompany = questionUtils.createQuestionMovie({
				title: "Parmi ces films, lequel a aussi été produit par",
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

			const questionReleasedAfter = questionUtils.createQuestionMovie({
				title: "Parmi ces films, lequel a été sorti apres",
				correctAnswers: questionUtils.pickRandomMovies(
					movieAfterDate.data,
					movie.id,
					1,
				),
				wrongAnswers: questionUtils.pickRandomMovies(
					movieBeforeDate.data,
					movie.id,
					3,
				),
				imagePath: "je suis un path d'image",
				subject: movie.title,
			});

			const correctROI = questionUtils.returnOnInvestment(
				movie.budget,
				movie.revenue,
			);
			const questionReturnOnInvestment = correctROI
				? questionUtils.createQuestion({
					title: "Par rapport à ce qu’il a coûté, combien a rapporté le film",
						correctAnswer: `${correctROI}%`,
						wrongAnswers: questionUtils
							.generateWrongPercentages(correctROI)
							.map((wrongAnswer) => `${wrongAnswer}%`),
						imagePath: "je suis un path d'image",
						subject: movie.title,
					})
				: null;
			console.log(questionReturnOnInvestment);

			return [
				questionCompany,
				questionReleasedAfter,
				questionReturnOnInvestment,
			];
		},
	);

	return (
		<div className={styles.quizzSection}>
			<div className={styles.quizzContainer}>
				<h3 className={styles.questionNumber}>QUESTION {`1/${questionData?.length}`}</h3>
				{questionData
					? questionData?.map((question) =>
							question ? (
								<div key={question.title} style={{ width: "100%" }}>
									<Question questionItem={question} />
								</div>
							) : null,
						)
					: "Pas de question disponible"}
			</div>
		</div>
	);
}
