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
					{/* <Col className="box-col-8"> */}
					<CourseCards />
					{/* </Col> */}
				</Row>
			</Container>
		</>
	);
};

export default MyCoursesContainer;
