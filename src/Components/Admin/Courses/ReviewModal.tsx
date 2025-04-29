"use client";

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge,
	Input,
	Spinner,
	ButtonGroup,
} from "reactstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	updateReview,
	deleteReview,
	getAllReviews,
} from "@/app/api/admin/course"; // Assuming you have APIs
import AddReviewModal from "./AddReviewModal";
import { getReviewsByCourseSlug } from "@/app/api/admin/review";
import { Edit2, Trash } from "react-feather";

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
	courseId: string;
}

const ViewReviewsModal = ({ courseId }: ViewReviewsModalProps) => {
	const [modal, setModal] = useState(false);
	const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
	const [editReview, setEditReview] = useState<Review | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [allReviews, setAllReviews] = useState<Review[]>([]);

	const toggle = () => {
		setModal(!modal);
	};
	const fetchReviews = async () => {
		try {
			setLoading(true);
			const response = await getAllReviews();
			setAllReviews(response.reviews);
		} catch (error) {
			toast.error("Error fetching reviews");
		}
		setLoading(false);
	};
	useEffect(() => {
		const filtered = allReviews.filter(
			(review) => review.course?._id === courseId
		);
		setFilteredReviews(filtered);
	}, [allReviews, courseId]);

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

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<>
			<Button
				color='warning'
				onClick={toggle}>
				Reviews
			</Button>
			<Modal
				isOpen={modal}
				toggle={toggle}
				size='lg'>
				<ModalHeader toggle={toggle}>Course Reviews</ModalHeader>
				<ModalBody style={{ maxHeight: "500px", overflowY: "auto" }}>
					{loading ? (
						<div className='d-flex align-items-center justify-content-center'>
							Loading...
							<Spinner />
						</div>
					) : (
						<>
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
											<ButtonGroup>
												<Button
													color='success'
													size='sm'
													className=' p-2 d-flex  align-items-center justify-content-center'
													style={{ width: "35px", height: "35px" }}
													onClick={() => setDeleteId(review._id)}>
													<Edit2 size={16} />
												</Button>
												<Button
													color='danger'
													size='sm'
													className=' p-2 d-flex  align-items-center justify-content-center'
													style={{ width: "35px", height: "35px" }}
													onClick={() => setDeleteId(review._id)}>
													<Trash size={16} />
												</Button>
											</ButtonGroup>
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
						</>
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
