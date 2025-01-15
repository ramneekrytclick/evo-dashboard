import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, CoursesTitle, CourseSubTitle } from "@/Constant";

import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CourseFilter from "./CourseFilter";
import CourseCards from "./CourseCards";
import CourseHeader from "../Students/CourseHeader";

const CoursesPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={CoursesTitle}
				parent={AdminTitle}
				title={CoursesTitle}
			/>
			<Container fluid>
				<Row>
					<Col className="box-col-8">
					<Card>
						<CardBody>
							<CourseHeader/>
							<CourseCards />
						</CardBody>
						<Row>
						</Row>
					</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CoursesPageContainer;
