"use client";
import { useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { LessonType } from "@/Types/Lesson.type";

import LessonContent from "./LessonContentStudent";
import LessonSidebar from "./LessonSidebarStudent";

const StudentLessonLearningPage = ({ lessons }: { lessons: any[] }) => {
	const [selectedLesson, setSelectedLesson] = useState<LessonType>();
	const [selectedView, setSelectedView] = useState<
		"video" | "quiz" | "assignment"
	>("video");

	return (
		<Card
			fluid
			className="py-3">
			<Row className="gx-0">
				<Col xl={9}>
					{selectedLesson ? (
						<LessonContent
							lesson={selectedLesson}
							view={selectedView}
						/>
					) : (
						<CardBody className="text-center text-muted">
							Select a lesson to begin
						</CardBody>
					)}
				</Col>
				<Col xl={3}>
					<LessonSidebar
						lessons={lessons}
						onSelect={(
							lesson: LessonType,
							view: "video" | "quiz" | "assignment"
						) => {
							setSelectedLesson(lesson);
							setSelectedView(view);
						}}
					/>
				</Col>
			</Row>
		</Card>
	);
};

export default StudentLessonLearningPage;
