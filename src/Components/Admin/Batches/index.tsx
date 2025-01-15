import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { AdminTitle, BatchesTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BatchesList from "./BatchesList";
import CreateBatchModal from "./CreateBatchModal";

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
					<Col xs={12}>
						<Card>
							<CommonCardHeader title={BatchesTitle} />
							<CardBody>
								<Row className="g-xl-5 g-3">
									<BatchesList />
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BatchesPageContainer;
