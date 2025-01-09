"use client"
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, MentorTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import MentorListHeader from "./MentorListHeader";
import MentorListTable from "./MentorListTable";

const MentorPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={MentorTitle}
				parent={AdminTitle}
				title={MentorTitle}
			/>
			<Container fluid>
				<Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <MentorListHeader/>
                                <MentorListTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</Container>
		</>
	);
};

export default MentorPageContainer;
