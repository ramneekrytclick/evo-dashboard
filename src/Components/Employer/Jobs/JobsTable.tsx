"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getJobs } from "@/app/api/employer";
import {
	Container,
	Card,
	CardBody,
	Button,
	Row,
	Col,
	Collapse,
	Badge,
} from "reactstrap";
import { toast } from "react-toastify";
import DataTable, { TableColumn } from "react-data-table-component";
import { Eye, EyeOff } from "react-feather";
import ApplicantDetailsModal from "./ApplicantDetailsModal";

const JobApplicationsTable = () => {
	const [jobs, setJobs] = useState<any[]>([]);
	const [openJobId, setOpenJobId] = useState<string | null>(null);
	const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const openApplicantModal = (id: string) => {
		setSelectedApplicantId(id);
		setIsModalOpen(true);
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	const renderApplicantTable = (applicants: string[]) => {
		const columns: TableColumn<any>[] = [
			{
				name: "#",
				selector: (_: any, index?: number) =>
					index !== undefined ? index + 1 : 0,
				width: "60px",
			},
			{
				name: "Applicant ID",
				selector: (row: string) => row,
				sortable: true,
				cell: (row) => (
					<Button
						color="link"
						onClick={() => openApplicantModal(row)}>
						{row}
					</Button>
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
				className="overflow-auto"
				style={{ maxHeight: "80vh" }}>
				{jobs.length === 0 ? (
					<p>No jobs posted yet.</p>
				) : (
					jobs.map((job) => (
						<Card
							key={job._id}
							className="mb-3 shadow-sm border-0">
							<CardBody>
								<Row>
									<Col md={9}>
										<h5 className="text-primary">{job.title}</h5>
										<Row>
											<Col sm={6}>
												<p>
													<strong>Company:</strong> {job.companyName || "N/A"}
												</p>
												<p>
													<strong>Location:</strong> {job.location || "Remote"}
												</p>
												<p>
													<strong>Type:</strong>{" "}
													<Badge color="info">{job.jobType || "N/A"}</Badge>
												</p>
												<p>
													<strong>Experience:</strong> {job.experienceRequired}
												</p>
											</Col>
											<Col sm={6}>
												<p>
													<strong>Skills:</strong>{" "}
													{job.skillsRequired?.length > 0
														? job.skillsRequired.map(
																(skill: string, index: number) => (
																	<Badge
																		key={index}
																		color="secondary"
																		className="me-1">
																		{skill}
																	</Badge>
																)
														  )
														: "Not specified"}
												</p>
												<p>
													<strong>Salary:</strong> {job.salary || "N/A"}
												</p>
												<p>
													<strong>Openings:</strong> {job.openings}
												</p>
												<p>
													<strong>Status:</strong>{" "}
													<Badge
														color={
															job.status === "Approved" ? "success" : "warning"
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

									<Col
										md={3}
										className="d-flex align-items-center justify-content-end">
										<Button
											color="primary"
											size="sm"
											onClick={() => toggleApplications(job._id)}>
											{openJobId === job._id ? (
												<EyeOff size={16} />
											) : (
												<Eye size={16} />
											)}{" "}
											{openJobId === job._id ? "Hide" : "View"} Applications
										</Button>
									</Col>
								</Row>

								<Collapse
									isOpen={openJobId === job._id}
									className="mt-3">
									<h6>Applicants</h6>
									{job.applicants && job.applicants.length > 0 ? (
										renderApplicantTable(job.applicants)
									) : (
										<p className="text-muted">No applicants yet.</p>
									)}
								</Collapse>
							</CardBody>
						</Card>
					))
				)}
			</div>

			{/* Applicant Details Modal */}
			<ApplicantDetailsModal
				isOpen={isModalOpen}
				toggle={() => setIsModalOpen(false)}
				studentId={selectedApplicantId || ""}
			/>
		</Container>
	);
};

export default JobApplicationsTable;
