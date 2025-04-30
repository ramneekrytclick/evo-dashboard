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
	getCourses,
} from "@/app/api/admin/course";
import { customTableStyles } from "../Batches/BatchesList";
import { Edit2, Trash, Star } from "react-feather";
import { addReview } from "@/app/api/admin/review";
import { getAllCourses } from "@/app/api/cc";

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
	const [createModal, setCreateModal] = useState(false);
	const [newReview, setNewReview] = useState({
		name: "",
		courseId: "",
		comment: "",
		rating: 5,
	});
	const [courses, setCourses] = useState([]);
	const fetchData = async () => {
		setLoading(true);
		try {
			const courseRes = await getAllCourses();
			const res = await getAllReviews();
			setCourses(courseRes.courses);
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
						color='success'
						size='sm'
						className=' p-2 d-flex  align-items-center justify-content-center'
						style={{ width: "35px", height: "35px" }}
						onClick={() => openEditModal(row)}>
						<Edit2 size={14} />
					</Button>
					<Button
						size='sm'
						color='danger'
						className=' p-2 d-flex  align-items-center justify-content-center'
						style={{ width: "35px", height: "35px" }}
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
					<Button
						className='mb-3'
						color='primary'
						onClick={() => setCreateModal(true)}>
						<i className='ri-add-line align-middle me-2'></i>
						Add Review
					</Button>
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
				isOpen={createModal}
				toggle={() => setCreateModal(false)}
				centered
				size='lg'>
				<ModalHeader toggle={() => setCreateModal(false)}>
					Add Review
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>Reviewer Name</Label>
							<Input
								value={newReview.name}
								onChange={(e) =>
									setNewReview({ ...newReview, name: e.target.value })
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Course</Label>
							<Input
								type='select'
								value={newReview.courseId}
								onChange={(e) =>
									setNewReview({ ...newReview, courseId: e.target.value })
								}>
								<option value=''>Select a course</option>
								{courses.map((course: any) => (
									<option
										key={course._id}
										value={course._id}>
										{course.title}
									</option>
								))}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label>Rating</Label>
							<div>
								{[1, 2, 3, 4, 5].map((i) => (
									<Star
										key={i}
										size={24}
										fill={i <= newReview.rating ? "#FFC107" : "#e4e5e9"}
										color={i <= newReview.rating ? "#FFC107" : "#e4e5e9"}
										className='me-2 cursor-pointer'
										onClick={() => setNewReview({ ...newReview, rating: i })}
									/>
								))}
							</div>
						</FormGroup>
						<FormGroup>
							<Label>Comment</Label>
							<Input
								type='textarea'
								rows={4}
								value={newReview.comment}
								onChange={(e) =>
									setNewReview({ ...newReview, comment: e.target.value })
								}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={async () => {
							try {
								await addReview(
									newReview.courseId,
									newReview.rating,
									newReview.comment,
									newReview.name
								);
								toast.success("Review created successfully");
								setCreateModal(false);
								setNewReview({
									name: "",
									courseId: "",
									comment: "",
									rating: 5,
								});
								fetchData();
							} catch {
								toast.error("Failed to create review");
							}
						}}>
						Create
					</Button>
					<Button
						color='outline-primary'
						onClick={() => setCreateModal(false)}>
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
