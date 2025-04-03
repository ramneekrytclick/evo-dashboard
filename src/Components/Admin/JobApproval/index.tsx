import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Col, Container, Row } from "reactstrap";
import JobsListTable from "./JobsListTable";

const JobApprovalContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Job Approval"}
				parent={"Admin"}
				title={"Jobs"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<JobsListTable />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobApprovalContainer;
