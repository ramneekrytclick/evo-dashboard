'use client'
import React from 'react'
import { Container, Row } from 'reactstrap'
import Breadcrumbs from '@/CommonComponent/BreadCrumbs'
import { ManagerCardsTitle, ManagerTitle } from '@/Constant'
import ManagerProfileCards from './ManagerProfileCards'

const ManagerListContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={ManagerCardsTitle} parent={ManagerTitle} title={ManagerCardsTitle} />
            <Container fluid>
                <Row>
                    <ManagerProfileCards />
                </Row>
            </Container>
        </>
    )
}
export default ManagerListContainer;