import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { AdminTitle, BatchesTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CourseBatchesList from "./CourseBatchesList";

const CourseBatchContainer = ({ id }: { id: string }) => {
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
						<Card>
							<CardBody>
								<CourseBatchesList id={id} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CourseBatchContainer;
