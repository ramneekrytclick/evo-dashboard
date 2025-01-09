import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, AnnouncementsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AnnouncementsListHeader from "./AnnouncementsListHeader";
import AnnouncementsListTable from "./AnnouncementsListTable";

const AnnouncementsContainer = () => {
    return (
        <>
			<Breadcrumbs
				mainTitle={AnnouncementsTitle}
				parent={AdminTitle}
				title={AnnouncementsTitle}
			/>
			<Container fluid>
				<Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <AnnouncementsListHeader/>
                                <AnnouncementsListTable/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
			</Container>
		</>
    );
}

export default AnnouncementsContainer;