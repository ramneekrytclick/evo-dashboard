import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CourseCards from "./CourseCards";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const MyCoursesContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"My Courses"}
				parent={"Student"}
				title={"My Courses"}
			/>
			<Container fluid>
				<Row>
					<CourseCards />
				</Row>
			</Container>
		</>
	);
};

export default MyCoursesContainer;
