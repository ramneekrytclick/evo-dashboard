import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
// import Sidebar from "../Common/Sidebar";
import JobsCardView from "./JobsCardView";

const JobPortalContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"EVO Job Portal"}
				parent={"Student"}
				title={"Jobs"}
			/>
			<Container fluid>
				<Row>
					<Col
						xxl={3}
						xl={4}
						className="box-col-4e">
						<div className="md-sidebar">{/* <Sidebar /> */}</div>
					</Col>
					<Col
						xxl={9}
						xl={8}
						className="box-col-8">
						<JobsCardView />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobPortalContainer;
