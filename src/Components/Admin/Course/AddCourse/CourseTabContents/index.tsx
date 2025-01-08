import React from 'react'
import { Col, TabContent, TabPane } from 'reactstrap'
import { CourseTabContentProp } from '@/Types/Course.type'

import CourseCategories from './CourseCategories'
import AddCourseDetails from './AddCourseDetails'
import SellingPrice from './SellingPrice'
import AdvanceSection from './AdvanceSection'

const CourseTabContents: React.FC<CourseTabContentProp> = ({ steps, activeCallBack }) => {
    return (
        <Col xxl={9} xl={8} className="box-col-8 position-relative">
            <TabContent activeTab={steps}>
                <TabPane tabId={1}>
                    <AddCourseDetails activeCallBack={activeCallBack} />
                </TabPane>
                <TabPane tabId={2}>
                    <SellingPrice activeCallBack={activeCallBack} />
                </TabPane>
                <TabPane tabId={3}>
                    <AdvanceSection activeCallBack={activeCallBack}/>
                </TabPane>
            </TabContent>
        </Col>
    )
}
export default CourseTabContents