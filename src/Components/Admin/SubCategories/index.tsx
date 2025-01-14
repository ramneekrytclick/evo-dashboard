import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CategoriesTitle, SubcategoriesTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import SubcategoriesCards from "./SubcategoriesCards";

const SubcategoriesContainer = ({ id }: { id: string }) => {
	return (
		<>
			<Breadcrumbs
				mainTitle={SubcategoriesTitle}
				parent={CategoriesTitle}
				title={SubcategoriesTitle}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<Card>
							<CardBody>
								<SubcategoriesCards id={id} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SubcategoriesContainer;
