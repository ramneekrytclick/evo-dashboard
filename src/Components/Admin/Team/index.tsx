"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import TeamListTable from "./TeamListTable";

const TeamPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"EVO Team"}
				parent={AdminTitle}
				title={TeamTitle}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<TeamListTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default TeamPageContainer;
