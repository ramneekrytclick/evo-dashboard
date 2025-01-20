import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { assignmentsTitle, MentorTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AssignmentList from "./AssignmentList";

const AssignmentsContainer = () => {
    return (
        <>
            <Breadcrumbs
				mainTitle={assignmentsTitle}
				parent={MentorTitle}
				title={assignmentsTitle}
			/>
			<Container fluid>
				<Row>
					<Col xs={12}>
						<Card>
							<CardBody className="add-post">
								<AssignmentList />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
        </>
    );
}

export default AssignmentsContainer;