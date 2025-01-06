import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateNewMentorForm from "./CreateNewMentorForm";
import { ManagerCreateTitle, MentorCreateTitle, MentorTitle } from "@/Constant";

const MentorCreateContainer = () => {
    return (
        <>
        <Breadcrumbs mainTitle={MentorCreateTitle} parent={MentorTitle} title={MentorCreateTitle} />
        <Container fluid>
          <Row>
            <Col sm={12}>
              <Card>
                <CardBody>
                  <CreateNewMentorForm />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default MentorCreateContainer;