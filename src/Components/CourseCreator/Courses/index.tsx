"use client";

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card, CardBody, Container } from "reactstrap";
import CoursesTable from "./CoursesTable";

const CCCourseContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Courses"}
				parent={"Course Creator"}
				title={"Courses"}
			/>
			<Container fluid>
				<Card>
					<CoursesTable />
				</Card>
			</Container>
		</>
	);
};

export default CCCourseContainer;
