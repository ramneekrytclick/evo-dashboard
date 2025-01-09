"use client"
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, StudentTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import StudentListHeader from "./StudentListHeader";
import StudentListTable from "./StudentListTable";

const StudentPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={StudentTitle}
				parent={AdminTitle}
				title={StudentTitle}
			/>
			<Container fluid>
				<Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <StudentListHeader/>
                                <StudentListTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</Container>
		</>
	);
};

export default StudentPageContainer;
