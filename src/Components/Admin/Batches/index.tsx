import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { AdminTitle, BatchesTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

import CreateBatchModal from "./CreateBatchModal";
import BatchesList from "./BatchesList";

const BatchesPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={BatchesTitle}
				parent={AdminTitle}
				title={BatchesTitle}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<BatchesList />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BatchesPageContainer;
