"use client";

import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Form,
	FormGroup,
	Label,
	Input,
	FormFeedback,
} from "reactstrap";
import { useState } from "react";

interface ModalProps {
	modalOpen: boolean;
	toggleModal: () => void;
	handleSubmit: (data: FormData) => Promise<void>;
}

const CreateInterestFormModal: React.FC<ModalProps> = ({
	modalOpen,
	toggleModal,
	handleSubmit,
}) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: null as File | null,
	});

	const [errors, setErrors] = useState({
		title: "",
		image: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
		}
	};
	const onSubmit = async () => {
		const data = new FormData();
		data.append("title", formData.title);
		data.append("description", formData.description);
		if (formData.image) data.append("image", formData.image);

		await handleSubmit(data);
		setFormData({ title: "", description: "", image: null });
		setErrors({ title: "", image: "" });
		toggleModal();
	};

	return (
		<Modal
			isOpen={modalOpen}
			toggle={toggleModal}
			centered>
			<ModalHeader toggle={toggleModal}>Create Wanna Be Interest</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label for="title">Title</Label>
						<Input
							id="title"
							name="title"
							type="text"
							value={formData.title}
							onChange={handleChange}
							invalid={!!errors.title}
							placeholder="Enter title"
						/>
						<FormFeedback>{errors.title}</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="description">Description</Label>
						<Input
							id="description"
							name="description"
							type="textarea"
							value={formData.description}
							onChange={handleChange}
							placeholder="Enter description (optional)"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="image">Image</Label>
						<Input
							id="image"
							name="image"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							invalid={!!errors.image}
						/>
						<FormFeedback>{errors.image}</FormFeedback>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button
					color="secondary"
					onClick={toggleModal}>
					Cancel
				</Button>
				<Button
					color="primary"
					onClick={onSubmit}>
					Submit
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default CreateInterestFormModal;
