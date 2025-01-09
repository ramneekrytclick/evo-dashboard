import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, BlogsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BlogsTable from "./BlogsTable";

const BlogsPageContainer = () => {
    return (
        <>
			<Breadcrumbs
				mainTitle={BlogsTitle}
				parent={AdminTitle}
				title={BlogsTitle}
			/>
			<Container fluid>
				<Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <BlogsTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</Container>
		</>
    );
}

export default BlogsPageContainer;