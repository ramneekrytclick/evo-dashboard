"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, MentorTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import MentorListTable from "./MentorListTable";

const MentorPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={MentorTitle}
				parent={AdminTitle}
				title={MentorTitle}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<MentorListTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default MentorPageContainer;
