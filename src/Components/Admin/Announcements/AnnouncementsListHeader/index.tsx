"use client";
import {
	AddAnnouncementTitle,
	AddMentorTitle,
	createAnnouncementTitle,
	Href,
} from "@/Constant";
import Link from "next/link";
import { useState } from "react";
import { Filter } from "react-feather";
import { Card, CardBody, Collapse } from "reactstrap";
import AnnouncementsListBody from "./AnnouncementsListBody";
import AnnouncementModal from "./CreateAnnouncement/AnnouncementModal";

const AnnouncementsListHeader = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const handleFilterToggle = () => {
		setIsFilterOpen((prevState) => !prevState);
	};
	return (
		<div className="list-product-header">
			<div>
				<div className="light-box">
					<a
						href={Href}
						onClick={handleFilterToggle}>
						{isFilterOpen ? (
							<i className="icon-close filter-close" />
						) : (
							<Filter className="filter-icon" />
						)}
					</a>
				</div>
				<AnnouncementModal />
				{/* <Link className="btn btn-primary" href={'/admin/announcements/create-announcement'}>
                    <i className="fa fa-plus me-2" /> {createAnnouncementTitle}
                </Link> */}
			</div>
			<Collapse className={isFilterOpen ? "show" : ""}>
				<Card className="list-product-body">
					<CardBody>
						<AnnouncementsListBody />
					</CardBody>
				</Card>
			</Collapse>
		</div>
	);
};

export default AnnouncementsListHeader;
