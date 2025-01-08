import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import Breadcrumbs from '@/CommonComponent/BreadCrumbs';
import { AddCourseTitle, CourseForm, CourseTitle } from '@/Constant';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader';
import CreateCourseForm from './CreateCourseForm';

const AddCourseContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={AddCourseTitle} parent={CourseTitle} title={AddCourseTitle} />
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CommonCardHeader title={CourseForm} />
                            <CardBody>
                                <Row className="g-xl-5 g-3">
                                    <CreateCourseForm/>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AddCourseContainer;