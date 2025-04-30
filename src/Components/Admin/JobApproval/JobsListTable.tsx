"use client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Card,
	CardBody,
	Badge,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { approveJob, getAllJobs } from "@/app/api/admin/jobs";
import { toast } from "react-toastify";
import Link from "next/link";
import { customTableStyles } from "../Batches/BatchesList";

interface Employer {
	_id: string;
	name: string;
	email: string;
	companyName: string;
}

interface Job {
	_id: string;
	title: string;
	description: string;
	employer?: Employer;
	companyName?: string;
	location?: string;
	jobType?: string;
	experienceRequired?: string;
	salary?: string;
	applicationDeadline?: string;
	skillsRequired?: string[];
	openings: number;
	status: "Pending" | "Approved" | "Rejected" | string;
	createdAt: string;
}

export default function JobTable(): JSX.Element {
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [jobToApprove, setJobToApprove] = useState<Job | null>(null);
	const [jobs, setJobs] = useState<Job[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getAllJobs();
			setJobs(response.jobs || []);
		} catch (error) {
			toast.error("Error fetching Jobs");
			console.error(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const toggleModal = () => setModalOpen(!modalOpen);
	const toggleConfirmModal = () => setConfirmModalOpen(!confirmModalOpen);

	const handleApproveClick = (job: Job) => {
		setJobToApprove(job);
		setConfirmModalOpen(true);
	};

	const confirmApprove = async () => {
		if (!jobToApprove) return;
		try {
			await approveJob(jobToApprove._id);
			toast.success(`Job "${jobToApprove.title}" approved`);
			setConfirmModalOpen(false);
			setJobToApprove(null);
			fetchData();
		} catch (error) {
			toast.error("Failed to approve job");
			console.error(error);
		}
	};

	const statusBadge = (status: string) => {
		switch (status) {
			case "Approved":
				return <Badge color='success'>Approved</Badge>;
			case "Rejected":
				return <Badge color='danger'>Rejected</Badge>;
			case "Pending":
			default:
				return <Badge color='warning'>Pending</Badge>;
		}
	};

	const columns: TableColumn<Job>[] = [
		{ name: "Title", selector: (row) => row.title, sortable: true },
		{
			name: "Employer",
			selector: (row) => row.employer?.companyName || row.companyName || "-",
			sortable: true,
			center: true,
			cell: (row) => (
				<Link href={`/admin/users/${row.employer?._id}`}>
					{row.employer?.name || "-"}
				</Link>
			),
		},
		{ name: "Type", selector: (row) => row.jobType || "-", sortable: true },
		{
			name: "Status",
			selector: (row) => row.status,
			cell: (row) => statusBadge(row.status),
			center: true,

			sortable: true,
		},
		{
			name: "Actions",
			center: true,

			cell: (row) => (
				<div className='d-flex gap-2'>
					<Button
						color='outline-success'
						size='sm'
						onClick={() => {
							setSelectedJob(row);
							setModalOpen(true);
						}}>
						<i className='fa fa-eye me-1' /> View
					</Button>
					{row.status === "Pending" && (
						<Button
							color='success'
							size='sm'
							onClick={() => handleApproveClick(row)}>
							<i className='fa fa-check me-1' /> Approve
						</Button>
					)}
				</div>
			),
		},
	];

	return (
		<>
			<Card>
				<CardBody>
					<DataTable
						columns={columns}
						data={jobs}
						progressPending={loading}
						pagination
						responsive
						striped
						highlightOnHover
						customStyles={customTableStyles}
					/>

					{/* Job Details Modal */}
					<Modal
						isOpen={modalOpen}
						toggle={toggleModal}
						size='lg'>
						<ModalHeader
							toggle={toggleModal}
							className='fw-bold'>
							Job Details
						</ModalHeader>
						<ModalBody className='px-4 pt-3 pb-4'>
							<h4 className='fw-bold'>
								{selectedJob?.title} @{" "}
								{selectedJob?.companyName || selectedJob?.employer?.companyName}
							</h4>
							<p className='text-muted mb-2'>
								{selectedJob?.location || "-"} | {selectedJob?.jobType}
							</p>

							<hr />

							{/* Job Description */}
							<h6 className='fw-bold mb-2'>Job Description</h6>
							<p>{selectedJob?.description || "No description provided."}</p>

							{/* Skills */}
							{(selectedJob?.skillsRequired ?? []).length > 0 && (
								<>
									<h6 className='fw-bold mt-4 mb-2'>Skills Required</h6>
									<div className='d-flex flex-wrap gap-2'>
										{selectedJob?.skillsRequired?.map((skill, i) => (
											<Badge
												key={i}
												color='primary'
												className='px-3 py-2 rounded-pill fw-medium'
												style={{
													backgroundColor: "#3b82f6",
													fontSize: "0.85rem",
												}}>
												{skill}
											</Badge>
										))}
									</div>
								</>
							)}

							{/* Other Details */}
							<h6 className='fw-bold mt-4 mb-2'>Other Details</h6>
							<div className='row'>
								<div className='col-md-6'>
									<p className='mb-1'>
										<strong>Experience Required:</strong>{" "}
										{selectedJob?.experienceRequired || "-"}
									</p>
									<p className='mb-1'>
										<strong>Salary:</strong> {selectedJob?.salary || "-"}
									</p>
									<p className='mb-1'>
										<strong>Application Deadline:</strong>{" "}
										{selectedJob?.applicationDeadline
											? new Date(
													selectedJob.applicationDeadline
											  ).toLocaleDateString()
											: "-"}
									</p>
									<p className='mb-1'>
										<strong>Openings:</strong> {selectedJob?.openings || "-"}
									</p>
								</div>
								<div className='col-md-6'>
									<p className='mb-1'>
										<strong>Status:</strong>{" "}
										{statusBadge(selectedJob?.status || "-")}
									</p>
									<p className='mb-1'>
										<strong>Posted On:</strong>{" "}
										{new Date(
											selectedJob?.createdAt || ""
										).toLocaleDateString()}
									</p>
								</div>
							</div>
						</ModalBody>
					</Modal>

					{/* Approval Confirmation Modal */}
					<Modal
						isOpen={confirmModalOpen}
						toggle={toggleConfirmModal}
						centered>
						<ModalHeader
							toggle={toggleConfirmModal}
							className='fw-bold'>
							Confirm Approval
						</ModalHeader>
						<ModalBody>
							{jobToApprove && (
								<p>
									Are you sure you want to approve{" "}
									<strong>{jobToApprove.title}</strong>?
								</p>
							)}
						</ModalBody>
						<ModalFooter>
							<Button
								color='success'
								onClick={confirmApprove}>
								Yes, Approve
							</Button>
							<Button
								color='outline-success'
								onClick={toggleConfirmModal}>
								Cancel
							</Button>
						</ModalFooter>
					</Modal>
				</CardBody>
			</Card>
		</>
	);
}
