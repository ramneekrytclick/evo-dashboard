import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BookSessionForm from "./BookSessionForm";

const SessionBookContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Book Session with Mentor"}
				parent={"Student"}
				title={"Session Booking"}
			/>
			<Container fluid>
				<Row>
					<BookSessionForm />
				</Row>
			</Container>
		</>
	);
};

export default SessionBookContainer;
