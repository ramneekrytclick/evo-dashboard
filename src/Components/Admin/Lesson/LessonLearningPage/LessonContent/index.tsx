import { Card, CardBody, Button } from "reactstrap";
import { LessonType } from "@/Types/Lesson.type";
import QuizSection from "./QuizSection";
import AssignmentSection from "./AssignmentSection";
import { getQuizzesByLessonID } from "@/app/api/admin/lessons/quiz";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const LessonContent = ({
	lesson,
	view,
	openQuizModal,
	refresh,
	openAssignmentModal,
}: {
	lesson: LessonType | null;
	view: "video" | "quiz" | "assignment";
	openQuizModal: () => void;
	openAssignmentModal: () => void;
	refresh: () => void;
}) => {
	const [quiz, setQuiz] = useState<any[]>([]);
	const getEmbedUrl = (url: string) => {
		const youtubeMatch = url.match(
			/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
		);
		if (youtubeMatch && youtubeMatch[1]) {
			return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
		}
		return url; // fallback if it's not YouTube
	};
	const getQuiz = async () => {
		try {
			const response = await getQuizzesByLessonID(lesson?._id || "");
			setQuiz(response.quizzes);
		} catch (error) {
			toast.error("Error fetching quizzes");
		}
	};

	useEffect(() => {
		if (lesson?._id) {
			getQuiz();
		} else {
			toast("No lesson found");
		}
	}, [lesson]);
	if (!lesson) {
		return (
			<Card
				className='rounded-0'
				style={{ minHeight: "600px" }}>
				<CardBody className='text-center text-muted'>
					Select a lesson to begin
				</CardBody>
			</Card>
		);
	}

	return (
		<Card
			className='rounded-0'
			style={{ minHeight: "600px" }}>
			<CardBody>
				{view === "video" && (
					<>
						<h2>{lesson.title}</h2>
						<iframe
							width='100%'
							height='400'
							src={getEmbedUrl(lesson.videoUrl)}
							title={lesson.title}
							style={{ borderRadius: "10px" }}
							allowFullScreen></iframe>
						<h3 className='mt-3'>Content</h3>
						<p>{lesson.content}</p>
						<h3 className='mt-3'>Resources</h3>
						<p>{JSON.stringify(lesson.resources)}</p>
					</>
				)}

				{view === "quiz" && (
					<>
						<div className='d-flex justify-content-between align-items-center mb-3'>
							<h2>{lesson.title} : Quiz</h2>
							<Button
								color='info'
								onClick={openQuizModal}>
								Update Quiz
							</Button>
						</div>
						<div style={{ height: "550px", overflow: "scroll" }}>
							<QuizSection
								refresh={refresh}
								quizzes={quiz}
								lessonId={lesson._id}
							/>
						</div>
					</>
				)}

				{view === "assignment" && (
					<>
						<div className='d-flex justify-content-between align-items-center mb-3'>
							<h2>{lesson.title} : Assignments</h2>
							{lesson.assignments.length == 0 && (
								<Button
									color='warning'
									onClick={openAssignmentModal}>
									Add/Replace Assignment
								</Button>
							)}
						</div>
						<div style={{ height: "550px", overflow: "scroll" }}>
							<AssignmentSection
								assignments={lesson.assignments}
								lessonId={lesson._id}
								onSave={refresh}
							/>
						</div>
					</>
				)}
			</CardBody>
		</Card>
	);
};

export default LessonContent;
