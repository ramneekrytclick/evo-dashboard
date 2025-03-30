import { Button, Card, CardBody } from "reactstrap";
import { QuizQuestion } from "@/Types/Lesson.type";

const QuizSection = ({
	quizzes,
	lessonId,
}: {
	quizzes: QuizQuestion[];
	lessonId: string;
}) => {
	const handleDelete = (index: number) => {
		console.log("Delete quiz", index);
	};

	const handleEdit = (index: number) => {
		console.log("Edit quiz", index);
	};

	return quizzes.length > 0 ? (
		quizzes.map((quiz, i) => (
			<Card
				key={i}
				className="mb-3">
				<CardBody>
					<h6>{quiz.question}</h6>
					<ul>
						{quiz.options.map((opt, idx) => (
							<li key={idx}>
								<input
									type="radio"
									name={`q-${i}`}
									disabled
								/>{" "}
								{opt}
							</li>
						))}
					</ul>
					<div className="d-flex gap-2 mt-2">
						<Button
							size="sm"
							color="primary"
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
		))
	) : (
		<p className="text-muted">No quizzes available</p>
	);
};

export default QuizSection;
