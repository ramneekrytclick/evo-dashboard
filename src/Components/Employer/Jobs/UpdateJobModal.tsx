"use client";

import {
	Button,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
	Col,
} from "reactstrap";
import { useEffect, useState } from "react";
import { updateJob } from "@/app/api/employer";
import { toast } from "react-toastify";

const UpdateJobModal = ({ isOpen, toggle, job, refresh }: any) => {
	const [formData, setFormData] = useState({ ...job });

	useEffect(() => {
		if (job) setFormData({ ...job });
	}, [job]);

	const handleChange = (key: string, value: any) => {
		setFormData((prev: typeof formData) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async () => {
		try {
			await updateJob(job._id, {
				...formData,
				skillsRequired: formData.skillsRequired?.includes(",")
					? formData.skillsRequired?.split(",").map((s: string) => s.trim())
					: formData.skillsRequired,
				openings: Number(formData.openings),
			});
			toast.success("Job updated successfully");
			toggle();
			refresh();
		} catch (error) {
			console.log("Update error", error);
			toast.error("Failed to update job");
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			centered
			size='lg'>
			<ModalHeader toggle={toggle}>Update Job</ModalHeader>
			<ModalBody>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label>Title</Label>
							<Input
								value={formData.title}
								onChange={(e) => handleChange("title", e.target.value)}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Company Name</Label>
							<Input
								value={formData.companyName}
								onChange={(e) => handleChange("companyName", e.target.value)}
							/>
						</FormGroup>
					</Col>
				</Row>
				<FormGroup>
					<Label>Description</Label>
					<Input
						type='textarea'
						value={formData.description}
						onChange={(e) => handleChange("description", e.target.value)}
					/>
				</FormGroup>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label>Location</Label>
							<Input
								value={formData.location}
								onChange={(e) => handleChange("location", e.target.value)}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Job Type</Label>
							<Input
								type='select'
								value={formData.jobType}
								onChange={(e) => handleChange("jobType", e.target.value)}>
								<option value='Full-Time'>Full-Time</option>
								<option value='Part-Time'>Part-Time</option>
								<option value='Internship'>Internship</option>
								<option value='Contract'>Contract</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label>Experience Required</Label>
							<Input
								value={formData.experienceRequired}
								onChange={(e) =>
									handleChange("experienceRequired", e.target.value)
								}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Salary</Label>
							<Input
								value={formData.salary}
								onChange={(e) => handleChange("salary", e.target.value)}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label>Application Deadline</Label>
							<Input
								type='date'
								value={formData.applicationDeadline?.substring(0, 10)}
								onChange={(e) =>
									handleChange("applicationDeadline", e.target.value)
								}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Openings</Label>
							<Input
								type='number'
								value={formData.openings}
								onChange={(e) => handleChange("openings", e.target.value)}
							/>
						</FormGroup>
					</Col>
				</Row>
				<FormGroup>
					<Label>Skills Required (comma separated)</Label>
					<Input
						value={
							Array.isArray(formData.skillsRequired)
								? formData.skillsRequired.join(", ")
								: formData.skillsRequired
						}
						onChange={(e) => handleChange("skillsRequired", e.target.value)}
					/>
				</FormGroup>
			</ModalBody>
			<ModalFooter>
				<Button
					color='outline-danger'
					onClick={toggle}>
					Cancel
				</Button>
				<Button
					color='success'
					onClick={handleSubmit}>
					Save Changes
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default UpdateJobModal;
