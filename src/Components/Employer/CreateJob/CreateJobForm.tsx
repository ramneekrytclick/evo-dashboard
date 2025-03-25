"use client";

import { createJob } from "@/app/api/employer";
import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useAuth } from "@/app/AuthProvider"; // Assuming you have this

const CreateJobForm = () => {
	const { user } = useAuth(); // Make sure this returns an object with employer ID
	const [formData, setFormData] = useState({
		title: "",
		description: "",
	});

	const handleFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!formData.title.trim() || !formData.description.trim()) {
			toast.error("Title and Description are required!");
			return;
		}

		if (!user?.id) {
			toast.error("Employer ID not found!");
			return;
		}

		const payload = {
			title: formData.title.trim(),
			description: formData.description.trim(),
			employerId: user.id,
		};

		try {
			await createJob(payload);
			toast.success("Job created successfully!");
			setFormData({ title: "", description: "" });
		} catch (error) {
			toast.error("Error creating job. Please try again.");
		}
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className="needs-validation"
			noValidate>
			<Row className="g-3">
				<Col sm={12}>
					<Label>
						Job Title <span className="text-danger">*</span>
					</Label>
					<Input
						type="text"
						name="title"
						placeholder="Enter job title"
						value={formData.title}
						onChange={handleFormChange}
						required
					/>
				</Col>
			</Row>
			<Row className="g-3 mt-3">
				<Col sm={12}>
					<Label>
						Description <span className="text-danger">*</span>
					</Label>
					<Input
						type="textarea"
						name="description"
						placeholder="Enter job description"
						value={formData.description}
						onChange={handleFormChange}
						rows="5"
						required
					/>
				</Col>
			</Row>
			<Col
				xs={12}
				className="text-end mt-4">
				<Button
					color="primary"
					type="submit">
					Create Job
				</Button>
			</Col>
		</Form>
	);
};

export default CreateJobForm;
