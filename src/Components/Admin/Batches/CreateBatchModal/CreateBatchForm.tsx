"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { getCourses } from "@/app/api/admin/course";
import { createBatch } from "@/app/api/admin/batches";
import { CourseProps } from "@/Types/Course.type";

interface CreateBatchFormProps {
	toggle: () => void;
	fetchData: () => Promise<void>;
}

const CreateBatchForm = ({ toggle, fetchData }: CreateBatchFormProps) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		time: "",
		batchWeekType: "Mon-Fri",
		startDate: "",
		endDate: "",
		courseId: "",
	});

	const [courses, setCourses] = useState<CourseProps[]>([]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const data = await getCourses();
				setCourses(data);
			} catch (error) {
				toast.error("Failed to fetch courses");
			}
		};
		fetchCourses();
	}, []);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			// Prepare data matching backend schema
			const { courseId, ...rest } = formData;
			const payload = {
				...rest,
				courseId: courseId, // pass `courseId` as `course`
			};
			await createBatch(payload);
			toast.success("Batch created successfully!");
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			toast.error("Failed to create batch.");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label>Batch Name</Label>
					<Input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter batch name"
						required
					/>
				</Col>

				<Col md={12}>
					<Label>Description</Label>
					<Input
						type="textarea"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Enter batch description"
					/>
				</Col>

				<Col md={12}>
					<Label>Time</Label>
					<Input
						type="text"
						name="time"
						value={formData.time}
						onChange={handleChange}
						placeholder="e.g. 10:00 AM - 12:00 PM"
						required
					/>
				</Col>

				<Col md={12}>
					<Label>Batch Week Type</Label>
					<Input
						type="select"
						name="batchWeekType"
						value={formData.batchWeekType}
						onChange={handleChange}
						required>
						<option value="Full Week">Full Week</option>
						<option value="Mon-Fri">Mon-Fri</option>
						<option value="Weekend">Weekend</option>
					</Input>
				</Col>

				<Col md={12}>
					<Label>Course</Label>
					<Input
						type="select"
						name="courseId"
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
				</Col>

				<Col md={6}>
					<Label>Start Date</Label>
					<Input
						type="date"
						name="startDate"
						value={formData.startDate}
						onChange={handleChange}
						required
					/>
				</Col>

				<Col md={6}>
					<Label>End Date</Label>
					<Input
						type="date"
						name="endDate"
						value={formData.endDate}
						onChange={handleChange}
						required
					/>
				</Col>

				<Col
					md={12}
					className="text-end">
					<Button
						color="primary"
						type="submit">
						Create Batch
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateBatchForm;
