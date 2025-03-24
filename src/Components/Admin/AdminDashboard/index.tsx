"use client";
import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminDashboardTitle, AdminTitle, DashboardTitle } from "@/Constant";
import { getPlatformAnalytics } from "@/app/api/admin/analytics";
import { toast } from "react-toastify";

const AdminDashboardContainer = () => {
	const [data, setData] = React.useState(null);
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
				<Row>{JSON.stringify(data)}</Row>
			</Container>
		</>
	);
};
export default AdminDashboardContainer;
