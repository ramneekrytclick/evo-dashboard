"use client"
import { AddAnnouncementTitle, AddMentorTitle, Href } from "@/Constant";
import Link from "next/link";
import { useState } from "react";
import { Filter } from "react-feather";
import { Card, CardBody, Collapse } from "reactstrap";
import AnnouncementsListBody from "./AnnouncementsListBody";


const AnnouncementsListHeader = () => {
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
                <Link className="btn btn-primary" href={'/admin/Mentors/add_Mentor'}>
                    <i className="fa fa-plus me-2" /> {AddAnnouncementTitle}
                </Link>
            </div>
            <Collapse className={isFilterOpen ? "show" : ""}>
                <Card className="list-product-body">
                    <CardBody>
                        <AnnouncementsListBody/>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default AnnouncementsListHeader;