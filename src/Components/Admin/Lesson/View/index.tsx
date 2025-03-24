"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import LessonListTable from "./LessonListTable";

const LessonViewContainer = ({ id }: { id: string }) => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Lesson Details"}
				parent={"Course"}
				title={"Lesson"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<LessonListTable id={id} />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default LessonViewContainer;
