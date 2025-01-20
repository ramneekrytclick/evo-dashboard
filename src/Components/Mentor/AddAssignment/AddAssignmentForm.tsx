"use client";

import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row
} from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { AddAssignmentProps } from "@/Types/AddAssignment.type";
import { addAssignment } from "@/app/api/mentor";

const AddAssignmentForm = () => {
	const [formData, setFormData] = useState<AddAssignmentProps>({
		courseId: "",
		lessonId: "",
		assignment: {
			title: "",
			description: "",
			submissionURL: ""
		}
	});

	const handleFieldChange = (field: string, value: string) => {
		setFormData({
			...formData,
			[field]: value
		});
	};

	const handleAssignmentChange = (field: string, value: string) => {
		setFormData({
			...formData,
			assignment: {
				...formData.assignment,
				[field]: value
			}
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { courseId, lessonId, assignment } = formData;

		if (!courseId.trim() || !lessonId.trim() || !assignment.title.trim()) {
			toast.error("Course ID, Lesson ID, and Assignment Title are required!");
			return;
		}

		console.log("Form Data Submitted:", formData);

		try {
			// Submit form data to the API
            const response = await addAssignment(formData)
			toast.success("Assignment Added Successfully!");
		} catch (error) {
			toast.error("Error Adding Assignment!");
		}
	};

	const handleReset = () => {
		setFormData({
			courseId: "",
			lessonId: "",
			assignment: {
				title: "",
				description: "",
				submissionURL: ""
			}
		});
	};

	return (
		<div>
			<Form
				className="needs-validation"
				onSubmit={handleSubmit}>
				<Row>
					<Col sm={12}>
						<FormGroup>
							<Label>Course ID:</Label>
							<Input
								type="text"
								placeholder="Enter Course ID"
								value={formData.courseId}
								onChange={(e) =>
									handleFieldChange("courseId", e.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Lesson ID:</Label>
							<Input
								type="text"
								placeholder="Enter Lesson ID"
								value={formData.lessonId}
								onChange={(e) =>
									handleFieldChange("lessonId", e.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Assignment Title:</Label>
							<Input
								type="text"
								placeholder="Enter Assignment Title"
								value={formData.assignment.title}
								onChange={(e) =>
									handleAssignmentChange("title", e.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Description:</Label>
							<Input
								type="textarea"
								placeholder="Enter Description (Optional)"
								value={formData.assignment.description}
								onChange={(e) =>
									handleAssignmentChange("description", e.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Submission URL:</Label>
							<Input
								type="text"
								placeholder="Enter Submission URL (Optional)"
								value={formData.assignment.submissionURL}
								onChange={(e) =>
									handleAssignmentChange("submissionURL", e.target.value)
								}
							/>
						</FormGroup>
					</Col>
				</Row>
				<div className="btn-showcase text-end mt-4">
					<Button
						color="primary"
						type="submit">
						Submit
					</Button>
					<Button
						color="light"
						type="button"
						onClick={handleReset}>
						Reset
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default AddAssignmentForm;
