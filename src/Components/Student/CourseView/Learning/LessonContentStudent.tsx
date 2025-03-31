"use client";
import { Card, CardBody } from "reactstrap";
import { LessonType } from "@/Types/Lesson.type";
import QuizInteractiveView from "./Quiz";
import { submitQuiz } from "@/app/api/student";
import { toast } from "react-toastify";

const LessonContent = ({
	lesson,
	view,
}: {
	lesson: LessonType;
	view: "video" | "quiz" | "assignment";
}) => {
	const handleQuizSubmit = async (answers: string[]) => {
		console.log("Student answers:", answers);
		// TODO: Call backend API to save quiz submission
		try {
			const formattedAnswers = answers.map((answer, index) => ({
				question: `Question ${index + 1}`,
				selectedAnswer: answer,
			}));
			const data = { lessonId: lesson._id, answers: formattedAnswers };
			const response = await submitQuiz(data);
			toast.success("Quiz submitted successfully");
		} catch (error: any) {
			toast.error(error.response.data.message || "Error submitting quiz");
			console.log(error.response.data.message);
		}
	};

	if (!lesson) {
		return (
			<Card
				className="rounded-0"
				style={{ minHeight: "600px" }}>
				<CardBody className="text-center text-muted">
					Select a lesson to begin
				</CardBody>
			</Card>
		);
	}

	return (
		<Card
			className="rounded-0"
			style={{ minHeight: "600px" }}>
			<CardBody>
				{view === "video" && (
					<>
						<h2>{lesson.title}</h2>
						<iframe
							width="100%"
							height="400"
							src={lesson.videoUrl.replace("watch?v=", "embed/")}
							title={lesson.title}
							style={{ borderRadius: "10px" }}
							allowFullScreen></iframe>
						<h3 className="mt-3">Content</h3>
						<p>{lesson.content}</p>
					</>
				)}
				{view === "quiz" && (
					<QuizInteractiveView
						lesson={lesson}
						onSubmit={handleQuizSubmit}
					/>
				)}
				{view === "assignment" && (
					<>
						<h2>{lesson.title} : Assignments</h2>
						<div style={{ height: "550px", overflow: "scroll" }}>
							{lesson.assignments.map((ass, i) => (
								<Card
									key={i}
									className="my-3 bg-light-warning">
									<CardBody>
										<b>{ass.title}</b>
										<p>{ass.description}</p>
										{ass.attachmentUrl && (
											<a
												href={`/uploads/${ass.attachmentUrl}`}
												target="_blank"
												rel="noopener noreferrer">
												View Attachment
											</a>
										)}
									</CardBody>
								</Card>
							))}
						</div>
					</>
				)}
			</CardBody>
		</Card>
	);
};

export default LessonContent;
