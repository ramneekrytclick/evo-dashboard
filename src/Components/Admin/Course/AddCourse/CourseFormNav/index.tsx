import SVG from '@/CommonComponent/SVG';
import { Href } from '@/Constant';
import { addCourseNav } from '@/Data/Admin/Courses/Course';
import { CourseFormNavProps } from '@/Types/Course.type';
import React from 'react'
import { Col, Nav, NavItem, NavLink } from 'reactstrap'

const CourseFormNav: React.FC<CourseFormNavProps> =({ steps, setSteps })=> {
    return (
        <Col xxl={3} xl={4} className="box-col-4e sidebar-left-wrapper">
            <Nav className="sidebar-left-icons" pills>
                {addCourseNav.map((data) => (
                    <NavItem key={data.id}>
                        <NavLink className={`${steps === data.id ? "active" : ''}`} href={Href} onClick={() => setSteps(data.id)}>
                            <div className="nav-rounded">
                                <div className="product-icons">
                                    <SVG className="stroke-icon" iconId={data.icon} />
                                </div>
                            </div>
                            <div className="product-tab-content">
                                <h6>{data.title}</h6>
                                <p>{data.subTitle}</p>
                            </div>
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
        </Col>
    )
}
export default CourseFormNav;