"use client";
import { getStudentProfile } from "@/app/api/student";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { DashboardTitle, StudentTitle } from "@/Constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";

const StudentDashboardContainer = () => {
	const [evoScore, setScore] = useState();
	const fetchData = async () => {
		try {
			const response = await getStudentProfile();
			console.log(response);
			setScore(response);
		} catch (error: any) {
			console.log(error.response.data.message);
			toast.error(error.response.data.message);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			<Breadcrumbs
				mainTitle={"Student Dashboard"}
				parent={StudentTitle}
				title={DashboardTitle}
			/>
			<Card>
				<CardBody>
					Student Dashboard Content
					<p>Welcome, Student!</p>
					{JSON.stringify(evoScore)}
				</CardBody>
			</Card>
		</>
	);
};

export default StudentDashboardContainer;
