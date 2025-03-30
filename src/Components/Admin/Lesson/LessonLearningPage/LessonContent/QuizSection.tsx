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
				className="my-3 bg-light-dark">
				<CardBody>
					<h6>{quiz.question}</h6>
					<ul>
						<div className="d-flex justify-content-between">
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
						</div>
					</ul>
					<div className="d-flex gap-2 mt-2 w-100">
						<Button
							size="sm"
							color="info"
							className="flex-fill"
							onClick={() => handleEdit(i)}>
							Edit
						</Button>
						<Button
							size="sm"
							className="flex-fill"
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
