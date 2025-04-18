"use client";

import { useEffect, useState } from "react";
import { getQuizzesByLessonID, updateQuiz } from "@/app/api/admin/lessons/quiz";
import { QuizQuestion } from "@/Types/Lesson.type";
import {
	Spinner,
	Alert,
	Card,
	CardBody,
	CardTitle,
	Button,
	Row,
	Col,
} from "reactstrap";
import { Edit3, Plus, RefreshCcw, RefreshCw, Trash2 } from "react-feather";
import BaseQuizModal from "./BaseQuizModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LessonQuizContainer = ({
	lessonId,
	courseId,
}: {
	lessonId: string;
	courseId: string;
}) => {
	const router = useRouter();
	const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [overwriteMode, setOverwriteMode] = useState(false); // ✅ New state

	const fetchQuiz = async () => {
		try {
			const response = await getQuizzesByLessonID(lessonId);
			setQuizData(response?.quizzes || []);
		} catch (error) {
			setError("Failed to fetch quiz");
		} finally {
			setLoading(false);
		}
	};

	const handleSave = async (updatedQuizList: QuizQuestion[]) => {
		try {
			for (let i = 0; i < updatedQuizList.length; i++) {
				await updateQuiz({ ...updatedQuizList[i], lessonId, quizIndex: i });
			}
			toast.success("Quiz updated successfully");
			await fetchQuiz();
		} catch (err) {
			console.error(err);
			toast.error("Failed to update quiz");
		}
	};

	useEffect(() => {
		fetchQuiz();
	}, []);

	if (loading) return <Spinner className='m-3' />;
	if (error) return <Alert color='danger'>{error}</Alert>;

	return (
		<>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<Button
					color='info'
					outline
					size='sm'
					onClick={() =>
						router.replace(`/admin/course/${courseId}/${lessonId}`)
					}
					className='d-flex align-items-center gap-1'>
					<i className='fa fa-arrow-left' /> Back
				</Button>

				<h5 className='fw-bold mb-0'>Quiz Section</h5>

				<div className='d-flex gap-2'>
					{quizData.length > 0 && (
						<Button
							color='danger'
							outline
							size='sm'
							onClick={() => {
								setOverwriteMode(true);
								setShowModal(true);
							}}
							className='d-flex align-items-center gap-1'>
							<RefreshCcw size={16} />
							Overwrite All
						</Button>
					)}
					<Button
						color={quizData.length > 0 ? "info" : "success"}
						size='sm'
						className='d-flex align-items-center gap-1'
						onClick={() => {
							setOverwriteMode(false); // Edit mode
							setShowModal(true);
						}}>
						<Plus size={16} />
						{quizData.length > 0 ? "Edit Quiz" : "Add Quiz"}
					</Button>
				</div>
			</div>

			{quizData.length === 0 ? (
				<p className='text-muted'>
					No quizzes found. Adding a quiz will overwrite older data.
				</p>
			) : (
				<Row className='gy-3'>
					{quizData.map((quiz, index) => (
						<Col
							sm={12}
							md={6}
							key={index}>
							<Card className='shadow-sm bg-light text-dark'>
								<CardBody>
									<CardTitle tag='h6'>
										Q{index + 1}: <strong>{quiz.question}</strong>
									</CardTitle>
									<ul className='ps-3 mb-3'>
										{quiz.options.map((opt, idx) => (
											<li
												key={idx}
												className={
													opt === quiz.correctAnswer
														? "text-success fw-bold"
														: "text-muted"
												}>
												{opt}
											</li>
										))}
									</ul>
									<Button
										color='info'
										size='sm'
										onClick={() => {
											setOverwriteMode(false);
											setShowModal(true);
										}}>
										<Edit3
											size={14}
											className='me-1'
										/>
										Edit
									</Button>
								</CardBody>
							</Card>
						</Col>
					))}
				</Row>
			)}

			<BaseQuizModal
				isOpen={showModal}
				toggle={() => setShowModal(false)}
				onSave={handleSave}
				initialData={overwriteMode ? [] : quizData}
				isEdit={!overwriteMode}
			/>
		</>
	);
};

export default LessonQuizContainer;
