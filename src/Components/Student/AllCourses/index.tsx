import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Container, Row } from "reactstrap";
import CourseCards from "./CourseCards";

const AllCoursesContainer = () => {
	return (
		<>
			<Breadcrumbs
				title={"Courses"}
				parent={"Student"}
				mainTitle={"All Courses"}
			/>
			<Container fluid>
				<Row>
					<CourseCards />
				</Row>
			</Container>
		</>
	);
};

export default AllCoursesContainer;
