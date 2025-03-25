"use client";

import { useEffect, useState } from "react";
import { getSubmittedAssignments, gradeAssignment } from "@/app/api/mentor";
import DataTable from "react-data-table-component";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
	FormGroup,
} from "reactstrap";
import { toast } from "react-toastify";

const AssignmentList = () => {
	const [assignments, setAssignments] = useState<any[]>([]);
	const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
	const [score, setScore] = useState<number>(0);
	const [feedback, setFeedback] = useState<string>("");

	const fetchAssignments = async () => {
		try {
			const response = await getSubmittedAssignments();
			console.log("====================================");
			console.log(response);
			console.log("====================================");
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

	const handleGradeClick = (submission: any) => {
		setSelectedSubmission(submission);
		setScore(0);
		setFeedback("");
		setIsGradeModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedSubmission(null);
	};

	const closeGradeModal = () => {
		setIsGradeModalOpen(false);
		setSelectedSubmission(null);
	};

	const handleGradeSubmit = async () => {
		try {
			await gradeAssignment({
				assignmentId: selectedSubmission._id,
				score,
				feedback,
			});
			toast.success("Assignment graded successfully!");
			closeGradeModal();
			fetchAssignments(); // Refresh
		} catch (error) {
			console.error("Error grading assignment:", error);
			toast.error("Failed to grade assignment.");
		}
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
		{
			name: "Grade",
			cell: (row: any) =>
				row.score ? (
					<h3 className="fw-100">{row.score}</h3>
				) : (
					<Button
						color="success"
						onClick={() => handleGradeClick(row)}>
						Give Grade
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

			{/* Submission View Modal */}
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

			{/* Grade Assignment Modal */}
			<Modal
				isOpen={isGradeModalOpen}
				toggle={closeGradeModal}>
				<ModalHeader toggle={closeGradeModal}>Grade Assignment</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label for="score">Score (out of 100)</Label>
						<Input
							type="number"
							id="score"
							value={score}
							min={0}
							max={100}
							onChange={(e) => setScore(Number(e.target.value))}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="feedback">Feedback</Label>
						<Input
							type="textarea"
							id="feedback"
							value={feedback}
							rows={4}
							onChange={(e) => setFeedback(e.target.value)}
						/>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button
						color="success"
						onClick={handleGradeSubmit}>
						Submit Grade
					</Button>
					<Button
						color="secondary"
						onClick={closeGradeModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AssignmentList;
