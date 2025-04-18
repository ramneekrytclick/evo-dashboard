"use client";
import { createLesson } from "@/app/api/admin/lessons/lesson";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Button,
	Card,
	CardBody,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";

const CreateLessonForm = ({
	courseId,
	onSuccess,
}: {
	courseId: string;
	onSuccess: () => void;
}) => {
	const [formData, setFormData] = useState<{
		courseId: string;
		title: string;
		content: string;
		videoUrl: string;
		resources: string[];
	}>({
		courseId,
		title: "",
		content: "",
		videoUrl: "",
		resources: [], // initialize with one empty string
	});

	useEffect(() => {
		setFormData((prev) => ({ ...prev, courseId }));
	}, [courseId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleResourceChange = (value: string, index: number) => {
		const updatedResources = [...formData.resources];
		updatedResources[index] = value;
		setFormData((prev) => ({ ...prev, resources: updatedResources }));
	};

	const addResourceField = () => {
		setFormData((prev) => ({
			...prev,
			resources: [...prev.resources, ""],
		}));
	};

	const removeResourceField = (index: number) => {
		const updatedResources = [...formData.resources];
		updatedResources.splice(index, 1);
		setFormData((prev) => ({ ...prev, resources: updatedResources }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createLesson(formData);
			toast.success("Lesson Created Successfully");
			onSuccess();
		} catch (error) {
			console.error("Error creating lesson:", error);
			toast.error("Failed to create lesson");
		}
	};

	return (
		<Card className='p-3'>
			<CardBody>
				<h4 className='mb-3'>Create New Lesson</h4>
				<Form onSubmit={handleSubmit}>
					<Row className='g-3'>
						<Col md={6}>
							<FormGroup>
								<Label for='courseId'>Course</Label>
								<Input
									type='text'
									name='courseId'
									id='courseId'
									value={formData.courseId}
									disabled
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for='title'>Title</Label>
								<Input
									type='text'
									name='title'
									id='title'
									value={formData.title}
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<FormGroup>
								<Label for='content'>Content</Label>
								<Input
									type='textarea'
									name='content'
									id='content'
									value={formData.content}
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for='videoUrl'>Video URL</Label>
								<Input
									type='text'
									name='videoUrl'
									id='videoUrl'
									value={formData.videoUrl}
									onChange={handleChange}
								/>
							</FormGroup>
						</Col>

						<Col md={12}>
							<Label>Upload Resources Google Drive Links</Label>
							{formData.resources.map((link, index) => (
								<Row
									key={index}
									className='mb-2 align-items-center'>
									<Col md={10}>
										<Input
											type='text'
											placeholder={`Resource Link ${index + 1}`}
											value={link}
											onChange={(e) =>
												handleResourceChange(e.target.value, index)
											}
										/>
									</Col>
									<Col md={2}>
										<Button
											color='danger'
											size='sm'
											type='button'
											onClick={() => removeResourceField(index)}
											disabled={formData.resources.length === 1}>
											🗑️
										</Button>
									</Col>
								</Row>
							))}
							<Button
								color='info'
								type='button'
								size='sm'
								className='mt-2'
								onClick={addResourceField}>
								+ Add Link
							</Button>
						</Col>

						<Col md={12}>
							<Button
								type='submit'
								color='primary'>
								Submit Lesson
							</Button>
						</Col>
					</Row>
				</Form>
			</CardBody>
		</Card>
	);
};

export default CreateLessonForm;
