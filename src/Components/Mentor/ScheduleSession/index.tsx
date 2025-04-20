import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { MentorTitle, scheduleSessionTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ScheduledSessions from "./ScheduledSessions";

const ScheduleSessionContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Scheduled Sessions"}
				parent={MentorTitle}
				title={"Scheduled Sessions"}
			/>
			<Container fluid>
				<Row>
					<ScheduledSessions />
				</Row>
			</Container>
		</>
	);
};

export default ScheduleSessionContainer;
