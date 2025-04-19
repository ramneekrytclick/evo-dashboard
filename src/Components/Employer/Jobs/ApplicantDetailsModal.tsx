"use client";

import { useEffect, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	Spinner,
	Alert,
	Badge,
	Row,
	Col,
	Card,
	CardBody,
	ListGroup,
	ListGroupItem,
	Input,
	Button,
	Progress,
} from "reactstrap";
import { toast } from "react-toastify";
import {
	getStudentDetailsById,
	updateApplicationStatus,
} from "@/app/api/employer";
import { getAllCourses } from "@/app/api/cc";
import { getImageURL } from "@/CommonComponent/imageURL";

const ApplicantDetailsModal = ({
	isOpen,
	toggle,
	studentId,
	resume,
	jobId,
	currentStatus,
	onStatusUpdate,
}: {
	isOpen: boolean;
	toggle: () => void;
	studentId: string;
	resume: string | null;
	jobId: string;
	currentStatus: "Accepted" | "Rejected" | "Pending";
	onStatusUpdate?: () => void;
}) => {
	const [student, setStudent] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [courses, setCourses] = useState<any[]>([]);
	const [newStatus, setNewStatus] = useState(currentStatus);
	const [updating, setUpdating] = useState(false);

	const fetchDetails = async () => {
		try {
			const response = await getStudentDetailsById(studentId);
			setStudent(response);
			const courseRes = await getAllCourses();
			setCourses(courseRes.courses);
		} catch (error) {
			setError("Error fetching student details");
			toast.error("Error fetching student details");
		} finally {
			setLoading(false);
		}
	};

	const handleStatusUpdate = async () => {
		try {
			setUpdating(true);
			await updateApplicationStatus({ jobId, studentId, newStatus });
			toast.success("Status updated successfully!");
			if (onStatusUpdate) onStatusUpdate();
			toggle();
		} catch (error) {
			toast.error("Failed to update status");
		} finally {
			setUpdating(false);
		}
	};

	useEffect(() => {
		if (studentId) {
			setLoading(true);
			setError("");
			fetchDetails();
			setNewStatus(currentStatus);
		}
	}, [studentId, currentStatus]);

	const renderScoreCard = (label: string, score: number, color = "info") => (
		<ListGroupItem className='d-flex justify-content-between align-items-center'>
			<span className='fw-semibold'>{label}</span>
			<Badge
				pill
				color={color}>
				{score}
			</Badge>
		</ListGroupItem>
	);

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size='lg'
			centered>
			<ModalHeader toggle={toggle}>Applicant Profile</ModalHeader>
			<ModalBody>
				{loading ? (
					<div className='d-flex justify-content-center py-5'>
						<Spinner color='primary' />
					</div>
				) : error ? (
					<Alert color='danger'>{error}</Alert>
				) : student ? (
					<>
						<Card className='shadow-sm border-0 mb-4'>
							<CardBody>
								<Row>
									<Col md={6}>
										<h6 className='text-muted mb-2'>Basic Info</h6>
										<p className='mb-1'>
											<strong>Name:</strong> {student.name}
										</p>
										<p className='mb-1'>
											<strong>Email:</strong> {student.email}
										</p>
										<p className='mb-1'>
											<strong>Resume:</strong>{" "}
											{resume ? (
												<a
													href={getImageURL(resume)}
													target='_blank'
													rel='noopener noreferrer'>
													Download
												</a>
											) : (
												<span className='text-muted'>Not uploaded</span>
											)}
										</p>
									</Col>
									<Col md={6}>
										<h6 className='text-muted mb-2'>
											Update Application Status
										</h6>
										<div className='d-flex flex-column gap-2'>
											<Input
												type='select'
												value={newStatus}
												onChange={(e) => setNewStatus(e.target.value as any)}>
												<option value='Pending'>Pending</option>
												<option value='Accepted'>Accepted</option>
												<option value='Rejected'>Rejected</option>
											</Input>
											<Button
												color='primary'
												onClick={handleStatusUpdate}
												disabled={updating}>
												{updating ? "Updating..." : "Update Status"}
											</Button>
										</div>
									</Col>
								</Row>
							</CardBody>
						</Card>

						<Card className='shadow-sm border-0'>
							<CardBody>
								<h6 className='text-muted mb-3'>Performance Scores</h6>
								<ListGroup flush>
									{renderScoreCard(
										"EVO Score",
										student.evoscore || 0,
										"primary"
									)}
									{renderScoreCard(
										"Assignment Score",
										student.assignmentScore || 0,
										"success"
									)}
									{renderScoreCard(
										"Quiz Score",
										student.quizScore || 0,
										"warning"
									)}
								</ListGroup>
							</CardBody>
						</Card>
					</>
				) : (
					<p className='text-muted text-center'>No data available.</p>
				)}
			</ModalBody>
		</Modal>
	);
};

export default ApplicantDetailsModal;
