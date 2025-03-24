"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle } from "@/Constant";
import { Col, Container, Row } from "reactstrap";
import EmployerListTable from "./EmployerListTable";

const EmployerPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Employers"}
				parent={AdminTitle}
				title={"Employers"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<EmployerListTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default EmployerPageContainer;
