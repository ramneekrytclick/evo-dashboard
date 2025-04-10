"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/AuthProvider";
import { getMentorStats } from "@/app/api/managers";
import { toast } from "react-toastify";
import MentorStats from "./MentorStats";

const MentorDashboardContainer = () => {
	const [managerStats, setManagerStats] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const { user } = useAuth();
	const managerId = user?.id || "";
	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await getMentorStats(managerId);
			setManagerStats(response.mentorStats);
			setLoading(false);
		} catch (error: any) {
			setError("Failed to fetch mentors.");
			toast.error("Failed to fetch mentors.");
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			<Breadcrumbs
				mainTitle={"Dashboard"}
				parent={"Manager"}
				title={"Dashboard"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<MentorStats data={managerStats} />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default MentorDashboardContainer;
