"use client";

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card, Col, Container, Row } from "reactstrap";
import JobFilterSidebar from "./JobFilterSidebar";
import JobsCardView from "./JobsCardView";
import { useState } from "react";

const JobPortalContainer = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [location, setLocation] = useState("");
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	return (
		<>
			<Breadcrumbs
				mainTitle="EVO Job Portal"
				parent="Student"
				title="Jobs"
			/>
			<Container fluid>
				<Row>
					<Col
						xxl={3}
						xl={4}
						className="box-col-4e">
						<div className="md-sidebar">
							<JobFilterSidebar
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								location={location}
								setLocation={setLocation}
								selectedFilters={selectedFilters}
								setSelectedFilters={setSelectedFilters}
							/>
						</div>
					</Col>
					<Col
						xxl={9}
						xl={8}
						className="box-col-8">
						<JobsCardView
							searchQuery={searchQuery}
							location={location}
							selectedFilters={selectedFilters}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobPortalContainer;
