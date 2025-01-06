'use client'
import React from 'react'
import { Container, Row } from 'reactstrap';
import Breadcrumbs from '@/CommonComponent/BreadCrumbs';
import { AdminDashboardTitle, AdminTitle, DashboardTitle } from '@/Constant';


const AdminDashboardContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={AdminDashboardTitle} parent={DashboardTitle} title={AdminTitle} />
            <Container fluid className="admin-dashboard">
                <Row>
                    Here Admin Dashboard Content Will be Shown:
                    <div>
                    Overview of platform metrics such as total users, active courses, and revenue.
                    </div>
                    <div>
                    Quick links to recent activity or pending approvals.
                    </div>
                </Row>
            </Container>
        </>
    )
}
export default AdminDashboardContainer;