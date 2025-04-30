"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminDashboardTitle, AdminTitle, DashboardTitle } from "@/Constant";
import { getPlatformAnalytics } from "@/app/api/admin/analytics";
import { toast } from "react-toastify";
import { getPendingApprovals } from "@/app/api/admin/team";
import { getAllTickets } from "@/app/api/support/support";
import { getAllJobs } from "@/app/api/admin/jobs";
import { getBlogs } from "@/app/api/admin/blogs/blog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import MyCardWithIcon from "@/CommonComponent/MyCards/MyCardWithIcon";
import QuickActions from "./QuickActions";
import { getTransactions } from "@/app/api/admin/transactions";
import Transactions from "./Transactions";
import { getAllCategories, getAllCourses } from "@/app/api/cc";
import Tables from "./Tables";
import ItemDetailsModal from "./ItemDetailsModal";
import AdminTicketModal from "@/Components/Support/AdminTicketModal";
import JobDetailsModal from "../JobApproval/JobDetailsModal";

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
	const [transactionData, setTransactionData] = useState<any>();
	const [coursesData, setCoursesData] = useState<any>();
	const [categories, setCategories] = useState<any>();
	const navigation = useRouter();
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [modalTitle, setModalTitle] = useState<string>("");
	const [ticketModal, setTicketModal] = useState(false);
	const fetchData = async () => {
		setLoading(true);
		try {
			const [
				analytics,
				userData,
				ticketData,
				jobData,
				blogData,
				transactions,
				courses,
				category,
			] = await Promise.all([
				getPlatformAnalytics(),
				getPendingApprovals(),
				getAllTickets(),
				getAllJobs(),
				getBlogs(),
				getTransactions(),
				getAllCourses(),
				getAllCategories(),
			]);
			setData(analytics);
			setUserApprovals(userData);
			setTickets(ticketData);
			setJobs(jobData.jobs);
			setBlogs(blogData.blogs);
			setTransactionData(transactions.transactions.reverse());
			setCoursesData(courses.courses);
			setCategories(category.categories);
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
		fields: any[],
		onRowClicked: (item: ListItem) => void
	) => {
		const columns = fields.map((field: any) => {
			let label = field;
			let path = field;

			if (typeof field === "object") {
				label = field.label;
				path = field.path;
			}

			return {
				name: label,
				selector: (row: any) =>
					path.includes(".")
						? path.split(".").reduce((o: any, k: any) => o?.[k], row)
						: row[path],
				center: true,
			};
		});

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
						style: { fontSize: "20px", fontWeight: "bold" },
					},
					rows: {
						style: { fontSize: "15px", fontWeight: "normal" },
					},
					headRow: {
						style: { backgroundColor: "#f8f9fa" },
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
	const tables = [
		{
			title: "New User Approvals",
			data: userApprovals || [],
			fields: [
				{ label: "Name", path: "name" },
				{ label: "Email", path: "email" },
				{ label: "Role", path: "role" },
			],
			link: `/admin/pending`,
			onClick: (item: ListItem) => {
				navigation.push(`/admin/users/${item._id}`);
			},
		},
		{
			title: "Support Tickets",
			data: tickets || [],
			fields: [
				{ label: "Subject", path: "subject" },
				{ label: "Status", path: "status" },
			],
			link: `/admin/support/tickets`,
			onClick: (item: ListItem) => {
				setTicketModal(true);
				setSelectedItem(item);
			},
		},
		{
			title: "Job Approvals",
			data: jobs || [],
			fields: [
				{ label: "Title", path: "title" },
				{ label: "Company Name", path: "companyName" },
				{ label: "Status", path: "status" },
			],
			link: `/admin/job-approval`,
			onClick: (item: ListItem) => {
				setSelectedItem(item);
				setModalTitle("Job Approval");
				setModalOpen(true);
			},
		},
		{
			title: "Blog Approvals",
			data: blogs || [],
			fields: [
				{ label: "SLug", path: "slug" },
				{ label: "Title", path: "title" },
				{ label: "Status", path: "status" },
			],
			link: `/admin/blog-approval`,
			onClick: (item: ListItem) => {
				navigation.push(`/admin/blogs/${item.slug}`);
			},
		},
	];
	const cardData = data
		? [
				{
					amount: data.totalUsers,
					title: "All Users",
					link: "/admin/team",
					icon: "customers",
					color: "primary",
				},
				{
					amount: data.managers,
					title: "Managers",
					link: "/admin/team",
					icon: "user-visitor",
					color: "danger",
					divClass: "up-sales",
				},
				{
					amount: data.mentors,
					title: "Mentors",
					link: "/admin/mentors",
					icon: "bag",
					color: "info",
					divClass: "total-product",
				},
				{
					amount: data.students,
					title: "Students",
					link: "/admin/students",
					icon: "Customer",
					color: "success",
					divClass: "total-customer",
				},
				{
					amount: data.courseCreators,
					title: "Creators",
					link: "/admin/team",
					icon: "pencil",
					color: "info",
					divClass: "total-product",
				},
				{
					amount: data.employers,
					title: "Employers",
					link: "/admin/employers",
					icon: "work",
					color: "danger",
					divClass: "up-sales",
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
				className='ecommerce-dashboard'>
				{loading ? (
					<div className='text-center py-5'>
						<Spinner color='primary' />
						<p className='mt-3'>Loading dashboard data...</p>
					</div>
				) : (
					<>
						<Row className='mb-4'>
							{/* Left: Action Bar */}
							<Col
								xs={12}
								lg={5}
								className='mb-4 mb-lg-0'>
								<QuickActions fetchData={fetchData} />
							</Col>

							{/* Right: Stats */}
							<Col
								xs={12}
								lg={7}>
								<Row className='general-widget g-3'>
									{cardData.map((item, index) => (
										<Col
											xs={6}
											md={4}
											key={index}>
											<Link href={item.link}>
												<MyCardWithIcon
													icon={item.icon}
													title={item.title}
													amount={item.amount}
													color={item.color}
													link={item.link}
													divClass={item.divClass}
												/>
											</Link>
										</Col>
									))}
								</Row>
							</Col>
						</Row>
						{/* Data Cards */}
						<Row className='h-100 general-widget'>
							<Transactions
								transactionsData={transactionData}
								coursesData={coursesData}
								category={categories}
							/>
							<Tables
								tables={tables}
								renderTable={renderTable}
							/>
							{selectedItem && (
								<AdminTicketModal
									modalOpen={ticketModal}
									toggleModal={() => setTicketModal(!ticketModal)}
									selectedRow={selectedItem}
									fetchTickets={fetchData}
								/>
							)}
							{modalOpen && selectedItem && (
								<JobDetailsModal
									modalOpen={modalOpen}
									setModalOpen={setModalOpen}
									selectedJob={selectedItem}
								/>
							)}
						</Row>
					</>
				)}
			</Container>
		</>
	);
};

export default AdminDashboardContainer;
