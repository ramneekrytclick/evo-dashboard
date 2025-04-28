"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Input,
	Label,
	Card,
	CardBody,
	ButtonGroup,
} from "reactstrap";
import {
	getAllReviews,
	updateReview,
	deleteReview,
} from "@/app/api/admin/course";
import { customTableStyles } from "../Batches/BatchesList";
import { Edit2, Trash, Star } from "react-feather";

interface Review {
	_id: string;
	course: { _id: string; title: string };
	user: any;
	rating: number;
	name: string;
	comment: string;
	createdAt: string;
	updatedAt: string;
}

const ReviewsContainer = () => {
	const [loading, setLoading] = useState(true);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [modal, setModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedReview, setSelectedReview] = useState<Review | null>(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(5);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getAllReviews();
			setReviews(res.reviews);
		} catch (error) {
			toast.error("Error fetching reviews");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const openEditModal = (review: Review) => {
		setSelectedReview(review);
		setComment(review.comment);
		setRating(review.rating);
		setIsEditMode(true);
		setModal(true);
	};

	const openDeleteModal = (review: Review) => {
		setSelectedReview(review);
		setDeleteModal(true);
	};

	const handleDelete = async () => {
		if (!selectedReview) return;
		try {
			await deleteReview(selectedReview._id);
			toast.success("Review deleted successfully");
			setDeleteModal(false);
			fetchData();
		} catch (error) {
			toast.error("Failed to delete review");
		}
	};

	const handleUpdate = async () => {
		if (!selectedReview) return;
		try {
			await updateReview(selectedReview._id, comment, rating);
			toast.success("Review updated successfully");
			setModal(false);
			fetchData();
		} catch (error) {
			toast.error("Failed to update review");
		}
	};

	const columns: TableColumn<Review>[] = [
		{
			name: "Course",
			selector: (row) => row.course?.title || "-",
			sortable: true,
		},
		{
			name: "Name",
			selector: (row) => row.name || "Anonymous",
			sortable: true,
			center: true,
		},
		{
			name: "Rating",
			center: true,
			cell: (row) => (
				<div className='d-flex align-items-center'>
					{[1, 2, 3, 4, 5].map((i) => (
						<Star
							key={i}
							size={20}
							fill={i <= row.rating ? "#FFC107" : "#e4e5e9"}
							color={i <= row.rating ? "#FFC107" : "#e4e5e9"}
							className='me-1'
						/>
					))}
				</div>
			),
		},
		{
			name: "Comment",
			selector: (row) =>
				row.comment?.length > 30
					? row.comment.slice(0, 30) + "..."
					: row.comment,
			center: true,
		},
		{
			name: "Actions",
			right: true,
			cell: (row) => (
				<ButtonGroup>
					<Button
						size='sm'
						color='primary'
						className='p-2'
						onClick={() => openEditModal(row)}>
						<Edit2 size={14} />
					</Button>
					<Button
						size='sm'
						color='danger'
						className='p-2'
						onClick={() => openDeleteModal(row)}>
						<Trash size={14} />
					</Button>
				</ButtonGroup>
			),
		},
	];

	if (loading) return <h2>Loading reviews...</h2>;

	return (
		<>
			<Breadcrumbs
				title='Course Reviews'
				parent='Admin'
				mainTitle='Reviews'
			/>
			<Card>
				<CardBody>
					<DataTable
						columns={columns}
						data={reviews}
						pagination
						highlightOnHover
						striped
						responsive
						customStyles={customTableStyles}
						noDataComponent={<p>No reviews found.</p>}
					/>
				</CardBody>
			</Card>
			<Modal
				isOpen={modal}
				toggle={() => setModal(false)}
				centered
				size='lg'>
				<ModalHeader toggle={() => setModal(false)}>Update Review</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>Reviewer Name</Label>
							<Input
								disabled
								value={selectedReview?.name || "Anonymous"}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Course</Label>
							<Input
								disabled
								value={selectedReview?.course?.title || "-"}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Rating</Label>
							<div>
								{[1, 2, 3, 4, 5].map((i) => (
									<Star
										key={i}
										size={24}
										fill={i <= rating ? "#FFC107" : "#e4e5e9"}
										color={i <= rating ? "#FFC107" : "#e4e5e9"}
										className='me-2 cursor-pointer'
										onClick={() => isEditMode && setRating(i)}
									/>
								))}
							</div>
						</FormGroup>
						<FormGroup>
							<Label>Comment</Label>
							<Input
								type='textarea'
								rows={4}
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={handleUpdate}>
						Update
					</Button>
					<Button
						color='outline-primary'
						onClick={() => setModal(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<Modal
				isOpen={deleteModal}
				toggle={() => setDeleteModal(false)}
				centered>
				<ModalHeader toggle={() => setDeleteModal(false)}>
					Delete Review
				</ModalHeader>
				<ModalBody>Are you sure you want to delete this review?</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						onClick={handleDelete}>
						Delete
					</Button>
					<Button
						color='outline-danger'
						onClick={() => setDeleteModal(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default ReviewsContainer;
