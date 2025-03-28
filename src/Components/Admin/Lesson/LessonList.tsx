"use client";
import { useEffect, useState } from "react";
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	Card,
	CardBody,
	Col,
	Container,
	Row,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { getLessons } from "@/app/api/admin/lessons/lesson";
import { toast } from "react-toastify";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CoursesTitle, LessonsTitle } from "@/Constant";

interface QuizQuestion {
	question: string;
	options: string[];
	correctAnswer: string;
}

interface Assignment {
	title: string;
	description: string;
	attachmentUrl?: string;
}

interface LessonType {
	_id: string;
	title: string;
	content: string;
	videoUrl: string;
	quizzes: QuizQuestion[];
	assignments: Assignment[];
}

const LessonLearningPage = ({ courseId }: { courseId: string }) => {
	const [lessons, setLessons] = useState<LessonType[]>([]);
	const [open, setOpen] = useState<string>("");
	const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
	const [quizModal, setQuizModal] = useState(false);
	const [assignmentModal, setAssignmentModal] = useState(false);

	const [quizList, setQuizList] = useState<QuizQuestion[]>([
		{
			question: "",
			options: [""],
			correctAnswer: "",
		},
	]);

	const [assignmentData, setAssignmentData] = useState<Assignment>({
		title: "",
		description: "",
		attachmentUrl: "",
	});

	const toggle = (id: string) => {
		const selected = lessons.find((lesson) => lesson._id === id) || null;
		setSelectedLesson(selected);
		setOpen(open === id ? "" : id);
	};

	const fetchLessons = async () => {
		try {
			const response = await getLessons(courseId);
			setLessons(response);
		} catch (error) {
			toast.error("Error fetching lessons");
		}
	};

	useEffect(() => {
		fetchLessons();
	}, []);

	const handleQuizChange = (
		index: number,
		field: keyof QuizQuestion,
		value: any
	) => {
		const updated = [...quizList];
		updated[index][field] = value;
		setQuizList(updated);
	};

	const handleOptionsChange = (index: number, value: string) => {
		const updated = [...quizList];
		updated[index].options = value.split(",").map((opt) => opt.trim());
		setQuizList(updated);
	};

	const addMoreQuiz = () => {
		setQuizList([
			...quizList,
			{ question: "", options: [""], correctAnswer: "" },
		]);
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col
						xl={8}
						className="mb-3">
						<Card>
							<CardBody>
								{selectedLesson ? (
									<>
										<h4>{selectedLesson.title}</h4>
										<div className="mb-3">
											<iframe
												width="100%"
												height="400"
												src={selectedLesson.videoUrl.replace(
													"watch?v=",
													"embed/"
												)}
												title={selectedLesson.title}
												frameBorder="0"
												allowFullScreen></iframe>
										</div>
										<h5>Content</h5>
										<p>{selectedLesson.content}</p>

										<div className="d-flex gap-2 my-3">
											<Button
												color="info"
												onClick={() => setQuizModal(true)}>
												Add Quiz
											</Button>
											<Button
												color="warning"
												onClick={() => setAssignmentModal(true)}>
												Add Assignment
											</Button>
										</div>

										{selectedLesson.quizzes.length > 0 && (
											<>
												<h5>Quizzes</h5>
												<ul>
													{selectedLesson.quizzes.map((quiz, index) => (
														<li key={index}>{quiz.question}</li>
													))}
												</ul>
											</>
										)}
										{selectedLesson.assignments.length > 0 && (
											<>
												<h5>Assignments</h5>
												<ul>
													{selectedLesson.assignments.map(
														(assignment, index) => (
															<li key={index}>{assignment.title}</li>
														)
													)}
												</ul>
											</>
										)}
									</>
								) : (
									<h5 className="text-muted text-center">
										Select a lesson from the right to view details
									</h5>
								)}
							</CardBody>
						</Card>
					</Col>

					<Col xl={4}>
						<Card>
							<CardBody>
								<h5 className="mb-3">Lessons</h5>
								<Accordion
									open={open}
									toggle={toggle}
									className="dark-accordion">
									{lessons.map((lesson) => (
										<AccordionItem key={lesson._id}>
											<AccordionHeader targetId={lesson._id}>
												{lesson.title}
											</AccordionHeader>
											<AccordionBody accordionId={lesson._id}>
												<p>{lesson.content.slice(0, 100)}...</p>
												<small className="text-muted">
													Video + Quizzes + Assignments
												</small>
											</AccordionBody>
										</AccordionItem>
									))}
								</Accordion>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>

			{/* Quiz Modal */}
			<Modal
				isOpen={quizModal}
				toggle={() => setQuizModal(!quizModal)}
				size="lg">
				<ModalHeader toggle={() => setQuizModal(false)}>
					Create Quiz
				</ModalHeader>
				<ModalBody>
					{quizList.map((quiz, index) => (
						<Form
							key={index}
							className="border p-3 mb-3 rounded">
							<h6>Question {index + 1}</h6>
							<FormGroup>
								<Label>Question</Label>
								<Input
									type="text"
									value={quiz.question}
									onChange={(e) =>
										handleQuizChange(index, "question", e.target.value)
									}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Options (comma separated)</Label>
								<Input
									type="text"
									value={quiz.options.join(", ")}
									onChange={(e) => handleOptionsChange(index, e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Correct Answer</Label>
								<Input
									type="text"
									value={quiz.correctAnswer}
									onChange={(e) =>
										handleQuizChange(index, "correctAnswer", e.target.value)
									}
								/>
							</FormGroup>
						</Form>
					))}
					<Button
						color="secondary"
						onClick={addMoreQuiz}>
						+ Add Another Question
					</Button>
				</ModalBody>
				<ModalFooter>
					<Button color="primary">Create</Button>
					<Button
						color="secondary"
						onClick={() => setQuizModal(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>

			{/* Assignment Modal */}
			<Modal
				isOpen={assignmentModal}
				toggle={() => setAssignmentModal(!assignmentModal)}>
				<ModalHeader toggle={() => setAssignmentModal(false)}>
					Create Assignment
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>Title</Label>
							<Input
								type="text"
								value={assignmentData.title}
								onChange={(e) =>
									setAssignmentData({
										...assignmentData,
										title: e.target.value,
									})
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Description</Label>
							<Input
								type="textarea"
								value={assignmentData.description}
								onChange={(e) =>
									setAssignmentData({
										...assignmentData,
										description: e.target.value,
									})
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Attachment URL (Optional)</Label>
							<Input
								type="text"
								value={assignmentData.attachmentUrl}
								onChange={(e) =>
									setAssignmentData({
										...assignmentData,
										attachmentUrl: e.target.value,
									})
								}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary">Create</Button>
					<Button
						color="secondary"
						onClick={() => setAssignmentModal(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default LessonLearningPage;
