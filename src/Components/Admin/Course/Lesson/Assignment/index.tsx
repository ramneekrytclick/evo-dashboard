"use client";

import { useEffect, useState } from "react";
import { getAssignmentByLessonID } from "@/app/api/admin/lessons/quiz";
import {
	createAssignment,
	updateAssignment,
} from "@/app/api/admin/lessons/assignment";
import { useRouter } from "next/navigation";
import {
	Alert,
	Card,
	CardBody,
	CardTitle,
	Col,
	Row,
	Spinner,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { FileText, Plus } from "react-feather";
import Link from "next/link";
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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		attachment: null as File | null,
	});

	const fetchAssignment = async () => {
		try {
			const response = await getAssignmentByLessonID(lessonId, courseId);
			if (response.length > 0) {
				setAssignmentData(response[0]);
				setFormData({
					title: response[0].title,
					description: response[0].description,
					attachment: null,
				});
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
		const form = new FormData();
		form.append("lessonId", lessonId);
		form.append("title", formData.title);
		form.append("description", formData.description);

		if (formData.attachment) {
			form.append(
				assignmentData?._id ? "pdf" : "attachment",
				formData.attachment
			);
		}

		try {
			if (assignmentData?._id) {
				form.append("assignmentId", assignmentData._id);
				await updateAssignment(form);
				toast.success("Assignment updated successfully");
			} else {
				await createAssignment(form);
				toast.success("Assignment created successfully");
			}
			setModalOpen(false);
			fetchAssignment();
		} catch (err) {
			toast.error("Failed to save assignment");
		}
	};

	if (loading) return <Spinner className='m-3' />;
	if (error) return <Alert color='danger'>{error}</Alert>;

	return (
		<>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<Button
					color='warning'
					outline
					onClick={() =>
						router.replace(`/admin/course/${courseId}/${lessonId}`)
					}
					className='d-flex align-items-center gap-1'>
					<i className='fa fa-arrow-left' /> Back
				</Button>
				<h5 className='fw-bold mb-0'>Assignments</h5>
				<Button
					color={assignmentData ? "info" : "success"}
					className='d-flex align-items-center gap-1'
					onClick={() => setModalOpen(true)}>
					<Plus size={17} />
					{assignmentData ? "Edit Assignment" : "Add Assignment"}
				</Button>
			</div>

			{!assignmentData ? (
				<p className='text-muted'>No assignments found for this lesson.</p>
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
										<FileText size={14} /> View Attachment
									</Button>
								) : (
									<p className='text-muted'>No attachment available</p>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}

			<Modal
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setModalOpen(false)}>
					{assignmentData ? "Update" : "Create"} Assignment
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>Title</Label>
							<Input
								type='text'
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Description</Label>
							<Input
								type='textarea'
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Upload PDF</Label>
							<Input
								type='file'
								accept='.pdf'
								onChange={(e) =>
									setFormData({
										...formData,
										attachment: e.target.files?.[0] || null,
									})
								}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						color='success'
						onClick={handleSubmit}>
						Save
					</Button>
					<Button
						color='secondary'
						onClick={() => setModalOpen(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default LessonAssignmentContainer;
