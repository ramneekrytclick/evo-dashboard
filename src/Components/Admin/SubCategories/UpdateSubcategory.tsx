"use client";

import { useState, useEffect, FormEvent } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	Row,
	Col,
	Label,
	Input,
	Button,
} from "reactstrap";
import { toast } from "react-toastify";
import { updateSubcategory } from "@/app/api/admin/subcategories"; // You should have this API function

interface UpdateSubcategoryModalProps {
	isOpen: boolean;
	toggle: () => void;
	subcategory: any;
	fetchData: () => Promise<void>;
	categoryId: string;
}

const UpdateSubcategoryModal = ({
	isOpen,
	toggle,
	subcategory,
	fetchData,
	categoryId,
}: UpdateSubcategoryModalProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		photo: null as File | null,
	});

	useEffect(() => {
		if (subcategory) {
			setFormData({
				title: subcategory.title || "",
				description: subcategory.description || "",
				photo: null,
			});
		}
	}, [subcategory]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = new FormData();
			data.append("title", formData.title);
			data.append("description", formData.description);
			data.append("categoryId", categoryId); // In case backend expects category info
			if (formData.photo) data.append("photo", formData.photo);

			await updateSubcategory(subcategory._id, data);
			toast.success("Subcategory updated successfully!");
			toggle();
			fetchData();
		} catch (error) {
			console.error(error);
			toast.error("Error updating subcategory!");
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
			<ModalHeader toggle={toggle}>Update Subcategory</ModalHeader>
			<Form onSubmit={handleSubmit}>
				<ModalBody>
					<Row className='g-3'>
						<Col md={12}>
							<Label htmlFor='title'>Subcategory Title</Label>
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
							<Label htmlFor='photo'>Icon (Optional)</Label>
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

export default UpdateSubcategoryModal;
