"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CertificateTable from "./CertificateTable";

const CertificatePageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Issue Certificate"}
				parent={AdminTitle}
				title={"Students"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<Card>
							<CertificateTable />
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CertificatePageContainer;
