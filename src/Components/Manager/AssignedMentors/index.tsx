"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AssignedManagersTable from "./AssignedManagersTable";

const AssignedMentorsContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Assigned Mentors"}
				parent={"Manager"}
				title={"Mentors"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<AssignedManagersTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default AssignedMentorsContainer;
