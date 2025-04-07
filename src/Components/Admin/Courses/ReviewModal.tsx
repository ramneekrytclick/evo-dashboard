"use client";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge,
} from "reactstrap";
import { useState } from "react";
import { Star } from "react-feather";
import AddReviewModal from "./AddReviewModal";

interface Review {
	_id: string;
	rating: number;
	comment: string;
	student?: string | null;
	createdAt: string;
}

interface ViewReviewsModalProps {
	reviews: Review[];
	courseId: string;
}

const ViewReviewsModal = ({
	reviews = [],
	courseId,
}: ViewReviewsModalProps) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<>
			<Button
				color="success"
				size="sm"
				onClick={toggle}>
				View Reviews
			</Button>

			<Modal
				isOpen={modal}
				toggle={toggle}
				size="lg">
				<ModalHeader toggle={toggle}>Course Reviews</ModalHeader>
				<ModalBody>
					{reviews.length === 0 ? (
						<p className="text-muted">No reviews yet.</p>
					) : (
						reviews.map((review) => (
							<div
								key={review._id}
								className="border-bottom pb-3 mb-3">
								<div className="d-flex align-items-center mb-1">
									<Badge
										color="warning"
										className="me-2 text-dark">
										<Star
											size={12}
											className="me-1"
										/>
										{review.rating}
									</Badge>
									<small className="text-muted">
										{new Date(review.createdAt).toLocaleDateString()}
									</small>
								</div>
								<p className="mb-0">{review.comment}</p>
							</div>
						))
					)}
				</ModalBody>
				<ModalFooter>
					<AddReviewModal courseId={courseId} />
					<Button
						color="secondary"
						onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default ViewReviewsModal;
