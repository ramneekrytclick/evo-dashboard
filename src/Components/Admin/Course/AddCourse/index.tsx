'use client'
import React, { useCallback, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import Breadcrumbs from '@/CommonComponent/BreadCrumbs';
import { AddCourseTitle, CourseForm, CourseTitle } from '@/Constant';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader';
import CourseFormNav from './CourseFormNav';
import CourseTabContents from './CourseTabContents';

const AddCourseContainer = () => {
    const [steps, setSteps] = useState(1);
    const activeCallBack = useCallback((tab: number) => {
        setSteps(tab);
    }, []);
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
                                    <CourseFormNav steps={steps} setSteps={setSteps} />
                                    <CourseTabContents steps={steps} activeCallBack={activeCallBack}/>
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