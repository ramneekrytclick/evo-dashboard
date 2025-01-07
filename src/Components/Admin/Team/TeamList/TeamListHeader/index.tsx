import { Href } from "@/Constant";
import { TeamListHeaderProp } from "@/Types/Team.type";
import Link from "next/link";
import { useState } from "react";
import { Filter } from "react-feather";
import { Card, CardBody, Collapse } from "reactstrap";
import TeamListBody from "./TeamListBody";

const TeamListHeader = ({linkTitle}:TeamListHeaderProp) => {
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
                <Link className="btn btn-primary" href={'/admin/team/add_user'}>
                    <i className="fa fa-plus me-2" /> {linkTitle}
                </Link>
            </div>
            <Collapse className={isFilterOpen ? "show" : ""}>
                <Card className="list-product-body">
                    <CardBody>
                        <TeamListBody/>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
}

export default TeamListHeader;