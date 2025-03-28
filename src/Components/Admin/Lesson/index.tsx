import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CoursesTitle, LessonsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import LessonList from "./LessonList";
import LessonHeader from "./LessonHeader";

const LessonsPageContainer = ({ id }: { id: string }) => {
	return (
		<>
			<Breadcrumbs
				mainTitle={LessonsTitle}
				parent={CoursesTitle}
				title={LessonsTitle}
			/>
			<Container fluid>
				<Row>
					<Col className="box-col-8">
						<Card>
							<CardBody>
								<LessonHeader />
								<LessonList courseId={id} />
							</CardBody>
							<Row></Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default LessonsPageContainer;
