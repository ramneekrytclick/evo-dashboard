import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, PathsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import PathsHeader from "./PathsHeader";
import PathCards from "./PathCards";

const PathPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={PathsTitle}
				parent={AdminTitle}
				title={PathsTitle}
			/>
			<Container fluid>
				<Row>
					<Col className="box-col-8">
						<Card>
							<CardBody>
								<PathsHeader />
								<PathCards />
							</CardBody>
							<Row></Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default PathPageContainer;
