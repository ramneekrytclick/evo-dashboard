"use client";
import { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { LessonType } from "@/Types/Lesson.type";

import LessonContent from "./LessonContent";
import QuizFormModal from "./Quiz/QuizFormModal";
import AssignmentFormModal from "./Assignment/AssignmentFormModal";
import LessonSidebar from "./LessonSidebar";

const LessonLearningPage = ({
	lessons,
	courseId,
	refresh,
}: {
	lessons: LessonType[];
	refresh: () => void;
	courseId: string;
}) => {
	const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(
		lessons[0]
	);
	const [selectedView, setSelectedView] = useState<
		"video" | "quiz" | "assignment"
	>("video");
	const [quizModal, setQuizModal] = useState(false);
	const [assignmentModal, setAssignmentModal] = useState(false);

	return (
		<Card
			fluid
			className='py-3'>
			<Row className='gx-0'>
				<Col xl={9}>
					<LessonContent
						lesson={selectedLesson}
						view={selectedView}
						refresh={refresh}
						openQuizModal={() => setQuizModal(true)}
						openAssignmentModal={() => setAssignmentModal(true)}
					/>
				</Col>
				<Col xl={3}>
					<LessonSidebar
						lessons={lessons}
						onSelect={(lesson, view) => {
							setSelectedLesson(lesson);
							setSelectedView(view);
						}}
						refresh={refresh}
						courseId={courseId}
					/>
				</Col>
			</Row>

			{selectedLesson && (
				<>
					<QuizFormModal
						isOpen={quizModal}
						toggle={() => {
							setQuizModal(false);
							refresh();
						}}
						id={selectedLesson._id}
					/>
					<AssignmentFormModal
						isOpen={assignmentModal}
						toggle={() => {
							setAssignmentModal(false);
						}}
						refresh={refresh}
						lessonId={selectedLesson._id}
					/>
				</>
			)}
		</Card>
	);
};

export default LessonLearningPage;
