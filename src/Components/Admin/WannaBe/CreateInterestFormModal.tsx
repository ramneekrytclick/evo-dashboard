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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
	const [preview, setPreview] = useState<string | null>(null);
	const [errors, setErrors] = useState({ title: "", image: "" });
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		// Generate image preview
		if (formData.image) {
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result as string);
			reader.readAsDataURL(formData.image);
		} else {
			setPreview(null);
		}
	}, [formData.image]);

	useEffect(() => {
		const titleValid = formData.title.trim() !== "";
		const imageValid = formData.image !== null;
		setIsValid(titleValid && imageValid);
		setErrors({
			title: titleValid ? "" : "Title is required",
			image: imageValid ? "" : "Image is required",
		});
	}, [formData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			if (file.size > 2 * 1024 * 1024) {
				toast.error("File size exceeds 2MB limit.");
				return;
			}
			setFormData((prev) => ({ ...prev, image: file }));
		}
	};

	const onSubmit = async () => {
		const titleValid = formData.title.trim() !== "";
		const imageValid = formData.image !== null;

		if (!titleValid || !imageValid) {
			setErrors({
				title: !titleValid ? "Title is required" : "",
				image: !imageValid ? "Image is required" : "",
			});
			return;
		}

		const data = new FormData();
		data.append("title", formData.title);
		data.append("description", formData.description);
		if (formData.image) data.append("image", formData.image);

		await toast
			.promise(handleSubmit(data), {
				pending: "Creating interest...",
				success: "Interest created successfully!",
				error: "Error creating interest!",
			})
			.then(() => {
				setFormData({ title: "", description: "", image: null });
				setErrors({ title: "", image: "" });
				toggleModal();
			})
			.catch((err) => console.error(err));
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
						<Label for='title'>Title</Label>
						<Input
							id='title'
							name='title'
							type='text'
							value={formData.title}
							onChange={handleChange}
							invalid={!!errors.title}
							placeholder='Enter title'
						/>
						<FormFeedback>{errors.title}</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for='description'>Description</Label>
						<Input
							id='description'
							name='description'
							type='textarea'
							value={formData.description}
							onChange={handleChange}
							placeholder='Enter description (optional)'
						/>
					</FormGroup>
					<FormGroup>
						<Label for='image'>Image</Label>
						<Input
							id='image'
							name='image'
							type='file'
							accept='image/*'
							onChange={handleFileChange}
							invalid={!!errors.image}
						/>
						<FormFeedback>{errors.image}</FormFeedback>
					</FormGroup>

					{preview && (
						<div className='mt-2 text-center'>
							<img
								src={preview}
								alt='Preview'
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
									borderRadius: 8,
								}}
							/>
						</div>
					)}
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button
					color='outline-primary'
					onClick={toggleModal}>
					Cancel
				</Button>
				<Button
					color='primary'
					onClick={onSubmit}
					disabled={!isValid}>
					Submit
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default CreateInterestFormModal;
