import { useState } from "react";
import { Badge, Modal, ModalBody, ModalHeader } from "reactstrap";

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
								? new Date(selectedJob.applicationDeadline).toLocaleDateString()
								: "-"}
						</p>
						<p className='mb-1'>
							<strong>Openings:</strong> {selectedJob?.openings || "-"}
						</p>
					</div>
					<div className='col-md-6'>
						<p className='mb-1'>
							<strong>Status:</strong> {statusBadge(selectedJob?.status || "-")}
						</p>
						<p className='mb-1'>
							<strong>Posted On:</strong>{" "}
							{new Date(selectedJob?.createdAt || "").toLocaleDateString()}
						</p>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default JobDetailsModal;
