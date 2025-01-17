import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { EmployerTitle, studentsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import StudentsTable from "./StudentsTable";

const StudentsPageContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={studentsTitle} parent={EmployerTitle} title={studentsTitle}/>
            <Container fluid>
            <Row>
					<Col xs={12}>
						<Card>
							<CommonCardHeader title={studentsTitle} />
							<CardBody className="add-post">
                                <StudentsTable/>
							</CardBody>
						</Card>
					</Col>
				</Row>
                
            </Container>
        </>
    );
}

export default StudentsPageContainer;