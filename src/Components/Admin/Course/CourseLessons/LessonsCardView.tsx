import { useState } from "react";
import { LessonType } from "@/Types/Lesson.type";
import { Card, Col, Row, CardHeader, CardBody, Button } from "reactstrap";
import LessonCard from "./LessonCard";
import CreateLessonModal from "./CreateLessonModal";
import { deleteLesson } from "@/app/api/admin/lessons/lesson";
import { toast } from "react-toastify";

const LessonsCardView = ({
	lessons,
	refresh,
}: {
	lessons: LessonType[];
	refresh: () => void;
}) => {
	const handleDelete = async (id: string) => {
		try {
			await deleteLesson(id);
			toast.success("Lesson deleted successfully");
			refresh && refresh();
		} catch (error) {
			toast.error("Error deleting lesson");
		}
	};

	if (!lessons || lessons.length === 0) {
		return <p className='text-muted'>No lessons available.</p>;
	}

	return (
		<>
			<CardBody
				className='bg-light'
				style={{ height: "650px", overflowY: "auto" }}>
				<Row className='g-3'>
					{lessons.map((lesson) => (
						<Col
							xs={12}
							md={6}
							lg={4}
							key={lesson._id}>
							<LessonCard
								lesson={lesson}
								onDelete={() => handleDelete(lesson._id)}
							/>
						</Col>
					))}
				</Row>
			</CardBody>
		</>
	);
};

export default LessonsCardView;
