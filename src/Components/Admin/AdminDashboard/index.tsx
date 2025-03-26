"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminDashboardTitle, AdminTitle, DashboardTitle } from "@/Constant";
import { getPlatformAnalytics } from "@/app/api/admin/analytics";
import { toast } from "react-toastify";
import SVG from "@/CommonComponent/SVG";

const AdminDashboardContainer = () => {
	const [data, setData] = useState(null);

	const fetchData = async () => {
		try {
			const response = await getPlatformAnalytics();
			setData(response);
		} catch (error) {
			console.error(error);
			toast.error("Error fetching Analytics data");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const generateCardData = (data: any) => {
		if (!data) return [];

		return [
			{ icon: "fill-learning", amount: data.totalUsers, title: "Total Users" },
			{ icon: "management", amount: data.managers, title: "Total Managers" },
			{ icon: "fill-user", amount: data.mentors, title: "Total Mentors" },
			{ icon: "fill-user", amount: data.students, title: "Total Students" },
			{
				icon: "fill-star",
				amount: data.courseCreators,
				title: "Course Creators",
			},
			{
				icon: "landing-alert",
				amount: data.employers,
				title: "Total Employers",
			},
		];
	};

	const cardData = generateCardData(data);

	return (
		<>
			<Breadcrumbs
				mainTitle={AdminDashboardTitle}
				parent={AdminTitle}
				title={DashboardTitle}
			/>
			<Container
				fluid
				className="admin-dashboard">
				<Row>
					{cardData.map((item, index) => (
						<Col
							sm={6}
							xl={4}
							lg={6}
							md={6}
							key={index}>
							<Card className="total-sales shadow-sm border-0">
								<CardBody>
									<div className="d-flex align-items-center gap-3">
										{/* <span className="svg-icon rounded bg-light p-2"> */}
										<SVG iconId={item.icon} />
										{/* </span> */}
										<div>
											<h1 className="mb-1 text-dark">{item.amount}</h1>
											<h6 className="text-muted">{item.title}</h6>
										</div>
									</div>
								</CardBody>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default AdminDashboardContainer;
