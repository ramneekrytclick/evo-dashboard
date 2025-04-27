"use client";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { addReview } from "@/app/api/admin/review";

const AddReviewModal = ({
	courseId,
	onSuccess,
}: {
	courseId: string;
	onSuccess: () => void;
}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");
	const [name, setName] = useState("Prashant");
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await addReview(courseId, rating, comment, name);
			console.log(response);
			toast.success("Review added successfully");
			console.log("New Review Submitted", {
				courseId,
				rating,
				comment,
			});
			onSuccess();
		} catch (error) {
			console.error(error);
			toast.error("Error adding review");
		}
		// TODO: Connect to real backend API

		toggle();
	};

	return (
		<>
			<Button
				color='warning'
				onClick={toggle}>
				Add Review
			</Button>

			<Modal
				isOpen={modal}
				toggle={toggle}>
				<ModalHeader toggle={toggle}>Add Review</ModalHeader>
				<Form onSubmit={handleSubmit}>
					<ModalBody>
						<FormGroup>
							<Label for='rating'>Rating (1-5)</Label>
							<Input
								type='number'
								id='rating'
								min={1}
								max={5}
								value={rating}
								onChange={(e) => setRating(Number(e.target.value))}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label for='comment'>Comment</Label>
							<Input
								type='textarea'
								id='comment'
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label for='name'>Name</Label>
							<Input
								type='textarea'
								id='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button
							type='submit'
							color='success'>
							Submit
						</Button>
						<Button
							color='outline-success'
							onClick={toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		</>
	);
};

export default AddReviewModal;
