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
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import { toast } from "react-toastify";
import { getStudentDetailsById } from "@/app/api/employer";

const ApplicantDetailsModal = ({
	isOpen,
	toggle,
	studentId,
}: {
	isOpen: boolean;
	toggle: () => void;
	studentId: string;
}) => {
	const [student, setStudent] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getDetails = async () => {
		try {
			const response = await getStudentDetailsById(studentId);
			setStudent(response.student); // Use .student based on the JSON provided
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError("Error fetching student details");
			toast.error("Error fetching student details");
		}
	};

	useEffect(() => {
		if (studentId) {
			setLoading(true);
			setError("");
			getDetails();
		}
	}, [studentId]);

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size="lg">
			<ModalHeader toggle={toggle}>Applicant Details</ModalHeader>
			<ModalBody>
				{loading ? (
					<Spinner color="primary" />
				) : error ? (
					<Alert color="danger">{error}</Alert>
				) : student ? (
					<div>
						<Row>
							<Col md={6}>
								<p>
									<strong>Name:</strong> {student.name}
								</p>
								<p>
									<strong>Email:</strong> {student.email}
								</p>
								<p>
									<strong>Role:</strong> {student.role}
								</p>
								<p>
									<strong>Working Mode:</strong> {student.workingMode || "N/A"}
								</p>
							</Col>
							<Col md={6}>
								<p>
									<strong>Status:</strong>{" "}
									<Badge
										color={student.status === "Banned" ? "danger" : "success"}>
										{student.status}
									</Badge>
								</p>
							</Col>
						</Row>
						<hr />
						<h6>Enrolled Courses</h6>
						<ListGroup flush>
							{student.enrolledCourses?.length > 0 ? (
								student.enrolledCourses.map((course: any, idx: number) => (
									<ListGroupItem key={idx}>
										<strong>Course ID:</strong> {course.course} <br />
									</ListGroupItem>
								))
							) : (
								<p className="text-muted">No courses enrolled</p>
							)}
						</ListGroup>
					</div>
				) : (
					<p>No data available</p>
				)}
			</ModalBody>
		</Modal>
	);
};

export default ApplicantDetailsModal;
