"use client"
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, EmployerTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import EmployerListHeader from "./EmployerListHeader";
import EmployerListTable from "./EmployerListTable";

const EmployerPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={EmployerTitle}
				parent={AdminTitle}
				title={EmployerTitle}
			/>
			<Container fluid>
				<Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <EmployerListHeader/>
                                <EmployerListTable/> 
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</Container>
		</>
	);
};

export default EmployerPageContainer;
