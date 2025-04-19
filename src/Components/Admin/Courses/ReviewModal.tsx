"use client";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge,
} from "reactstrap";
import { useEffect, useState } from "react";
import { Star } from "react-feather";
import AddReviewModal from "./AddReviewModal";
import { getAllReviews } from "@/app/api/admin/course";
import { toast } from "react-toastify";

export interface Review {
	_id: string;
	rating: number;
	comment: string;
	student?: string | null;
	createdAt: string;
	course: { _id: string; title: string };
	user?: any;
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
	const toggle = () => {
		setModal(!modal);

		fetchReviews();
	};
	const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
	useEffect(() => {
		const filtered = reviews.filter(
			(review) => review.course?._id === courseId
		);
		setFilteredReviews(filtered);
	}, [reviews, courseId]);
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
				<ModalBody
					style={{
						maxHeight: "500px",
						overflowY: "auto",
					}}>
					{filteredReviews.length === 0 ? (
						<p className='text-muted'>No reviews yet.</p>
					) : (
						filteredReviews.map((review) => (
							<div
								key={review._id}
								className='border-bottom pb-3 mb-3'>
								<h6 className='mb-3'>{review.comment}</h6>
								<div className='d-flex align-items-center mb-1'>
									{new Array(review?.rating || 5).fill("").map((_, index) => (
										<Star
											key={index}
											size={20}
											className='me-1 text-warning'
										/>
									))}
									<small className='text-muted'>
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
		</>
	);
};

export default ViewReviewsModal;
