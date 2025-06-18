import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, BatchesTitle } from "@/Constant";
import { Col, Container, Row } from "reactstrap";
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
