import { LessonType } from "@/Types/Lesson.type";
import { Card, Col, Row, CardHeader, CardBody, Button } from "reactstrap";
import LessonCard from "./LessonCard";
import { toast } from "react-toastify";

const LessonsCardView = ({
	lessons,
	courseId,
	completedLessons,
}: {
	lessons: LessonType[];
	courseId: string;
	completedLessons: string[];
}) => {
	return (
		<>
			<CardBody style={{ height: "650px", overflowY: "auto" }}>
				{lessons.length === 0 ? (
					<div className='d-flex justify-content-center align-items-center pt-5'>
						<h6>No lessons found...</h6>
					</div>
				) : null}
				<Row className='g-3'>
					{lessons.map((lesson) => (
						<Col
							xs={12}
							md={6}
							lg={4}
							key={lesson._id}>
							<LessonCard
								lesson={lesson}
								courseId={courseId}
								completed={completedLessons.includes(lesson._id)}
							/>
						</Col>
					))}
				</Row>
			</CardBody>
		</>
	);
};

export default LessonsCardView;
