"use client";

import { createJob } from "@/app/api/employer";
import React, { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useAuth } from "@/app/AuthProvider";

interface CreateJobPayload {
	title: string;
	description: string;
	companyName: string;
	location: string;
	jobType: "Full-Time" | "Part-Time" | "Internship" | "Contract";
	experienceRequired?: string;
	salary?: string;
	applicationDeadline: Date;
	skillsRequired: string;
	openings: number;
	employer: string; // ObjectId string
}

const initialState: CreateJobPayload = {
	title: "",
	description: "",
	companyName: "",
	location: "",
	jobType: "Internship",
	experienceRequired: "",
	salary: "",
	applicationDeadline: new Date(),
	skillsRequired: "",
	openings: 1,
	employer: "",
};

const CreateJobForm = () => {
	const { user } = useAuth();
	const [formData, setFormData] = useState<CreateJobPayload>(initialState);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		if (!user?.id) {
			toast.error("Employer ID not found!");
			return;
		}

		if (!formData.title.trim() || !formData.description.trim()) {
			toast.error("Title and Description are required!");
			return;
		}

		try {
			const payload = {
				...formData,
				employer: user.id,
				skillsRequired: formData.skillsRequired
					.split(",")
					.map((skill) => skill.trim())
					.filter(Boolean),
				applicationDeadline: new Date(formData.applicationDeadline),
				openings: Number(formData.openings),
			};

			await createJob(payload);
			toast.success("Job created successfully!");
		} catch (error) {
			toast.error("Error creating job. try again.");
			console.log(error);
			console.error(error);
		}
	};

	return (
		<Container>
			<Row className="g-3">
				<Col
					sm={12}
					md={6}>
					<Label>
						Job Title <span className="text-danger">*</span>
					</Label>
					<Input
						type="text"
						name="title"
						placeholder="Enter job title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col
					sm={12}
					md={6}>
					<Label>
						Company Name <span className="text-danger">*</span>
					</Label>
					<Input
						type="text"
						name="companyName"
						placeholder="Enter company name"
						value={formData.companyName}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col
					sm={12}
					md={6}>
					<Label>Location</Label>
					<Input
						type="text"
						name="location"
						placeholder="Enter location"
						value={formData.location}
						onChange={handleChange}
					/>
				</Col>
				<Col
					sm={12}
					md={6}>
					<Label>Job Type</Label>
					<Input
						type="select"
						name="jobType"
						value={formData.jobType}
						onChange={handleChange}>
						<option value="Full-Time">Full-Time</option>
						<option value="Part-Time">Part-Time</option>
						<option value="Internship">Internship</option>
						<option value="Contract">Contract</option>
					</Input>
				</Col>
				<Col
					sm={12}
					md={6}>
					<Label>Experience Required</Label>
					<Input
						type="text"
						name="experienceRequired"
						placeholder="e.g. 1-2 years"
						value={formData.experienceRequired}
						onChange={handleChange}
					/>
				</Col>
				<Col
					sm={12}
					md={6}>
					<Label>Salary</Label>
					<Input
						type="text"
						name="salary"
						placeholder="e.g. 4-6 LPA"
						value={formData.salary}
						onChange={handleChange}
					/>
				</Col>
				<Col
					sm={12}
					md={6}>
					<Label>Application Deadline</Label>
					<Input
						type="date"
						name="applicationDeadline"
						value={
							formData.applicationDeadline
								? new Date(formData.applicationDeadline)
										.toISOString()
										.split("T")[0]
								: new Date().toISOString().split("T")[0]
						}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col
					sm={12}
					md={6}>
					<Label>Openings</Label>
					<Input
						type="number"
						name="openings"
						min={1}
						value={formData.openings}
						onChange={handleChange}
					/>
				</Col>
				<Col sm={12}>
					<Label>Skills Required (comma separated)</Label>
					<Input
						type="text"
						name="skillsRequired"
						placeholder="e.g. React, TypeScript, Node.js"
						value={formData.skillsRequired}
						onChange={handleChange}
					/>
				</Col>
				<Col sm={12}>
					<Label>Description</Label>
					<Input
						type="textarea"
						name="description"
						rows={5}
						placeholder="Enter job description"
						value={formData.description}
						onChange={handleChange}
						required
					/>
				</Col>
			</Row>

			<Col
				xs={12}
				className="text-end mt-4">
				<Button
					onClick={handleSubmit}
					color="primary"
					type="submit">
					Create Job
				</Button>
			</Col>
		</Container>
	);
};

export default CreateJobForm;
