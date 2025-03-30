import { Card, CardBody, Button } from "reactstrap";
import { LessonType } from "@/Types/Lesson.type";
import QuizSection from "./QuizSection";
import AssignmentSection from "./AssignmentSection";

const LessonContent = ({
	lesson,
	view,
	openQuizModal,
	openAssignmentModal,
}: {
	lesson: LessonType | null;
	view: "video" | "quiz" | "assignment";
	openQuizModal: () => void;
	openAssignmentModal: () => void;
}) => {
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
					<>
						<div className="d-flex justify-content-between align-items-center">
							<h4>Quizzes</h4>
							<Button
								color="info"
								onClick={openQuizModal}>
								+ Add Quiz
							</Button>
						</div>
						<QuizSection
							quizzes={lesson.quizzes}
							lessonId={lesson._id}
						/>
					</>
				)}

				{view === "assignment" && (
					<>
						<div className="d-flex justify-content-between align-items-center">
							<h4>Assignments</h4>
							<Button
								color="warning"
								onClick={openAssignmentModal}>
								+ Add Assignment
							</Button>
						</div>
						<AssignmentSection
							assignments={lesson.assignments}
							lessonId={lesson._id}
						/>
					</>
				)}
			</CardBody>
		</Card>
	);
};

export default LessonContent;
