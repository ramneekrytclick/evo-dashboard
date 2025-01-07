"use client"
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { addUserTitle, AdminTitle, ManagerCardsTitle, ManagerTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import TeamListHeader from "./TeamListHeader";
import TeamListTable from "./TeamListTable";

const TeamPageContainer = () => {
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
                                <TeamListHeader/>
                                <TeamListTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</Container>
		</>
	);
};

export default TeamPageContainer;
