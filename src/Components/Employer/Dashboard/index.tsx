"use client";
import { getJobs } from "@/app/api/employer";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { DashboardTitle, EmployerTitle } from "@/Constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Button,
	Spinner,
} from "reactstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EmployerDashboardContainer = () => {
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const fetchJobs = async () => {
		try {
			const response = await getJobs();
			setJobs(response);
		} catch (error) {
			toast.error("Error fetching jobs");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	const stats = [
		{ title: "Total Jobs", value: jobs.length },
		{
			title: "Jobs Approved By Admin",
			value: jobs.filter((j) => j.status === "Approved").length,
		},
		{
			title: "Jobs Pending Admin Approval",
			value: jobs.filter((j) => j.status === "Pending").length,
		},
		{
			title: "Total Applicants",
			value: jobs.reduce((acc, j) => acc + (j.applicants?.length || 0), 0),
		},
	];

	return (
		<>
			<Breadcrumbs
				mainTitle={DashboardTitle}
				parent={EmployerTitle}
				title={DashboardTitle}
			/>

			<Container
				fluid
				className='admin-dashboard'>
				{loading ? (
					<div className='text-center py-5'>
						<Spinner color='primary' />
						<p className='mt-3'>Loading job stats...</p>
					</div>
				) : (
					<>
						{/* Stats */}
						<Row className='mb-4'>
							{stats.map((item, index) => (
								<Col
									xs={6}
									md={3}
									key={index}>
									<Link href={"/employer/jobs"}>
										<Card className='text-center shadow-sm border-0 p-3'>
											<h2
												className='text-dark mb-1'
												style={{ fontSize: "2rem" }}>
												{item.value}
											</h2>
											<p className='text-muted mb-0'>{item.title}</p>
										</Card>
									</Link>
								</Col>
							))}
						</Row>

						{/* Action Bar */}
						<Row className='mb-4 bg-white p-4 rounded shadow-sm'>
							<Col className='mb-2 fw-bold'>Action Bar</Col>
							<Col xs={12}>
								<div className='d-flex flex-wrap gap-3 w-100'>
									<Button
										color='primary'
										onClick={() => router.push("/employer/jobs/create")}>
										<i className='fa fa-plus me-2 py-1' /> Post New Job
									</Button>
								</div>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</>
	);
};

export default EmployerDashboardContainer;
