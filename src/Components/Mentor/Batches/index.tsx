import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BatchCards from "./BatchCards";

const BatchesPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"My Batches"}
				parent={"Student"}
				title={"Batches"}
			/>
			<Container fluid>
				<BatchCards />
			</Container>
		</>
	);
};

export default BatchesPageContainer;
