"use client";

import { getImageURL } from "@/CommonComponent/imageURL";
import Link from "next/link";
import { useState } from "react";
import {
	Badge,
	Button,
	ListGroup,
	ListGroupItem,
	Modal,
	ModalBody,
	ModalHeader,
} from "reactstrap";

const JobDetailsModal = ({
	selectedJob,
	modalOpen,
	setModalOpen,
}: {
	selectedJob: any;
	modalOpen: boolean;
	setModalOpen: (v: boolean) => void;
}) => {
	const toggleModal = () => setModalOpen(!modalOpen);

	const [appModalOpen, setAppModalOpen] = useState(false);
	const toggleAppModal = () => setAppModalOpen(!appModalOpen);

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

	return (
		<>
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
								{selectedJob?.skillsRequired?.map((skill: string, i: any) => (
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
								{new Date(selectedJob?.createdAt || "").toLocaleDateString()}
							</p>
						</div>
					</div>

					{selectedJob?.applicants?.length > 0 && (
						<div className='mt-4'>
							<Button
								color='primary'
								size='sm'
								onClick={toggleAppModal}>
								View Applicants ({selectedJob.applicants.length})
							</Button>
						</div>
					)}
				</ModalBody>
			</Modal>

			{/* Applicant Modal */}
			<Modal
				isOpen={appModalOpen}
				toggle={toggleAppModal}
				size='md'
				centered>
				<ModalHeader toggle={toggleAppModal}>
					Applicants for "{selectedJob?.title}"
				</ModalHeader>
				<ModalBody>
					{selectedJob?.applicants?.length > 0 ? (
						<ListGroup flush>
							{selectedJob.applicants.map((applicant: any, i: number) => (
								<ListGroupItem key={i}>
									<div className='d-flex justify-content-between align-items-center'>
										<Link href={`/admin/users/${applicant.student}`}>
											<span className='fw-bold'>{applicant.student}</span>
										</Link>
										<Badge
											color={
												applicant.status === "Pending"
													? "warning"
													: applicant.status === "Rejected"
													? "danger"
													: "success"
											}>
											{applicant.status}
										</Badge>
										{applicant.resume && (
											<a
												href={getImageURL(applicant.resume)}
												target='_blank'
												className='btn btn-sm btn-outline-primary'
												rel='noopener noreferrer'>
												View Resume
											</a>
										)}
									</div>
								</ListGroupItem>
							))}
						</ListGroup>
					) : (
						<p className='text-muted'>No applicants available.</p>
					)}
				</ModalBody>
			</Modal>
		</>
	);
};

export default JobDetailsModal;
