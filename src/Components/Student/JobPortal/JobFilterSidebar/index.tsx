"use client";

import { useState } from "react";
import { Button, Card, CardBody, Collapse } from "reactstrap";
import HeaderWithIcon from "./HeaderWithIcon";
import SearchAndMap from "./SearchAndMap";
import { FilterHeading, FindJobs } from "@/Constant";
import FilterCheckBox from "./FilterCheckBox";
import AdditionalFilters from "./AdditionalFilters";

const JobFilterSidebar = ({
	searchQuery,
	setSearchQuery,
	location,
	setLocation,
	selectedFilters,
	setSelectedFilters,
	jobType,
	setJobType,
	experience,
	setExperience,
	salaryRange,
	setSalaryRange,
	deadline,
	setDeadline,
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
				<CardBody className='filter-cards-view animate-chk'>
					<SearchAndMap
						searchQuery={searchQuery}
						location={location}
						setSearchQuery={setSearchQuery}
						setLocation={setLocation}
					/>
					<AdditionalFilters
						jobType={jobType}
						setJobType={setJobType}
						experience={experience}
						setExperience={setExperience}
						salaryRange={salaryRange}
						setSalaryRange={setSalaryRange}
						deadline={deadline}
						setDeadline={setDeadline}
					/>
					<Button
						className='text-center w-100 mt-3'
						color='primary'>
						{FindJobs}
					</Button>
				</CardBody>
			</Collapse>
		</Card>
	);
};

export default JobFilterSidebar;
