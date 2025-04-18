"use client";

import { LessonType } from "@/Types/Lesson.type";
import { useState } from "react";
import { Button, Card, CardBody } from "reactstrap";

const QuizInteractiveView = ({
	lesson,
	onSubmit,
}: {
	lesson: LessonType;
	onSubmit: (answers: { question: string; selectedAnswer: string }[]) => void;
}) => {
	const [started, setStarted] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [viewSubmit, setViewSubmit] = useState(false);

	const [answers, setAnswers] = useState<
		{ question: string; selectedAnswer: string }[]
	>(
		lesson.quizzes.map((q) => ({
			question: q.question,
			selectedAnswer: "",
		}))
	);

	const handleOptionSelect = (option: string) => {
		const updated = [...answers];
		updated[currentIndex] = {
			question: lesson.quizzes[currentIndex].question,
			selectedAnswer: option,
		};
		setAnswers(updated);
	};

	const currentQuiz = lesson.quizzes[currentIndex];

	const getColor = (index: number) =>
		answers[index].selectedAnswer ? "lightgreen" : "white";

	return (
		<Card
			className='rounded-0'
			style={{ minHeight: "600px" }}>
			<CardBody>
				{/* Intro Screen */}
				{!started && !viewSubmit && (
					<div className='text-center'>
						<h2>{lesson.title}</h2>
						<p>{lesson.content}</p>
						<Button
							color='primary'
							onClick={() => setStarted(true)}>
							Start Quiz
						</Button>
					</div>
				)}

				{/* Quiz In Progress */}
				{started && !viewSubmit && (
					<div>
						<h4>
							Question {currentIndex + 1} of {lesson.quizzes.length}
						</h4>
						<p className='fw-bold'>{currentQuiz?.question}</p>
						<ul className='list-unstyled'>
							{currentQuiz?.options.map((opt, i) => (
								<li key={i}>
									<label>
										<input
											type='radio'
											name={`option-${currentIndex}`}
											checked={answers[currentIndex]?.selectedAnswer === opt}
											onChange={() => handleOptionSelect(opt)}
										/>
										&nbsp;{opt}
									</label>
								</li>
							))}
						</ul>

						<div className='d-flex justify-content-between mt-4'>
							<Button
								disabled={currentIndex === 0}
								onClick={() => setCurrentIndex((prev) => prev - 1)}>
								Back
							</Button>
							{currentIndex < lesson.quizzes.length - 1 ? (
								<Button onClick={() => setCurrentIndex((prev) => prev + 1)}>
									Next
								</Button>
							) : (
								<Button
									color='success'
									onClick={() => setViewSubmit(true)}>
									Submit Quiz
								</Button>
							)}
						</div>

						<hr />
						<div className='d-flex gap-2 flex-wrap mt-3'>
							{lesson.quizzes.map((_, idx) => (
								<Button
									key={idx}
									style={{
										backgroundColor: getColor(idx),
										color: "black",
										border: "1px solid #ccc",
									}}
									onClick={() => setCurrentIndex(idx)}>
									{idx + 1}
								</Button>
							))}
						</div>
					</div>
				)}

				{/* Review and Submit */}
				{viewSubmit && (
					<div>
						<h2>Review Your Answers</h2>
						{answers.map((a, i) => (
							<div
								key={i}
								className='mb-3'>
								<p>
									<strong>
										{i + 1}. {a.question}
									</strong>
								</p>
								<p>
									Your Answer:{" "}
									{a.selectedAnswer || (
										<em className='text-muted'>Not Answered</em>
									)}
								</p>
							</div>
						))}
						<Button
							color='success'
							onClick={() => onSubmit(answers)}>
							Confirm Submit
						</Button>
					</div>
				)}
			</CardBody>
		</Card>
	);
};

export default QuizInteractiveView;
