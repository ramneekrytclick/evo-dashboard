"use client";

import { useEffect, useState } from "react";
import { getLessonById } from "@/app/api/admin/students";
import { submitAssignment } from "@/app/api/student";
import {
	Alert,
	Card,
	CardBody,
	CardTitle,
	Col,
	Row,
	Spinner,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { FileText } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL;

interface Assignment {
	_id?: string;
	title: string;
	description: string;
	attachmentUrl: string;
}

const LessonAssignmentContainer = ({
	lessonId,
	courseId,
}: {
	lessonId: string;
	courseId: string;
}) => {
	const router = useRouter();
	const [assignmentData, setAssignmentData] = useState<Assignment | null>(null);
	const [lessonTitle, setLessonTitle] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		description: "",
		file: null as File | null,
	});

	const fetchAssignment = async () => {
		try {
			const response = await getLessonById(lessonId, courseId);
			const assignment = response?.assignments;
			if (assignment && assignment.length > 0) {
				setAssignmentData(assignment[0]);
			}
			if (response?.title) {
				setLessonTitle(response.title);
			}
		} catch (error) {
			setError("Failed to fetch assignment");
			toast.error("Failed to fetch assignment");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAssignment();
	}, []);

	const handleSubmit = async () => {
		if (!formData.file || !formData.description) {
			toast.error("Please fill all fields and upload your file.");
			return;
		}

		try {
			await submitAssignment({
				lessonId,
				description: formData.description,
				file: formData.file,
			});
			toast.success("Assignment submitted successfully!");
			setFormData({ description: "", file: null });
		} catch (err: any) {
			toast.error(err.response.data.message);
		}
	};

	if (loading) return <Spinner className='m-3' />;
	if (error) return <Alert color='danger'>{error}</Alert>;

	return (
		<>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<h5 className='fw-bold mb-0'>
					Assignment {lessonTitle && ` - ${lessonTitle}`}
				</h5>
				<Button
					color='secondary'
					size='sm'
					onClick={() =>
						router.push(`/student/learning/course/${courseId}/${lessonId}`)
					}>
					Back to Lesson
				</Button>
			</div>

			{!assignmentData ? (
				<p className='text-muted'>No assignment found for this lesson.</p>
			) : (
				<Row className='gy-3'>
					<Col sm={12}>
						<Card className='shadow-sm bg-light text-dark'>
							<CardBody>
								<CardTitle tag='h6'>
									<strong>{assignmentData.title}</strong>
								</CardTitle>
								<p className='text-muted mb-3'>{assignmentData.description}</p>
								{assignmentData.attachmentUrl ? (
									<Button
										color='warning'
										size='sm'
										tag={Link}
										href={`${backendURL}/uploads/${assignmentData.attachmentUrl}`}
										target='_blank'
										rel='noopener noreferrer'
										className='d-flex align-items-center gap-1'>
										<FileText size={14} /> View Assignment File
									</Button>
								) : (
									<p className='text-muted'>No attachment available</p>
								)}
							</CardBody>
						</Card>
					</Col>

					{/* Submission Form */}
					<Col sm={12}>
						<Card className='shadow-sm'>
							<CardBody>
								<h6 className='mb-3'>Submit Your Assignment</h6>
								<Form>
									<FormGroup>
										<Label>Your Notes / Description</Label>
										<Input
											type='textarea'
											value={formData.description}
											onChange={(e) =>
												setFormData({
													...formData,
													description: e.target.value,
												})
											}
										/>
									</FormGroup>
									<FormGroup>
										<Label>Upload PDF File</Label>
										<Input
											type='file'
											accept='.pdf'
											onChange={(e) =>
												setFormData({
													...formData,
													file: e.target.files?.[0] || null,
												})
											}
										/>
									</FormGroup>
									<Button
										color='success'
										className='mt-2'
										onClick={handleSubmit}>
										Submit Assignment
									</Button>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default LessonAssignmentContainer;
