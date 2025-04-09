"use client";
import { getStudentProfile } from "@/app/api/student";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { DashboardTitle, StudentTitle } from "@/Constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const StudentDashboardContainer = () => {
	const [evoScore, setEvoScore] = useState<number>(0); // Default to 0

	const fetchData = async () => {
		try {
			const response = await getStudentProfile();
			console.log(response);
			const score =
				typeof response?.evoScore === "number" ? response.evoScore : 0;
			setEvoScore(score);
		} catch (error: any) {
			console.log(error.response?.data?.message || "Something went wrong");
			toast.error(error.response?.data?.message || "Failed to load profile");
			setEvoScore(0); // Ensure fallback if API fails
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const options: ApexOptions = {
		chart: {
			height: 350,
			type: "radialBar",
		},
		plotOptions: {
			radialBar: {
				hollow: {
					size: "70%",
				},
				dataLabels: {
					name: {
						show: true,
						fontSize: "22px",
					},
					value: {
						show: true,
						fontSize: "16px",
						formatter: (val) => `${val}%`,
					},
				},
			},
		},
		labels: ["Evo Score"],
		colors: ["#00B8D9"],
	};

	return (
		<>
			<Breadcrumbs
				mainTitle={"Student Dashboard"}
				parent={StudentTitle}
				title={DashboardTitle}
			/>
			<Card>
				<CardBody>
					<h4 className="mb-3">Welcome, Student!</h4>
					<ReactApexChart
						options={options}
						series={[evoScore]}
						type="radialBar"
						height={350}
					/>
				</CardBody>
			</Card>
		</>
	);
};

export default StudentDashboardContainer;
