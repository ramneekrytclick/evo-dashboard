import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, PromoCodesTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import PromocodesCards from "./PromocodesCards";

const PromoCodesPageContainer = () => (
	<>
		<Breadcrumbs
			mainTitle={PromoCodesTitle}
			parent={AdminTitle}
			title={PromoCodesTitle}
		/>
		<Container fluid>
			<Row>
				<Col sm={12}>
					<PromocodesCards />
				</Col>
			</Row>
		</Container>
	</>
);

export default PromoCodesPageContainer;
