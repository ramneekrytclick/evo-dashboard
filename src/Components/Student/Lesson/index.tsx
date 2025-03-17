"use client";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { DetailedCourse, Learning } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CourseContent, {
	ActiveContent,
	PlaceholderContent,
} from "./CourseContent";

const ViewCourseContainer = () => {
	const [activeContent, setActiveContent] = useState<any>();
	return (
		<>
			<Breadcrumbs
				mainTitle={DetailedCourse}
				parent={Learning}
				title={DetailedCourse}
			/>
			<Container fluid>
				<Row className="learning-block">
					<Col
						xxl={9}
						xl={8}
						className="box-col-8 overflow-auto"
						style={{ maxHeight: "80vh" }}>
						{activeContent ? (
							<ActiveContent content={activeContent} />
						) : (
							<PlaceholderContent />
						)}
					</Col>
					<Col
						xxl={3}
						xl={4}
						className="box-col-4">
						<CourseContent setActiveContent={setActiveContent} />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ViewCourseContainer;
