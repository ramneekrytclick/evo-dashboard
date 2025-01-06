'use client'
import React from 'react'
import { Container, Row } from 'reactstrap'
import Breadcrumbs from '@/CommonComponent/BreadCrumbs'
import { MentorCardsTitle, MentorTitle } from '@/Constant'
import MentorProfileCards from './MentorProfileCards'

const MentorListContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={MentorCardsTitle} parent={MentorTitle} title={MentorCardsTitle} />
            <Container fluid>
                <Row>
                    <MentorProfileCards />
                </Row>
            </Container>
        </>
    )
}
export default MentorListContainer;