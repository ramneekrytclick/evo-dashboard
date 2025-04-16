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
} from "reactstrap";
import { toast } from "react-toastify";
import {
	getStudentDetailsById,
	updateApplicationStatus,
} from "@/app/api/employer";
import { getAllCourses } from "@/app/api/cc";

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
	onStatusUpdate?: () => void; // Optional parent callback
}) => {
	const [student, setStudent] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [courses, setCourses] = useState<any[]>([]);
	const [newStatus, setNewStatus] = useState(currentStatus);
	const [updating, setUpdating] = useState(false);

	const getDetails = async () => {
		try {
			const response = await getStudentDetailsById(studentId);
			setStudent(response.student);

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

	const getCourseTitle = (id: string) => {
		const match = courses.find((course) => course.id === id);
		return match?.title || "(Course Deleted)";
	};

	const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL;

	useEffect(() => {
		if (studentId) {
			setLoading(true);
			setError("");
			getDetails();
			setNewStatus(currentStatus); // Sync when modal opens
		}
	}, [studentId, currentStatus]);

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
													href={`${backendURL}${resume}`}
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
								<h6 className='text-muted mb-3'>Enrolled Courses</h6>
								{student.enrolledCourses?.length > 0 ? (
									<ListGroup flush>
										{student.enrolledCourses.map((course: any, idx: number) => (
											<ListGroupItem
												key={idx}
												className='d-flex justify-content-between align-items-center'>
												<span className='fw-semibold'>
													{getCourseTitle(course.course)}
												</span>
												<Badge color='info'>Enrolled</Badge>
											</ListGroupItem>
										))}
									</ListGroup>
								) : (
									<p className='text-muted'>No courses enrolled.</p>
								)}
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
