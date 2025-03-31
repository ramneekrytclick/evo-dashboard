import { useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { QuizQuestion } from "@/Types/Lesson.type";
import EditQuizModal from "../Quiz/EditQuizModal";
import DeleteQuizModal from "../Quiz/DeleteQuizModal";
import { deleteQuiz, updateQuiz } from "@/app/api/admin/lessons/quiz";
import { toast } from "react-toastify";

const QuizSection = ({
	quizzes,
	lessonId,
}: {
	quizzes: QuizQuestion[];
	lessonId: string;
}) => {
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const handleEdit = (index: number) => {
		setEditIndex(index);
		setEditModalOpen(true);
	};

	const handleDelete = (index: number) => {
		setDeleteIndex(index);
		setDeleteModalOpen(true);
	};

	const handleEditSave = async (updatedQuiz: QuizQuestion, index: number) => {
		console.log("Save updated quiz:", updatedQuiz, "at index:", index);
		try {
			const response = await updateQuiz(lessonId, updatedQuiz);
			toast.success("Quiz updated successfully");
		} catch (error) {
			toast.error("Error updating quiz");
			console.error("Error updating quiz:", error);
		}
		// TODO: Call API to update quiz
	};

	const handleDeleteConfirm = async () => {
		console.log("Deleted quiz at index", deleteIndex);
		try {
			const response = await deleteQuiz(lessonId);
			toast.success("Quiz deleted successfully");
		} catch (error) {
			toast.error("Error deleting quiz");
			console.error("Error deleting quiz:", error);
		}
		// TODO: Call API to delete quiz
		setDeleteModalOpen(false);
	};

	return quizzes.length > 0 ? (
		<>
			{quizzes.map((quiz, i) => (
				<Card
					key={i}
					className="my-3 bg-light-info">
					<CardBody>
						<h6>{quiz.question}</h6>
						<ul>
							{quiz.options.map((opt, idx) => (
								<li
									key={idx}
									style={{
										color:
											opt.trim().toLowerCase() ===
											quiz.correctAnswer.trim().toLowerCase()
												? "red"
												: "inherit",
										fontWeight:
											opt.trim().toLowerCase() ===
											quiz.correctAnswer.trim().toLowerCase()
												? "bold"
												: "normal",
									}}>
									<input
										type="radio"
										checked={
											opt.trim().toLowerCase() ===
											quiz.correctAnswer.trim().toLowerCase()
										}
										name={`q-${i}`}
										disabled
									/>{" "}
									{opt}
								</li>
							))}
						</ul>
						<div className="d-flex gap-2 mt-2 w-100 justify-content-end">
							<Button
								size="sm"
								color="info"
								onClick={() => handleEdit(i)}>
								Edit
							</Button>
							<Button
								size="sm"
								color="danger"
								onClick={() => handleDelete(i)}>
								Delete
							</Button>
						</div>
					</CardBody>
				</Card>
			))}

			{/* Modals */}
			{editIndex !== null && (
				<EditQuizModal
					isOpen={editModalOpen}
					toggle={() => setEditModalOpen(false)}
					quiz={quizzes[editIndex]}
					index={editIndex}
					onSave={handleEditSave}
				/>
			)}

			{deleteIndex !== null && (
				<DeleteQuizModal
					isOpen={deleteModalOpen}
					toggle={() => setDeleteModalOpen(false)}
					onConfirm={handleDeleteConfirm}
					questionText={quizzes[deleteIndex].question}
				/>
			)}
		</>
	) : (
		<p className="text-muted">No quizzes available</p>
	);
};

export default QuizSection;
