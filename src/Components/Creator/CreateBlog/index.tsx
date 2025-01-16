import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { BlogDiscardButton, BlogPostButton, createBlogFormTitle, createBlogTitle, CreatorTitle } from "@/Constant";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateBlogForm from "./CreateBlogForm";

const CreateBlogContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={createBlogTitle}
				parent={CreatorTitle}
				title={createBlogTitle}
			/>
			<Container fluid>
				<Row>
					<Col xs={12}>
						<Card>
							<CommonCardHeader title={createBlogFormTitle} />
							<CardBody className="add-post">
								<CreateBlogForm />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CreateBlogContainer;
