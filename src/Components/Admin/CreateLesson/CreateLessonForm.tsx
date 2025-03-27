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

const CreateLessonForm = () => {
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [formData, setFormData] = useState({
		courseId: "",
		title: "",
		content: "",
		videoUrl: "",
		resources: [] as string[],
	});

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

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleResourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const urls: string[] = [];
		for (let i = 0; i < files.length; i++) {
			const url = URL.createObjectURL(files[i]); // temp blob URL
			urls.push(url);
		}

		setFormData((prev) => ({
			...prev,
			resources: [...prev.resources, ...urls],
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// Send formData to your API
		try {
			const response = await createLesson(formData);
			console.log("Submitted:", formData);
			toast.success("Lesson Created Successfully in Course");
		} catch (error) {
			toast.error("Failed to create lesson");
			console.error("Error creating lesson:", error);
		}
	};

	return (
		<Card className="p-3">
			<CardBody>
				<h4 className="mb-3">Create New Lesson</h4>
				<Form onSubmit={handleSubmit}>
					<Row className="g-3">
						<Col md={6}>
							<FormGroup>
								<Label for="courseId">Course</Label>
								<Input
									type="select"
									name="courseId"
									id="courseId"
									value={formData.courseId}
									onChange={handleChange}
									required>
									<option value="">Select Course</option>
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
								<Label for="title">Title</Label>
								<Input
									type="text"
									name="title"
									id="title"
									value={formData.title}
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={12}>
							<FormGroup>
								<Label for="content">Content</Label>
								<Input
									type="textarea"
									name="content"
									id="content"
									value={formData.content}
									onChange={handleChange}
									required
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="videoUrl">Video URL</Label>
								<Input
									type="text"
									name="videoUrl"
									id="videoUrl"
									value={formData.videoUrl}
									onChange={handleChange}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="resources">Upload Resources</Label>
								<Input
									type="file"
									id="resources"
									multiple
									onChange={handleResourceUpload}
								/>
							</FormGroup>
						</Col>

						{formData.resources.length > 0 && (
							<Col md={12}>
								<p>
									<strong>Preview Resources:</strong>
								</p>
								<ul>
									{formData.resources.map((url, idx) => (
										<li key={idx}>
											<a
												href={url}
												target="_blank"
												rel="noopener noreferrer">
												Resource {idx + 1}
											</a>
										</li>
									))}
								</ul>
							</Col>
						)}

						<Col md={12}>
							<Button
								type="submit"
								color="primary">
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
