"use client";

import { useState, useEffect } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Col,
} from "reactstrap";
import { updateBatch } from "@/app/api/admin/batches";
import { toast } from "react-toastify";
import { getAllCourses } from "@/app/api/cc";
import { Course } from "@/Types/Course.type";
const UpdateBatchModal = ({ batch, isOpen, toggle, fetchData }: any) => {
	const [formData, setFormData] = useState({
		name: batch?.name || "",
		description: batch?.description || "",
		time: batch?.time || "",
		batchWeekType: batch?.batchWeekType || "",
		startDate: batch?.startDate ? batch.startDate.substring(0, 10) : "",
		endDate: batch?.endDate ? batch.endDate.substring(0, 10) : "",
		courseId:
			typeof batch.course === "object" ? batch.course._id : batch.course || "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [courses, setCourses] = useState<Course[]>([]);
	const fetchCourses = async () => {
		const response = await getAllCourses();
		setCourses(response.courses);
	};
	useEffect(() => {
		if (batch) {
			setFormData({
				name: batch?.name || "",
				description: batch?.description || "",
				time: batch?.time || "",
				batchWeekType: batch?.batchWeekType || "",
				startDate: batch?.startDate ? batch.startDate.substring(0, 10) : "",
				endDate: batch?.endDate ? batch.endDate.substring(0, 10) : "",
				courseId:
					typeof batch.course === "object"
						? batch.course._id
						: batch.course || "",
			});
		}
	}, [batch]);
	useEffect(() => {
		fetchCourses();
	}, []);
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			setSubmitting(true);
			const submitData = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				submitData.append(key, value);
			});

			await updateBatch(batch._id, submitData);
			toast.success("Batch updated successfully");
			toggle(); // Close modal
			fetchData(); // Refetch batches
		} catch (error) {
			toast.error("Error updating batch");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			centered>
			<ModalHeader toggle={toggle}>Update Batch</ModalHeader>
			<Form onSubmit={handleSubmit}>
				<ModalBody>
					<FormGroup>
						<Label>Name</Label>
						<Input
							name='name'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label>Description</Label>
						<Input
							name='description'
							value={formData.description}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Time</Label>
						<Input
							name='time'
							value={formData.time}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Batch Week Type</Label>
						<Input
							name='batchWeekType'
							value={formData.batchWeekType}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Start Date</Label>
						<Input
							type='date'
							name='startDate'
							value={formData.startDate}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>End Date</Label>
						<Input
							type='date'
							name='endDate'
							value={formData.endDate}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Course</Label>
						<Input
							type='select'
							name='courseId'
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
				</ModalBody>
				<ModalFooter>
					<Button
						type='submit'
						color='success'
						disabled={submitting}>
						{submitting ? "Updating..." : "Update"}
					</Button>
					<Button
						type='button'
						outline
						color='success'
						onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
};

export default UpdateBatchModal;
