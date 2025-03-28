"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CertificateTable from "./CertificateTable";

const CertificatePageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Give Certificate"}
				parent={AdminTitle}
				title={"Students"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<CertificateTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CertificatePageContainer;
