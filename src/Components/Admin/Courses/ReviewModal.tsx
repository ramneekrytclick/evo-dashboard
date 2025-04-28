"use client";

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge,
	Input,
} from "reactstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateReview, deleteReview } from "@/app/api/admin/course"; // Assuming you have APIs
import AddReviewModal from "./AddReviewModal";
import { getReviewsByCourseSlug } from "@/app/api/admin/review";

export interface Review {
	_id: string;
	rating: number;
	comment: string;
	student?: string | null;
	createdAt: string;
	course: { _id: string; title: string };
	user?: any;
	name: string;
}

interface ViewReviewsModalProps {
	reviews: Review[];
	courseId: string;
	fetchReviews: () => void;
}

const ViewReviewsModal = ({
	reviews = [],
	courseId,
	fetchReviews,
}: ViewReviewsModalProps) => {
	const [modal, setModal] = useState(false);
	const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
	const [editReview, setEditReview] = useState<Review | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	const toggle = () => {
		setModal(!modal);
		fetchReviews();
	};

	useEffect(() => {
		const filtered = reviews.filter(
			(review) => review.course?._id === courseId
		);
		setFilteredReviews(filtered);
	}, [reviews, courseId]);

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			await deleteReview(deleteId);
			toast.success("Review deleted successfully");
			fetchReviews();
			setDeleteId(null);
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete review");
		}
	};

	const handleUpdate = async () => {
		if (!editReview) return;
		try {
			await updateReview(editReview._id, editReview.comment, editReview.rating);
			toast.success("Review updated successfully");
			fetchReviews();
			setEditReview(null);
		} catch (error) {
			console.error(error);
			toast.error("Failed to update review");
		}
	};

	return (
		<>
			<Button
				color='warning'
				onClick={toggle}>
				View Reviews
			</Button>
			<Modal
				isOpen={modal}
				toggle={toggle}
				size='lg'>
				<ModalHeader toggle={toggle}>Course Reviews</ModalHeader>
				<ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
					{filteredReviews.length === 0 ? (
						<p className='text-muted'>No reviews yet.</p>
					) : (
						filteredReviews.map((review) => (
							<div
								key={review._id}
								className='border-bottom pb-3 mb-3'>
								<div className='d-flex justify-content-between'>
									<span className='text-muted fs-6'>
										{review.name || "Unknown"}
									</span>
									<div>
										<Button
											size='sm'
											color='info'
											className='me-2'
											onClick={() => setEditReview(review)}>
											Edit
										</Button>
										<Button
											size='sm'
											color='danger'
											onClick={() => setDeleteId(review._id)}>
											Delete
										</Button>
									</div>
								</div>
								<h6 className='mb-2 fw-medium'>{review.comment}</h6>
								<div className='d-flex align-items-center'>
									{new Array(review.rating).fill("").map((_, idx) => (
										<div
											key={idx}
											className='fa fa-star me-1 text-warning'
										/>
									))}
									<small className='text-muted ms-2'>
										{new Date(review.createdAt).toLocaleDateString()}
									</small>
								</div>
							</div>
						))
					)}
				</ModalBody>
				<ModalFooter>
					<AddReviewModal
						courseId={courseId}
						onSuccess={fetchReviews}
					/>
					<Button
						color='outline-warning'
						onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>

			{/* Edit Review Modal */}
			<Modal
				isOpen={!!editReview}
				toggle={() => setEditReview(null)}>
				<ModalHeader toggle={() => setEditReview(null)}>
					Edit Review
				</ModalHeader>
				<ModalBody>
					<Input
						type='textarea'
						value={editReview?.comment || ""}
						onChange={(e) =>
							setEditReview((prev) =>
								prev ? { ...prev, comment: e.target.value } : null
							)
						}
					/>
					<Input
						type='number'
						value={editReview?.rating || 5}
						className='mt-3'
						min={1}
						max={5}
						onChange={(e) =>
							setEditReview((prev) =>
								prev ? { ...prev, rating: Number(e.target.value) } : null
							)
						}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						color='success'
						onClick={handleUpdate}>
						Update
					</Button>
					<Button
						color='outline-secondary'
						onClick={() => setEditReview(null)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>

			{/* Confirm Delete Modal */}
			<Modal
				isOpen={!!deleteId}
				toggle={() => setDeleteId(null)}>
				<ModalHeader toggle={() => setDeleteId(null)}>
					Confirm Delete
				</ModalHeader>
				<ModalBody>Are you sure you want to delete this review?</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						onClick={handleDelete}>
						Delete
					</Button>
					<Button
						color='outline-secondary'
						onClick={() => setDeleteId(null)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default ViewReviewsModal;
