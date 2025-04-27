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
import { updateWannaBeInterest } from "@/app/api/admin/wannabe"; // You must have this API

interface UpdateInterestModalProps {
	isOpen: boolean;
	toggle: () => void;
	interest: any;
	fetchData: () => void;
}

const UpdateInterestModal = ({
	isOpen,
	toggle,
	interest,
	fetchData,
}: UpdateInterestModalProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: null as File | null,
	});

	useEffect(() => {
		if (interest) {
			setFormData({
				title: interest.title || "",
				description: interest.description || "",
				image: null,
			});
		}
	}, [interest]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFormData({ ...formData, image: e.target.files[0] });
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = new FormData();
			data.append("title", formData.title);
			data.append("description", formData.description);
			if (formData.image) data.append("image", formData.image);

			await updateWannaBeInterest(interest._id, data);
			toast.success("Interest updated successfully!");
			toggle();
			fetchData();
		} catch (error) {
			console.error(error);
			toast.error("Error updating interest!");
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			centered>
			<ModalHeader toggle={toggle}>Update Interest</ModalHeader>
			<Form onSubmit={handleSubmit}>
				<ModalBody>
					<Row className='g-3'>
						<Col md={12}>
							<Label htmlFor='title'>Title</Label>
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
							<Label htmlFor='image'>Change Image (Optional)</Label>
							<Input
								id='image'
								name='image'
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

export default UpdateInterestModal;
