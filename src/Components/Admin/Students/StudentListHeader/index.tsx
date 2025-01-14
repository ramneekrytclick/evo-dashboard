import { AddStudentTitle, Href } from "@/Constant";
import Link from "next/link";
import { useState } from "react";
import { Filter } from "react-feather";
import { Card, CardBody, Collapse } from "reactstrap";
import StudentListBody from "./StudentListBody";


const StudentListHeader = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleFilterToggle = () => {
        setIsFilterOpen((prevState) => !prevState);
    };
    return (
        <div className="list-product-header">
            <div>
                {/* <div className="light-box">
                    <a href={Href} onClick={handleFilterToggle}>
                        {isFilterOpen ? <i className='icon-close filter-close' /> : <Filter className='filter-icon' />}
                    </a>
                </div> */}
                <Link className="btn btn-primary" href={'/admin/students/add_student'}>
                    <i className="fa fa-plus me-2 py-1" /> {AddStudentTitle}
                </Link>
            </div>
            <Collapse className={isFilterOpen ? "show" : ""}>
                <Card className="list-product-body">
                    <CardBody>
                        <StudentListBody/>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default StudentListHeader;