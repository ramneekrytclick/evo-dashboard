"use client";

import { useEffect, useState } from "react";
import { getSubmittedAssignments } from "@/app/api/mentor";
import DataTable from "react-data-table-component";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AssignmentList = () => {
	const [assignments, setAssignments] = useState<any[]>([]);
	const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchAssignments = async () => {
		try {
			const response = await getSubmittedAssignments();
			setAssignments(response);
		} catch (error) {
			console.error("Error fetching assignments:", error);
		}
	};

	useEffect(() => {
		fetchAssignments();
	}, []);

	const handleViewSubmission = (submission: any) => {
		setSelectedSubmission(submission);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedSubmission(null);
	};

	const columns = [
		{
			name: "Student Name",
			selector: (row: any) => row.student.name,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row: any) => row.student.email,
			sortable: true,
		},
		{
			name: "Submission",
			cell: (row: any) => (
				<Button
					color="primary"
					onClick={() => handleViewSubmission(row)}>
					View Submission
				</Button>
			),
		},
	];

	return (
		<div className="p-4">
			<h2 className="text-xl font-semibold mb-4">Submitted Assignments</h2>
			<DataTable
				columns={columns}
				data={assignments}
				pagination
			/>

			<Modal
				isOpen={isModalOpen}
				toggle={closeModal}
				size="lg">
				<ModalHeader toggle={closeModal}>Submission Details</ModalHeader>
				<ModalBody>
					{selectedSubmission && (
						<div className="space-y-3">
							<p>
								<strong>Student:</strong> {selectedSubmission.student.name}
							</p>
							<p>
								<strong>Email:</strong> {selectedSubmission.student.email}
							</p>
							<iframe
								src={`/${selectedSubmission.fileUrl}`}
								className="w-100"
								style={{
									height: "400px",
									border: "1px solid #ccc",
									borderRadius: "4px",
								}}></iframe>
						</div>
					)}
				</ModalBody>
				<ModalFooter>
					{selectedSubmission && (
						<a
							href={`/${selectedSubmission.fileUrl}`}
							download
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-success">
							Download File
						</a>
					)}
					<Button
						color="secondary"
						onClick={closeModal}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AssignmentList;
