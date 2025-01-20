import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { addAssignmentTitle, MentorTitle, scheduleSessionTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AddAssignmentForm from "./AddAssignmentForm";


const AddAssignmentContainer = () => {
    return (
        <>
            <Breadcrumbs
				mainTitle={addAssignmentTitle}
				parent={MentorTitle}
				title={addAssignmentTitle}
			/>
			<Container fluid>
				<Row>
					<Col xs={12}>
						<Card>
							<CardBody className="add-post">
								<AddAssignmentForm />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
        </>
    );
}

export default AddAssignmentContainer;