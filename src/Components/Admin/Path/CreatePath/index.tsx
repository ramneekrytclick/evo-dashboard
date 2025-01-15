import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { createPathTitle, PathsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreatePathForm from "./CreatePathForm";

const CreatePathPageContainer = () => {
    return (
        <>
			<Breadcrumbs
				mainTitle={createPathTitle}
				parent={PathsTitle}
				title={createPathTitle}
			/>
			<Container fluid>
				<Row>
					<Col className="box-col-8">
						<Card>
							<CardBody>
								<CreatePathForm/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
    );
}

export default CreatePathPageContainer;