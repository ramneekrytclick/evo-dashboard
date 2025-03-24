"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import PendingListTable from "./PendingListTable";

const PendingPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Pending User Approvals"}
				parent={AdminTitle}
				title={TeamTitle}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<PendingListTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default PendingPageContainer;
