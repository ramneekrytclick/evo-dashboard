"use client";

import { useState } from "react";
import ContinueWatching from "./ContinueWatching";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Col, Row } from "reactstrap";
import UpcomingSessions from "./UpcomingSessions";
import YourMentorBookings from "./MentorBooking";
import EvoScore from "./EvoScore";

const StudentDashboardContainer = () => {
	const [loading, setLoading] = useState<boolean>(true);

	return (
		<>
			<Breadcrumbs
				mainTitle='Dashboard'
				parent='Student'
				title='Dashboard'
			/>
			<div className='pt-1 default-dashboard'>
				<Row>
					<Col
						sm={12}
						lg={5}>
						<ContinueWatching
							loading={loading}
							setLoading={setLoading}
						/>
					</Col>
					<Col
						sm={12}
						lg={7}>
						<UpcomingSessions
							loading={loading}
							setLoading={setLoading}
						/>
					</Col>
				</Row>
				<Row>
					<Col
						sm={12}
						lg={3}>
						<EvoScore
							loading={loading}
							setLoading={setLoading}
						/>
					</Col>
					<Col
						sm={12}
						lg={9}>
						{/* Mentor Bookings */}
						<YourMentorBookings
							loading={loading}
							setLoading={setLoading}
						/>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default StudentDashboardContainer;
