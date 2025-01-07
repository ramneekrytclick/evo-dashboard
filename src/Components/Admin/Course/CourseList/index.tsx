"use client"
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { addUserTitle, AdminTitle, ManagerCardsTitle, ManagerTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CourseListHeader from "./CourseListHeader";
import CourseListTable from "./CourseListTable";


const CoursePageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={TeamTitle}
				parent={AdminTitle}
				title={TeamTitle}
			/>
			<Container fluid>
				<Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <CourseListHeader/>
                                <CourseListTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</Container>
		</>
	);
};

export default CoursePageContainer;
