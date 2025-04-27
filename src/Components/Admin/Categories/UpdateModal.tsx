"use client";

import { FormEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	Row,
	Col,
	Input,
	Label,
} from "reactstrap";
import { updateCategory } from "@/app/api/admin/categories"; // assuming you have this

interface UpdateCategoryModalProps {
	isOpen: boolean;
	toggle: () => void;
	category: any; // you can type better if needed
	fetchData: () => Promise<void>;
}

const UpdateCategoryModal = ({
	isOpen,
	toggle,
	category,
	fetchData,
}: UpdateCategoryModalProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		photo: null as File | null,
	});

	useEffect(() => {
		if (category) {
			setFormData({
				title: category.title || "",
				description: category.description || "",
				photo: null, // reset photo
			});
		}
	}, [category]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = new FormData();
			data.append("title", formData.title);
			data.append("description", formData.description);
			if (formData.photo) data.append("photo", formData.photo);

			await updateCategory(category._id, data);
			toast.success("Category updated successfully!");
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			toast.error("Error updating category!");
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFormData({ ...formData, photo: e.target.files[0] });
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			centered>
			<ModalHeader toggle={toggle}>Update Category</ModalHeader>
			<Form onSubmit={handleSubmit}>
				<ModalBody>
					<Row className='g-3'>
						<Col md={12}>
							<Label htmlFor='title'>Category Title</Label>
							<Input
								id='title'
								name='title'
								type='text'
								value={formData.title}
								onChange={handleChange}
								required
							/>
						</Col>
						<Col md={12}>
							<Label htmlFor='description'>Description</Label>
							<Input
								id='description'
								name='description'
								type='textarea'
								value={formData.description}
								onChange={handleChange}
							/>
						</Col>
						<Col md={12}>
							<Label htmlFor='photo'>Category Icon (Optional)</Label>
							<Input
								id='photo'
								name='photo'
								type='file'
								accept='image/*'
								onChange={handleFileChange}
							/>
						</Col>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button
						color='success'
						type='submit'>
						Update
					</Button>
					<Button
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

export default UpdateCategoryModal;
