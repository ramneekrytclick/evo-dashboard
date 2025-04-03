"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import StudentListTable from "./StudentListTable";
import Loading from "@/app/loading";

const StudentPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Students"}
				parent={AdminTitle}
				title={"Students"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<StudentListTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default StudentPageContainer;
