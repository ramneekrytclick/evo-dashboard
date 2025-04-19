import { LessonType } from "@/Types/Lesson.type";
import { Card, Col, Row, CardHeader, CardBody, Button } from "reactstrap";
import LessonCard from "./LessonCard";
import { toast } from "react-toastify";

const LessonsCardView = ({
	lessons,
	courseId,
}: {
	lessons: LessonType[];
	courseId: string;
}) => {
	return (
		<>
			<CardBody style={{ height: "650px", overflowY: "auto" }}>
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
							/>
						</Col>
					))}
				</Row>
			</CardBody>
		</>
	);
};

export default LessonsCardView;
