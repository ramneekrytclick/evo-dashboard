"use client"
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { ManagerCreateTitle, ManagerTitle } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/BreadCrumbs'
import CreateNewManagerForm from './CreateNewManagerForm'

const ManagerCreateContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ManagerCreateTitle} parent={ManagerTitle} title={ManagerCreateTitle} />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <Card>
              <CardBody>
                <CreateNewManagerForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ManagerCreateContainer