"use client";

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { DashboardTitle, MentorTitle } from "@/Constant";
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Container,
	Row,
	Spinner,
	Button,
} from "reactstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	getBookedSessions,
	getMentorBatches,
	getSubmittedAssignments,
} from "@/app/api/mentor";
import { useAuth } from "@/app/AuthProvider";
import DataTable from "react-data-table-component";
import MyCardWithIcon from "@/CommonComponent/MyCards/MyCardWithIcon";

const MentorDashboardContainer = () => {
	const [sessions, setSessions] = useState<any[]>([]);
	const [assignments, setAssignments] = useState<any[]>([]);
	const [batches, setBatches] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	const fetchAll = async () => {
		try {
			const [sessionsData, assignmentsData, batchesData] = await Promise.all([
				getBookedSessions(user?.id || ""),
				getSubmittedAssignments(),
				getMentorBatches(),
			]);
			setSessions(sessionsData);
			setAssignments(assignmentsData);
			setBatches(batchesData.batches);
		} catch (error) {
			toast.error("Failed to load dashboard data.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user?.id) fetchAll();
	}, [user]);

	const sessionsTodayOrUpcoming = sessions.filter(
		(s) => new Date(s.date) >= new Date()
	);
	const pendingAssignments = assignments.filter(
		(a) => a.score === null || a.score === undefined
	);

	const sessionColumns = [
		{
			name: "Student",
			selector: (row: any) => row.student.name,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row: any) => row.student.email,
			sortable: true,
		},
		{
			name: "Date",
			selector: (row: any) => new Date(row.date).toLocaleDateString(),
		},
		{ name: "Time", selector: (row: any) => row.timeSlot },
		{ name: "Status", selector: (row: any) => row.status },
	];

	const assignmentColumns = [
		{
			name: "Student",
			selector: (row: any) => row.student.name,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row: any) => row.student.email,
			sortable: true,
		},
		{ name: "Score", selector: (row: any) => row.score ?? "Not Graded" },
	];
	const cardData = [
		{
			amount: batches.length,
			title: "Total Batches",
			link: "/mentor/batches",
			icon: "customers",
			color: "primary",
		},
		{
			amount: pendingAssignments.length,
			title: "Pending Assignments",
			link: "/mentor/assignments",
			icon: "user-visitor",
			color: "danger",
			divClass: "up-sales",
		},
		{
			amount: sessionsTodayOrUpcoming.length,
			title: "Upcoming Sessions",
			link: "/mentor/schedule-session",
			icon: "bag",
			color: "info",
			divClass: "total-product",
		},
	];
	return (
		<>
			<Breadcrumbs
				mainTitle={DashboardTitle}
				parent={MentorTitle}
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
						<Row className='mb-4 general-widget'>
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

						<Row>
							<Col
								md={6}
								className='mb-4'>
								<Card className='shadow-sm border-0 h-100'>
									<CardHeader className='d-flex justify-content-between align-items-center'>
										<CardTitle tag='h5'>Scheduled Sessions</CardTitle>
										<Link href='/mentor/schedule-session'>
											<Button
												size='sm'
												color='primary'
												outline>
												View All
											</Button>
										</Link>
									</CardHeader>
									<CardBody style={{ maxHeight: "400px", overflowY: "auto" }}>
										<DataTable
											columns={sessionColumns}
											data={sessionsTodayOrUpcoming.slice(0, 5)}
											pagination={false}
											dense
											striped
										/>
									</CardBody>
								</Card>
							</Col>

							<Col
								md={6}
								className='mb-4'>
								<Card className='shadow-sm border-0 h-100'>
									<CardHeader className='d-flex justify-content-between align-items-center'>
										<CardTitle tag='h5'>Pending Assignments</CardTitle>
										<Link href='/mentor/assignments'>
											<Button
												size='sm'
												color='primary'
												outline>
												View All
											</Button>
										</Link>
									</CardHeader>
									<CardBody style={{ maxHeight: "400px", overflowY: "auto" }}>
										<DataTable
											columns={assignmentColumns}
											data={pendingAssignments.slice(0, 5)}
											pagination={false}
											dense
											striped
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</>
	);
};

export default MentorDashboardContainer;
