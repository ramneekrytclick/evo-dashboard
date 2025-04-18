"use client";
import { useState } from "react";
import {
	Card,
	CardBody,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { LessonType } from "@/Types/Lesson.type";
import QuizInteractiveView from "./Quiz";
import { submitQuiz, submitAssignment } from "@/app/api/student";
import { toast } from "react-toastify";

const LessonContent = ({
	lesson,
	view,
}: {
	lesson: LessonType;
	view: "video" | "quiz" | "assignment";
}) => {
	const [assignmentModal, setAssignmentModal] = useState(false);
	const [selectedAssignment, setSelectedAssignment] = useState<any | null>(
		null
	);
	const [file, setFile] = useState<File | null>(null);

	const handleQuizSubmit = async (
		answers: { question: string; selectedAnswer: string }[]
	) => {
		try {
			const formattedAnswers = answers.map((answer, index) => ({
				question: answer.question,
				selectedAnswer: answer.selectedAnswer,
			}));
			const data = { lessonId: lesson._id, answers: formattedAnswers };
			await submitQuiz(data);
			toast.success("Quiz submitted successfully");
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Error submitting quiz");
		}
	};

	const handleAssignmentSubmit = async () => {
		if (!file || !selectedAssignment)
			return toast.error("Please upload a file.");
		try {
			await submitAssignment({
				lessonId: lesson._id,
				description: selectedAssignment.description,
				file,
			});
			toast.success("Assignment submitted successfully");
			setAssignmentModal(false);
			setFile(null);
		} catch (error: any) {
			toast.error(
				error.response?.data?.message || "Error submitting assignment"
			);
		}
	};
	const getEmbedUrl = (url: string) => {
		const youtubeMatch = url.match(
			/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
		);
		if (youtubeMatch && youtubeMatch[1]) {
			return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
		}
		return url; // fallback if it's not YouTube
	};
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
							height='600'
							src={getEmbedUrl(lesson.videoUrl)}
							title={lesson.title}
							style={{ borderRadius: "10px" }}
							allowFullScreen></iframe>
						<h3 className='mt-3'>Content</h3>
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
									className='my-3 bg-light-warning'>
									<CardBody>
										<b>{ass.title}</b>
										<p>{ass.description}</p>
										{ass.attachmentUrl && (
											<a
												href={`/uploads/${ass.attachmentUrl}`}
												target='_blank'
												rel='noopener noreferrer'>
												View Attachment
											</a>
										)}
										<Button
											color='primary'
											className='mt-2'
											onClick={() => {
												setSelectedAssignment(ass);
												setAssignmentModal(true);
											}}>
											Upload & Submit Assignment
										</Button>
									</CardBody>
								</Card>
							))}
						</div>
					</>
				)}

				{/* Assignment Upload Modal */}
				<Modal
					isOpen={assignmentModal}
					toggle={() => setAssignmentModal(false)}>
					<ModalHeader toggle={() => setAssignmentModal(false)}>
						Submit Assignment
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for='file'>Upload PDF</Label>
								<Input
									type='file'
									accept='application/pdf'
									onChange={(e) => setFile(e.target.files?.[0] || null)}
								/>
							</FormGroup>
							<Button
								color='success'
								onClick={handleAssignmentSubmit}>
								Submit Assignment
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</CardBody>
		</Card>
	);
};

export default LessonContent;
