import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, CategoriesTitle, CategoriesTitleLearning } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CategoriesHeader from "./CategoriesHeader/page";
import CategoriesCards from "./CategoriesCards";

const CategoryContainer = () => {
    return (
        <>
			<Breadcrumbs
				mainTitle={CategoriesTitle}
				parent={AdminTitle}
				title={CategoriesTitleLearning}
			/>
			<Container fluid>
				<Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <CategoriesCards/> 
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</Container>
		</>
    );
}

export default CategoryContainer;