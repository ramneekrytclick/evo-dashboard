"use client";
import { useState, useEffect } from "react";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Col,
	Card,
	CardBody,
} from "reactstrap";
import { toast } from "react-toastify";
import { getCourses } from "@/app/api/admin/course";
import { createLesson } from "@/app/api/admin/lessons/lesson";
import { CourseProps } from "@/Types/Course.type";
import { Trash } from "react-feather";
import { useRouter } from "next/navigation";

const initialFormData = {
	courseId: "",
	title: "",
	content: "",
	videoUrl: "",
	resources: [""],
};

const CreateLessonForm = () => {
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [formData, setFormData] = useState({ ...initialFormData });
	const [submitting, setSubmitting] = useState(false);

	const fetchCourses = async () => {
		try {
			const data = await getCourses();
			setCourses(data);
		} catch (error) {
			toast.error("Failed to fetch courses");
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

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
		if (formData.resources.length === 1) return;
		const updatedResources = formData.resources.filter((_, i) => i !== index);
		setFormData((prev) => ({ ...prev, resources: updatedResources }));
	};

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);

		const trimmedData = {
			...formData,
			title: formData.title.trim(),
			content: formData.content.trim(),
			videoUrl: formData.videoUrl.trim(),
			resources: formData.resources.map((r) => r.trim()).filter(Boolean),
		};

		await toast.promise(createLesson(trimmedData), {
			pending: "Creating lesson...",
			success: {
				render() {
					// Reset and redirect only after toast success
					setFormData({ ...initialFormData });
					router.push(`/admin/course/${trimmedData.courseId}`);
					return "Lesson created successfully!";
				},
			},
			error: {
				render({ data }: { data: any }) {
					console.error("Error creating lesson:", data);
					return data?.response?.data?.message || "Failed to create lesson";
				},
			},
		});

		setSubmitting(false);
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
									type='select'
									name='courseId'
									id='courseId'
									value={formData.courseId}
									onChange={handleChange}
									required>
									<option value=''>Select Course</option>
									{courses.map((course) => (
										<option
											key={course._id}
											value={course._id}>
											{course.title}
										</option>
									))}
								</Input>
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
							<FormGroup>
								<Label>Upload Resources (Google Drive Links)</Label>
								{formData.resources.map((url, index) => (
									<Row
										key={index}
										className='mb-2 align-items-center'>
										<Col md={10}>
											<Input
												type='text'
												placeholder={`Resource Link ${index + 1}`}
												value={url}
												onChange={(e) =>
													handleResourceChange(e.target.value, index)
												}
											/>
										</Col>
										<Col md={2}>
											<Button
												color='danger'
												size='sm'
												className='d-flex align-items-center justify-content-center p-2'
												style={{ width: "30px", height: "30px" }}
												type='button'
												onClick={() => removeResourceField(index)}
												disabled={formData.resources.length === 1}>
												<Trash size={16} />
											</Button>
										</Col>
									</Row>
								))}
								<Button
									color='info'
									type='button'
									size='sm'
									className='mt-1 text-white'
									onClick={addResourceField}>
									+ Add Link
								</Button>
							</FormGroup>
						</Col>

						<Col md={12}>
							<Button
								type='submit'
								color='primary'
								disabled={submitting}>
								{submitting ? "Submitting..." : "Submit Lesson"}
							</Button>
						</Col>
					</Row>
				</Form>
			</CardBody>
		</Card>
	);
};

export default CreateLessonForm;
