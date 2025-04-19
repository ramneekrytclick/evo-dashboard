"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getJobs } from "@/app/api/employer";
import UpdateJobModal from "./UpdateJobModal";
import { deleteJob } from "@/app/api/employer";
import {
	Container,
	Card,
	CardBody,
	Button,
	Row,
	Col,
	Collapse,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import { toast } from "react-toastify";
import DataTable, { TableColumn } from "react-data-table-component";
import { Eye, EyeOff } from "react-feather";
import ApplicantDetailsModal from "./ApplicantDetailsModal";
import { getImageURL } from "@/CommonComponent/imageURL";
const JobApplicationsTable = () => {
	const [jobs, setJobs] = useState<any[]>([]);
	const [openJobId, setOpenJobId] = useState<string | null>(null);
	const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
		null
	);
	const [selectedResume, setSelectedResume] = useState<string | null>(null);
	const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [jobToEdit, setJobToEdit] = useState<any>(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [jobToDelete, setJobToDelete] = useState<any>(null);
	const fetchJobs = async () => {
		try {
			const response = await getJobs();
			setJobs(response);
		} catch (error) {
			toast.error("Error fetching jobs");
		}
	};

	const toggleApplications = (jobId: string) => {
		setOpenJobId(openJobId === jobId ? null : jobId);
	};

	const openApplicantModal = (
		jobId: string,
		studentId: string,
		resume: string | null
	) => {
		setSelectedJobId(jobId);
		setSelectedApplicantId(studentId);
		setSelectedResume(resume);
		setIsModalOpen(true);
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	const renderApplicantTable = (applicants: any[], jobId: string) => {
		const columns: TableColumn<any>[] = [
			{
				name: "#",
				selector: (_: any, index?: number) =>
					index !== undefined ? index + 1 : 0,
				width: "60px",
			},
			{
				name: "Applicant ID",
				selector: (row: any) => row.student,
				cell: (row: any) => (
					<Button
						color='link'
						onClick={() => openApplicantModal(jobId, row.student, row.resume)}>
						{row.student}
					</Button>
				),
			},
			{
				name: "Resume",
				selector: (row: any) => row.resume || "-",
				cell: (row: any) =>
					row.resume ? (
						<a
							href={getImageURL(row.resume)}
							target='_blank'
							rel='noopener noreferrer'>
							Download
						</a>
					) : (
						<span className='text-muted'>No resume</span>
					),
			},
			{
				name: "Status",
				selector: (row: any) => row.status,
				cell: (row: any) => (
					<Badge color={row.status === "Pending" ? "warning" : "success"}>
						{row.status}
					</Badge>
				),
			},
		];

		return (
			<DataTable
				columns={columns}
				data={applicants}
				noHeader
				pagination
				striped
				responsive
				dense
			/>
		);
	};

	return (
		<Container fluid>
			<div
				className='overflow-auto'
				style={{ maxHeight: "80vh" }}>
				{jobs.length === 0 ? (
					<p>No jobs posted yet.</p>
				) : (
					jobs.map((job) => (
						<Card
							key={job._id}
							className='mb-3 shadow-sm border-0'>
							<CardBody className='px-4 py-3'>
								<Row className='mb-3'>
									<Col>
										<h4 className='text-primary fw-semibold mb-2'>
											{job.title}
										</h4>
										<hr />
										<Row className='text-dark fs-6'>
											<Col md={6}>
												<p>
													<strong>Company:</strong> {job.companyName || "N/A"}
												</p>
												<p>
													<strong>Location:</strong> {job.location || "Remote"}
												</p>
												<p>
													<strong>Type:</strong>{" "}
													<Badge
														color='info'
														className='text-uppercase'>
														{job.jobType || "N/A"}
													</Badge>
												</p>
												<p>
													<strong>Experience:</strong> {job.experienceRequired}
												</p>
												<p>
													<strong>Openings:</strong> {job.openings}
												</p>
											</Col>
											<Col md={6}>
												<p>
													<strong>Skills Required:</strong>
												</p>
												{job.skillsRequired?.length > 0 ? (
													<div className='d-flex flex-wrap gap-1 mb-2'>
														{job.skillsRequired.map(
															(skill: string, idx: number) => (
																<Badge
																	key={idx}
																	color='secondary'>
																	{skill}
																</Badge>
															)
														)}
													</div>
												) : (
													<p className='text-muted'>Not specified</p>
												)}
												<p>
													<strong>Salary:</strong> {job.salary || "N/A"}
												</p>
												<p>
													<strong>Status:</strong>{" "}
													<Badge
														color={
															job.status === "Pending"
																? "warning"
																: job.status === "Approved"
																? "success"
																: "danger"
														}>
														{job.status}
													</Badge>
												</p>
												<p>
													<strong>Applicants:</strong>{" "}
													{job.applicants?.length || 0}
												</p>
											</Col>
										</Row>
									</Col>
								</Row>

								<Row className='mt-3'>
									<Col className='d-flex flex-wrap justify-content-end gap-2'>
										<Button
											color='primary'
											onClick={() => toggleApplications(job._id)}>
											{openJobId === job._id ? (
												<EyeOff size={16} />
											) : (
												<Eye size={16} />
											)}{" "}
											{openJobId === job._id ? "Hide" : "View"} Applications
										</Button>
										<Button
											color='warning'
											onClick={() => {
												setJobToEdit(job);
												setUpdateModalOpen(true);
											}}>
											Update
										</Button>
										<Button
											color='danger'
											onClick={() => {
												setJobToDelete(job);
												setDeleteModalOpen(true);
											}}>
											Delete
										</Button>
									</Col>
								</Row>

								<Collapse
									isOpen={openJobId === job._id}
									className='mt-4'>
									<h6 className='fw-bold'>Applicants</h6>
									{job.applicants && job.applicants.length > 0 ? (
										renderApplicantTable(job.applicants, job._id)
									) : (
										<p className='text-muted'>No applicants yet.</p>
									)}
								</Collapse>
							</CardBody>
						</Card>
					))
				)}
			</div>
			<Modal
				isOpen={deleteModalOpen}
				toggle={() => setDeleteModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setDeleteModalOpen(false)}>
					Confirm Delete
				</ModalHeader>
				<ModalBody>
					Are you sure you want to delete the job{" "}
					<strong>{jobToDelete?.title}</strong>?
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
						onClick={() => setDeleteModalOpen(false)}>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={async () => {
							try {
								await deleteJob(jobToDelete._id);
								toast.success("Job deleted successfully");
								setDeleteModalOpen(false);
								fetchJobs();
							} catch (err) {
								toast.error("Failed to delete job");
							}
						}}>
						Delete
					</Button>
				</ModalFooter>
			</Modal>
			<UpdateJobModal
				isOpen={updateModalOpen}
				toggle={() => setUpdateModalOpen(false)}
				job={jobToEdit}
				refresh={fetchJobs}
			/>
			<ApplicantDetailsModal
				isOpen={isModalOpen}
				toggle={() => {
					setIsModalOpen(false);
					fetchJobs();
				}}
				jobId={selectedJobId || ""}
				studentId={selectedApplicantId || ""}
				resume={selectedResume}
				currentStatus='Accepted'
			/>
		</Container>
	);
};

export default JobApplicationsTable;
