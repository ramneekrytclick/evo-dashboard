"use client";

import React, { useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Button,
	CardHeader,
	CardTitle,
	Spinner,
} from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminDashboardTitle, AdminTitle, DashboardTitle } from "@/Constant";
import { getPlatformAnalytics } from "@/app/api/admin/analytics";
import { toast } from "react-toastify";
import { getPendingApprovals } from "@/app/api/admin/team";
import { getAllTickets } from "@/app/api/support/support";
import { getAllJobs } from "@/app/api/admin/jobs";
import { getBlogs } from "@/app/api/admin/blogs/blog";
import Link from "next/link";
import CreateCategoryModal from "../Categories/CreateCategoryModal";
import CreateSubcategoryModal from "../SubCategories/CreateSubcategoryModal";
import CreateInterestFormModal from "../WannaBe/CreateInterestFormModal";
import { createWannaBeInterest } from "@/app/api/admin/wannabe";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";

// Define interfaces
interface Analytics {
	totalUsers: number;
	managers: number;
	mentors: number;
	students: number;
	courseCreators: number;
	employers: number;
}

interface ListItem {
	[key: string]: any;
}

const AdminDashboardContainer = () => {
	const [data, setData] = useState<Analytics | null>(null);
	const [loading, setLoading] = useState(true);
	const [userApprovals, setUserApprovals] = useState<ListItem[]>([]);
	const [tickets, setTickets] = useState<ListItem[]>([]);
	const [jobs, setJobs] = useState<ListItem[]>([]);
	const [blogs, setBlogs] = useState<ListItem[]>([]);
	const [wannaBeModal, setWannaBeModal] = useState(false);
	const navigation = useRouter();
	const toggleWannaBeModal = () => {
		setWannaBeModal(!wannaBeModal);
	};
	const handleWannaBeSubmit = async (formData: FormData): Promise<void> => {
		try {
			await createWannaBeInterest(formData);
			fetchData();
			toast.success("Created Successfully!");
		} catch (error: any) {
			console.error("Submission error:", error.message);
			toast.error("Failed to create Wanna Be Interest! Try Again!");
		}
	};
	const fetchData = async () => {
		setLoading(true);
		try {
			const [analytics, userData, ticketData, jobData, blogData] =
				await Promise.all([
					getPlatformAnalytics(),
					getPendingApprovals(),
					getAllTickets(),
					getAllJobs(),
					getBlogs(),
				]);
			setData(analytics);
			setUserApprovals(userData);
			setTickets(ticketData);
			setJobs(jobData.jobs);
			setBlogs(blogData.blogs);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load dashboard data. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const renderTable = (
		data: ListItem[],
		fields: string[],
		onRowClicked: (item: ListItem) => void
	) => {
		const columns = fields.map((field) => ({
			name: field,
			selector: (row: any) =>
				field.includes(".")
					? field.split(".").reduce((o, k) => o?.[k], row)
					: row[field],
			wrap: true,
		}));

		return (
			<DataTable
				columns={columns}
				data={data.slice(0, 9)}
				pagination={false}
				highlightOnHover
				dense
				onRowClicked={onRowClicked}
				customStyles={{
					headCells: {
						style: {
							fontSize: "20px",
							fontWeight: "bold",
						},
					},
					rows: {
						style: {
							fontSize: "15px",
							fontWeight: "normal",
						},
					},
					headRow: {
						style: {
							backgroundColor: "#f8f9fa",
						},
					},
					pagination: {
						style: {
							backgroundColor: "#f8f9fa",
							fontSize: "18px",
							fontWeight: "normal",
						},
					},
				}}
			/>
		);
	};
	const cardData = data
		? [
				{ amount: data.totalUsers, title: "Total Users", link: "/admin/team" },
				{ amount: data.managers, title: "Managers", link: "/admin/team" },
				{
					amount: data.mentors,
					title: "Mentors",
					link: "/admin/mentors",
				},
				{
					amount: data.students,
					title: "Students",
					link: "/admin/students",
				},
				{
					amount: data.courseCreators,
					title: "Course Creators",
					link: "/admin/team",
				},
				{
					amount: data.employers,
					title: "Employers",
					link: "/admin/employers",
				},
		  ]
		: [];

	return (
		<>
			<Breadcrumbs
				mainTitle={AdminDashboardTitle}
				parent={AdminTitle}
				title={DashboardTitle}
			/>

			<Container
				fluid
				className='admin-dashboard'>
				{loading ? (
					<div className='text-center py-5'>
						<Spinner color='primary' />
						<p className='mt-3'>Loading dashboard data...</p>
					</div>
				) : (
					<>
						{/* Action Bar */}
						<Row className='mb-4 bg-white p-4 card shadow-sm'>
							<Col className='mb-2 fw-bold'>Action Bar</Col>
							<div className='d-flex justify-content-between row place-items-center'>
								<Col
									className='my-2 w-full place-items-center text-center'
									xs={12}
									md={3}>
									<CreateCategoryModal fetchData={fetchData} />
								</Col>
								<Col
									className='my-2 w-full place-items-center text-center'
									xs={12}
									md={3}>
									<CreateSubcategoryModal fetchData={fetchData} />
								</Col>

								<Col
									className='my-2 w-full place-items-center text-center'
									xs={12}
									md={3}>
									<Button
										color='primary'
										className='me-2 px-2 w-full'
										onClick={toggleWannaBeModal}>
										<i className='fa fa-plus me-2 py-1' />
										Add Wanna Be Interests
									</Button>
									<CreateInterestFormModal
										modalOpen={wannaBeModal}
										toggleModal={toggleWannaBeModal}
										handleSubmit={handleWannaBeSubmit}
									/>
								</Col>
								<Col
									className='my-2 w-full place-items-center text-center'
									xs={12}
									md={3}>
									<Button
										className='w-full'
										color='primary'
										onClick={() => {
											navigation.push(`/admin/create-course`);
										}}>
										<i className='fa fa-plus me-2 py-1' />
										Add Course
									</Button>
								</Col>
							</div>
						</Row>
						{/* Stats */}
						<Row className='mb-1'>
							{cardData.map((item, index) => (
								<Col
									xs={6}
									md={4}
									lg={2}
									key={index}>
									<Link href={item.link}>
										<Card className='text-center shadow-sm border-0 p-3'>
											<h2
												className='text-dark mb-1'
												style={{ fontSize: "3rem" }}>
												{item.amount || "-"}
											</h2>
											<p className='text-muted mb-0 fs-6'>
												{item.title || "-"}
											</p>
										</Card>
									</Link>
								</Col>
							))}
						</Row>

						{/* Data Cards */}
						<Row>
							{[
								{
									title: "User Approvals",
									data: userApprovals,
									fields: ["name", "email", "role"],
									link: `/admin/pending`,
									onClick: (item: ListItem) => {
										navigation.push(`/admin/pending`);
									},
								},
								{
									title: "Support Tickets",
									data: tickets,
									fields: ["subject", "status"],
									link: `/admin/support/tickets`,
									onClick: (item: ListItem) => {
										navigation.push(`/admin/support/tickets`);
									},
								},
								{
									title: "Job Approvals",
									data: jobs,
									fields: ["title", "companyName", "status"],
									link: `/admin/job-approval`,
									onClick: (item: ListItem) => {
										navigation.push(`/admin/job-approval`);
									},
								},
								{
									title: "Blog Approvals",
									data: blogs,
									fields: ["title", "status"],
									link: `/admin/blog-approval`,
									onClick: (item: ListItem) => {
										navigation.push(`/admin/blog-approval`);
									},
								},
							].map(({ title, data, fields, link, onClick }, index) => (
								<Col
									md={6}
									xl={3}
									key={index}>
									<Card
										className='shadow-sm border-0'
										style={{ height: "30em", overflow: "hidden" }}>
										<CardHeader className='d-flex justify-content-between align-items-center'>
											<CardTitle
												tag='h6'
												className='fw-medium'>
												{title}
											</CardTitle>
											<Link href={link}>
												<Button
													size='sm'
													color='primary'
													outline>
													View All
												</Button>
											</Link>
										</CardHeader>
										<CardBody
											style={{
												overflow: "auto",
												height: "calc(100% - 4.5rem)",
											}}>
											{renderTable(data.reverse(), fields, onClick)}
										</CardBody>
									</Card>
								</Col>
							))}
						</Row>
					</>
				)}
			</Container>
		</>
	);
};

export default AdminDashboardContainer;
