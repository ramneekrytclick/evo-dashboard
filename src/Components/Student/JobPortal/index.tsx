"use client";

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card, Col, Container, Row } from "reactstrap";
import JobFilterSidebar from "./JobFilterSidebar";
import JobsCardView from "./JobsCardView";
import { useEffect, useState } from "react";
import { getMyApplications } from "@/app/api/student";
import { toast } from "react-toastify";

const JobPortalContainer = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [location, setLocation] = useState("");
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
	const [jobType, setJobType] = useState("");
	const [experience, setExperience] = useState("");
	const [salaryRange, setSalaryRange] = useState("");
	const [deadline, setDeadline] = useState("");
	const fetchMyApplications = async () => {
		try {
			const response = await getMyApplications();
			// Extract only job IDs
			const jobIds = response.applications?.map((app: any) => app.jobId) || [];
			setAppliedJobs(response.applications);
		} catch (error) {
			toast.error("Error fetching applied jobs.");
		}
	};

	useEffect(() => {
		fetchMyApplications();
	}, []);

	return (
		<>
			<Breadcrumbs
				mainTitle='EVO Job Portal'
				parent='Student'
				title='Jobs'
			/>
			<Container fluid>
				<Row>
					<Col
						xxl={3}
						xl={4}
						className='box-col-4e'>
						<div className='md-sidebar'>
							<JobFilterSidebar
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								location={location}
								setLocation={setLocation}
								selectedFilters={selectedFilters}
								setSelectedFilters={setSelectedFilters}
								jobType={jobType}
								setJobType={setJobType}
								experience={experience}
								setExperience={setExperience}
								salaryRange={salaryRange}
								setSalaryRange={setSalaryRange}
								deadline={deadline}
								setDeadline={setDeadline}
							/>
						</div>
					</Col>
					<Col
						xxl={9}
						xl={8}
						className='box-col-8'>
						<Card
							className='card-body bg-light'
							style={{ maxHeight: "80vh", overflowY: "auto" }}>
							<JobsCardView
								searchQuery={searchQuery}
								location={location}
								selectedFilters={selectedFilters}
								appliedJobs={appliedJobs}
								jobType={jobType}
								experience={experience}
								salaryRange={salaryRange}
								deadline={deadline}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobPortalContainer;
