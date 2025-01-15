
import { lessonFormNavData } from '@/Data/Admin/Lessons/Lesson';
import React from 'react'
import { Nav, NavLink } from 'reactstrap'


 interface LessonFormNavProps {
    activeCallBack: (tab: number) => void;
    steps: number
    differentId?: boolean;
}
const LessonFormNavComponent: React.FC<LessonFormNavProps> = ({ steps, activeCallBack }) => {
    return (
        <Nav className="horizontal-options" pills>
            {lessonFormNavData.map((data) => (
                <NavLink key={data.id} className={steps === data.id ? "active" : ''} >
                    <div className="horizontal-wizard">
                        <div className="stroke-icon-wizard">
                            <i className={`fa fa-${data.icon}`} />
                        </div>
                        <div className="horizontal-wizard-content">
                            <h6>{data.title}</h6>
                        </div>
                    </div>
                </NavLink>
            ))}
        </Nav>
    )
}
export default LessonFormNavComponent