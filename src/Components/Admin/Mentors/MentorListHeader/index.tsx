import { AddMentorTitle, Href } from "@/Constant";
import Link from "next/link";
import { useState } from "react";
import { Filter } from "react-feather";
import { Card, CardBody, Collapse } from "reactstrap";
import MentorListBody from "./MentorListBody";


const MentorListHeader = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleFilterToggle = () => {
        setIsFilterOpen((prevState) => !prevState);
    };
    return (
        <div className="list-product-header">
            <div>
                <div className="light-box">
                    <a href={Href} onClick={handleFilterToggle}>
                        {isFilterOpen ? <i className='icon-close filter-close' /> : <Filter className='filter-icon' />}
                    </a>
                </div>
                <Link className="btn btn-primary" href={'/admin/mentors/add_mentor'}>
                    <i className="fa fa-plus me-2" /> {AddMentorTitle}
                </Link>
            </div>
            <Collapse className={isFilterOpen ? "show" : ""}>
                <Card className="list-product-body">
                    <CardBody>
                        <MentorListBody/>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default MentorListHeader;