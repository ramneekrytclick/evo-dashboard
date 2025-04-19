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
} from "reactstrap";
import { useEffect, useState } from "react";
import { updateJob } from "@/app/api/employer";
import { toast } from "react-toastify";

const UpdateJobModal = ({ isOpen, toggle, job, refresh }: any) => {
	const [formData, setFormData] = useState({ ...job });

	useEffect(() => {
		setFormData({ ...job });
	}, [job]);

	const handleChange = (key: string, value: any) => {
		setFormData((prev: typeof formData) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async () => {
		try {
			await updateJob(job._id, formData);
			toast.success("Job updated successfully");
			toggle();
			refresh();
		} catch (error) {
			console.error("Update error", error);
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
				<FormGroup>
					<Label>Title</Label>
					<Input
						value={formData.title}
						onChange={(e) => handleChange("title", e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Description</Label>
					<Input
						type='textarea'
						value={formData.description}
						onChange={(e) => handleChange("description", e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Location</Label>
					<Input
						value={formData.location}
						onChange={(e) => handleChange("location", e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Salary</Label>
					<Input
						value={formData.salary}
						onChange={(e) => handleChange("salary", e.target.value)}
					/>
				</FormGroup>
				{/* Add more fields as needed */}
			</ModalBody>
			<ModalFooter>
				<Button
					color='outline-success'
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
