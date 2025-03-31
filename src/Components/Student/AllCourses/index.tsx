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
			<Card
				color="light"
				style={{ height: "80vh", overflow: "scroll" }}>
				<CourseCards />
			</Card>
		</>
	);
};

export default AllCoursesContainer;
