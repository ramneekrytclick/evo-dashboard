"use client";

import { Button, Card, CardBody, Collapse } from "reactstrap";
import SearchAndMap from "./SearchAndMap";
import FilterCheckBox from "./FilterCheckBox";
import { FilterHeading, FindJobs } from "@/Constant";
import HeaderWithIcon from "./HeaderWithIcon";
import { useState } from "react";

const JobFilterSidebar = ({
	searchQuery,
	setSearchQuery,
	location,
	setLocation,
	selectedFilters,
	setSelectedFilters,
}: any) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<Card>
			<HeaderWithIcon
				heading={FilterHeading}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<Collapse isOpen={isOpen}>
				<CardBody className="filter-cards-view animate-chk">
					<SearchAndMap
						searchQuery={searchQuery}
						location={location}
						setSearchQuery={setSearchQuery}
						setLocation={setLocation}
					/>
					<FilterCheckBox
						selectedFilters={selectedFilters}
						setSelectedFilters={setSelectedFilters}
					/>
					<Button
						className="text-center w-100 mt-3"
						color="primary">
						{FindJobs}
					</Button>
				</CardBody>
			</Collapse>
		</Card>
	);
};

export default JobFilterSidebar;
