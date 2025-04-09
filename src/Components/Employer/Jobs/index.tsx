import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { EmployerTitle, jobApplicationsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import JobApplicationsTable from "./JobsTable";

const JobApplicationsContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={jobApplicationsTitle}
				parent={EmployerTitle}
				title={jobApplicationsTitle}
			/>
			<Container fluid>
				<Row>
					<Col xs={12}>
						<JobApplicationsTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobApplicationsContainer;
