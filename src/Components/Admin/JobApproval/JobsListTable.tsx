"use client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { approveJob, getAllJobs } from "@/app/api/admin/jobs";
import { toast } from "react-toastify";

// ---------------------------
// Interfaces for Type Safety
// ---------------------------
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

// ---------------------------
// Main Component
// ---------------------------
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
			// Replace with actual approve API call
			console.log("Approving job:", jobToApprove._id);
			const response = await approveJob(jobToApprove._id);
			toast.success(`Job "${jobToApprove.title}" approved`);
			setConfirmModalOpen(false);
			setJobToApprove(null);
			fetchData();
		} catch (error) {
			toast.error("Failed to approve job");
			console.error(error);
		}
	};

	const columns: TableColumn<Job>[] = [
		{ name: "Title", selector: (row) => row.title, sortable: true },
		{
			name: "Employer",
			selector: (row) => row.employer?.companyName || row.companyName || "-",
			sortable: true,
		},
		{ name: "Type", selector: (row) => row.jobType || "-", sortable: true },
		{ name: "Status", selector: (row) => row.status, sortable: true },
		{
			name: "Actions",
			cell: (row) => (
				<div className="d-flex gap-2">
					<Button
						color="secondary"
						size="sm"
						onClick={() => {
							setSelectedJob(row);
							setModalOpen(true);
						}}>
						View
					</Button>
					{row.status === "Pending" && (
						<Button
							color="success"
							size="sm"
							onClick={() => handleApproveClick(row)}>
							Approve
						</Button>
					)}
				</div>
			),
		},
	];

	return (
		<div className="container mt-4">
			<h2 className="mb-4">Job Listings</h2>

			<DataTable
				columns={columns}
				data={jobs}
				progressPending={loading}
				pagination
				responsive
				striped
				highlightOnHover
			/>

			{/* Job Details Modal */}
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				size="lg">
				<ModalHeader toggle={toggleModal}>Job Details</ModalHeader>
				<ModalBody>
					{selectedJob && (
						<div>
							<p>
								<strong>Title:</strong> {selectedJob.title}
							</p>
							<p>
								<strong>Description:</strong> {selectedJob.description}
							</p>
							<p>
								<strong>Company:</strong>{" "}
								{selectedJob.companyName || selectedJob.employer?.companyName}
							</p>
							<p>
								<strong>Location:</strong> {selectedJob.location || "-"}
							</p>
							<p>
								<strong>Job Type:</strong> {selectedJob.jobType}
							</p>
							<p>
								<strong>Experience:</strong>{" "}
								{selectedJob.experienceRequired || "-"}
							</p>
							<p>
								<strong>Salary:</strong> {selectedJob.salary || "-"}
							</p>
							<p>
								<strong>Deadline:</strong>{" "}
								{selectedJob.applicationDeadline
									? new Date(
											selectedJob.applicationDeadline
									  ).toLocaleDateString()
									: "-"}
							</p>
							<p>
								<strong>Skills:</strong>{" "}
								{selectedJob.skillsRequired?.length
									? selectedJob.skillsRequired.join(", ")
									: "N/A"}
							</p>
							<p>
								<strong>Openings:</strong> {selectedJob.openings}
							</p>
							<p>
								<strong>Status:</strong> {selectedJob.status}
							</p>
							<p>
								<strong>Posted On:</strong>{" "}
								{new Date(selectedJob.createdAt).toLocaleDateString()}
							</p>
						</div>
					)}
				</ModalBody>
			</Modal>

			{/* Approval Confirmation Modal */}
			<Modal
				isOpen={confirmModalOpen}
				toggle={toggleConfirmModal}>
				<ModalHeader toggle={toggleConfirmModal}>Confirm Approval</ModalHeader>
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
						color="success"
						onClick={confirmApprove}>
						Yes, Approve
					</Button>
					<Button
						color="secondary"
						onClick={toggleConfirmModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
