import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CourseCards from "./CourseCards";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const AllCoursesContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"All Courses"}
				parent={"Student"}
				title={"All Courses"}
			/>
			<Container fluid>
				<CourseCards />
			</Container>
		</>
	);
};

export default AllCoursesContainer;
