import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { MentorTitle, scheduleSessionTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ScheduleSessionForm from "./ScheduleSessionForm";
import ScheduledSessions from "./ScheduledSessions";

const ScheduleSessionContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={scheduleSessionTitle}
				parent={MentorTitle}
				title={scheduleSessionTitle}
			/>
			<Container fluid>
				<Row>
					<Col
						xs={12}
						lg={9}>
						<ScheduledSessions />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ScheduleSessionContainer;
