"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row, Spinner, Alert } from "reactstrap";
import { QuizQuestion } from "@/Types/Lesson.type";
import { getLessonById } from "@/app/api/admin/students";
import { submitQuiz } from "@/app/api/student";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/navigation";
import SidebarToggleClient from "@/CommonComponent/SidebarToggleClient";
const QuestionNavigation = ({
	quizzes,
	currentIndex,
	setCurrentIndex,
	answers,
}: {
	quizzes: QuizQuestion[];
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
	answers: { question: string; selectedAnswer: string }[];
}) => {
	return (
		<div className='d-flex flex-column gap-2'>
			{quizzes.map((_, idx) => (
				<Button
					key={idx}
					color={idx === currentIndex ? "primary" : "success"}
					outline
					size='sm'
					style={{
						backgroundColor: answers[idx].selectedAnswer
							? "lightgreen"
							: "white",
					}}
					onClick={() => setCurrentIndex(idx)}>
					Q{idx + 1}
				</Button>
			))}
		</div>
	);
};

const QuizInteractive = ({
	quizzes,
	lessonId,
	courseId,
}: {
	quizzes: QuizQuestion[];
	lessonId: string;
	courseId: string;
}) => {
	const router = useRouter();
	const [started, setStarted] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [viewSubmit, setViewSubmit] = useState(false);
	const [exitPrompt, setExitPrompt] = useState(false);
	const [forceExit, setForceExit] = useState(false);
	const [answers, setAnswers] = useState(
		quizzes.map((q) => ({ question: q.question, selectedAnswer: "" }))
	);
	const enterFullscreen = async () => {
		if (document.documentElement.requestFullscreen) {
			await document.documentElement.requestFullscreen();
		}
	};

	const exitFullscreen = async () => {
		if (document.fullscreenElement && document.exitFullscreen) {
			await document.exitFullscreen();
		}
	};
	const handleOptionSelect = (option: string) => {
		const updated = [...answers];
		updated[currentIndex].selectedAnswer = option;
		setAnswers(updated);
	};

	const handleQuizSubmit = async () => {
		try {
			const formattedAnswers = answers.map((answer) => ({
				question: answer.question,
				selectedAnswer: answer.selectedAnswer,
			}));
			const data = { lessonId, answers: formattedAnswers };
			await submitQuiz(data);
			toast.success("Quiz submitted successfully");

			setForceExit(true);
			await exitFullscreen();
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Error submitting quiz");
		}
	};

	const currentQuiz = quizzes[currentIndex];
	useEffect(() => {
		const handleFullscreenChange = () => {
			if (started && !document.fullscreenElement && !forceExit) {
				setExitPrompt(true); // show modal
			}
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, [started, forceExit]);
	return (
		<Card
			className='rounded-0 w-100'
			style={{ minHeight: "600px" }}>
			<SidebarToggleClient />
			<CardBody>
				{!started && !viewSubmit && (
					<div className='text-center'>
						<h3>Quiz</h3>
						<p>Total Questions: {quizzes.length}</p>
						<Button
							color='primary'
							onClick={async () => {
								await enterFullscreen();
								setStarted(true);
							}}>
							Start Quiz
						</Button>
					</div>
				)}

				{started && !viewSubmit && (
					<Row>
						<Col
							md={3}
							className='border-end'>
							<QuestionNavigation
								quizzes={quizzes}
								currentIndex={currentIndex}
								setCurrentIndex={setCurrentIndex}
								answers={answers}
							/>
						</Col>
						<Col md={9}>
							<p>
								Question {currentIndex + 1} of {quizzes.length}
							</p>
							<h5 className='fw-bold mb-5'>{currentQuiz.question}</h5>
							<ul className='list-unstyled'>
								{currentQuiz.options.map((opt, i) => (
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
									color='info'
									disabled={currentIndex === 0}
									onClick={() => setCurrentIndex((prev) => prev - 1)}>
									Back
								</Button>
								{currentIndex < quizzes.length - 1 ? (
									<Button
										color='info'
										onClick={() => setCurrentIndex((prev) => prev + 1)}>
										Next
									</Button>
								) : (
									<Button
										color='success'
										onClick={() => setViewSubmit(true)}>
										Review & Submit
									</Button>
								)}
							</div>
						</Col>
					</Row>
				)}

				{viewSubmit && (
					<div style={{ maxHeight: "400px", overflowY: "auto" }}>
						<h4>Review Your Answers</h4>
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
						<div className='d-flex justify-content-between'>
							<Button
								color='info'
								onClick={() => setViewSubmit(false)}>
								Back to Quiz
							</Button>
							<Button
								color='success'
								onClick={handleQuizSubmit}>
								Confirm Submit
							</Button>
						</div>
					</div>
				)}
			</CardBody>
			<Modal
				isOpen={exitPrompt}
				centered>
				<ModalHeader>Exit Quiz?</ModalHeader>
				<ModalBody>
					Exiting fullscreen will end your quiz. Are you sure you want to leave?
				</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						onClick={() => {
							setForceExit(true);
							setExitPrompt(false);
							router.replace(
								`/student/learning/course/${courseId}/${lessonId}`
							);
						}}>
						Yes, Exit
					</Button>
					<Button
						color='outline-danger'
						onClick={async () => {
							setExitPrompt(false);
							await enterFullscreen();
						}}>
						Stay in Quiz
					</Button>
				</ModalFooter>
			</Modal>
		</Card>
	);
};

const LessonQuizContainer = ({
	lessonId,
	courseId,
}: {
	lessonId: string;
	courseId: string;
}) => {
	const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await getLessonById(lessonId, courseId);
				setQuizData(response?.quizzes || []);
			} catch (err) {
				setError("Failed to fetch quiz");
			} finally {
				setLoading(false);
			}
		})();
	}, [lessonId, courseId]);

	if (loading) return <Spinner className='m-3' />;
	if (error) return <Alert color='danger'>{error}</Alert>;

	return (
		<QuizInteractive
			quizzes={quizData}
			lessonId={lessonId}
			courseId={courseId}
		/>
	);
};

export default LessonQuizContainer;
