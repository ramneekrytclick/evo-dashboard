import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { createJobFormTitle, createJobTitle, EmployerTitle } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateJobForm from "./CreateJobForm";

const CreateJobContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={createJobTitle} parent={EmployerTitle} title={createJobTitle}/>
            <Container fluid>
            <Row>
					<Col xs={12}>
						<Card>
							<CommonCardHeader title={createJobFormTitle} />
							<CardBody className="add-post">
								<CreateJobForm />
							</CardBody>
						</Card>
					</Col>
				</Row>
                
            </Container>
        </>
    );
}

export default CreateJobContainer;