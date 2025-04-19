import { useState } from "react";
import Link from "next/link";
import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Badge,
	Button,
	CardFooter,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
} from "reactstrap";
import { Trash } from "react-feather";
import { CourseProps } from "@/Types/Course.type";
import CourseModal from "./CourseModal";
import { useRouter } from "next/navigation";
import ViewReviewsModal, { Review } from "./ReviewModal";
import UpdateCourseModal from "./UpdateCourseModal";
import { updateCourse } from "@/app/api/admin/course";
import { toast } from "react-toastify";
interface CourseCardProps {
	data: CourseProps;
	fetchData: () => void;
	categories: any[];
	subcategories: any[];
	wannaBeInterests: any[];
	onDelete: (id: string) => void; // Optional delete callback
	reviews: Review[];
}

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL;

const CourseCard = ({
	data,
	fetchData,
	categories,
	subcategories,
	wannaBeInterests,
	onDelete,
	reviews,
}: CourseCardProps) => {
	const router = useRouter();
	const [deleteModal, setDeleteModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	const toggleUpdateModal = () => setUpdateModal(!updateModal);
	const toggleDelete = () => setDeleteModal(!deleteModal);
	const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
	const discountPercent = data.realPrice
		? Math.round(
				((data.realPrice - data.discountedPrice) / data.realPrice) * 100
		  )
		: 0;

	const goToBatches = () => router.push(`/admin/batches/${data._id}`);

	const categoryName =
		categories?.find(
			(c: any) => c._id?.toString() === data.category?.toString()
		)?.title || data.category;

	const subcategoryName =
		subcategories?.find(
			(s: any) => s._id?.toString() === data.subcategory?.toString()
		)?.title || data.subcategory;

	const mappedWannaBe = Array.isArray(data.wannaBeInterest)
		? data.wannaBeInterest.map((w: any) => {
				const matched = wannaBeInterests?.find(
					(i: any) => i._id?.toString() === w?.toString()
				);
				return matched?.title || w;
		  })
		: [
				wannaBeInterests?.find(
					(i: any) => i._id?.toString() === data.wannaBeInterest?.toString()
				)?.title || data.wannaBeInterest,
		  ];

	const confirmDelete = () => {
		if (onDelete) onDelete(data._id || "");
		setDeleteModal(false);
	};

	return (
		<Col
			xl={4}
			className='mb-4'>
			<Card
				className='border-0 shadow-md rounded-4 overflow-auto'
				style={{ height: "650px" }}>
				<div className='position-relative'>
					<CardImg
						top
						width='100%'
						height='200px'
						src={`${backendURL}/uploads/${data.photo}`}
						alt={data.title}
						className='object-fit-cover'
					/>
					{discountPercent > 0 && (
						<Badge
							color='danger'
							pill
							className='position-absolute top-0 end-0 m-3 fs-6'>
							-{discountPercent}% Off
						</Badge>
					)}
				</div>

				<CardBody className='text-start p-4 d-flex flex-column'>
					<Link
						className='fw-semibold text-dark mb-2'
						href={`/admin/course/${data._id}`}>
						<CardTitle
							tag='h4'
							className='mb-2 text-wrap'>
							{data.title}
						</CardTitle>
					</Link>

					<div className='mb-2'>
						<Badge
							color='primary'
							className='me-2'>
							{categoryName}
						</Badge>
						<Badge color='success'>{subcategoryName}</Badge>
					</div>

					<div className='d-flex justify-content-between align-items-center mb-3'>
						<div className='text-muted small'>
							<strong>Interests:</strong>{" "}
							{mappedWannaBe.map((w, i) => (
								<Badge
									key={i}
									color='light'
									className='me-1 text-dark border'>
									{w}
								</Badge>
							))}
						</div>
						<CourseModal
							values={data}
							fetchData={fetchData}
							iconOnly
						/>
					</div>

					<CardText className='text-muted small mb-3 flex-grow-1'>
						{data.description || "-"}
					</CardText>

					<Link href={`/admin/course/${data._id}`}>
						<div className='d-flex align-items-center mb-3'>
							<span className='small text-dark'>
								Created by <strong>{data.createdBy?.trim()}</strong>
							</span>
						</div>
					</Link>
				</CardBody>

				<CardFooter>
					<div className='d-flex justify-content-between align-items-center mb-3'>
						<div className='fs-5 fw-semibold text-dark'>
							₹{data.discountedPrice}
							{data.realPrice && (
								<del className='text-muted ms-2 fs-6'>₹{data.realPrice}</del>
							)}
						</div>
					</div>
					<div className='d-flex gap-2 justify-content-between align-items-center flex-wrap'>
						<Link
							href={`/admin/course/${data._id}`}
							className='btn btn-outline-primary'>
							View Lessons
						</Link>
						<Button
							color='primary'
							onClick={goToBatches}>
							View Batches
						</Button>
						<ViewReviewsModal
							reviews={reviews}
							courseId={data._id || ""}
							fetchReviews={fetchData}
						/>
						<Button
							color='danger'
							size='sm'
							className='d-flex align-items-center rounded-pill'
							onClick={toggleDelete}>
							<Trash size={16} />
						</Button>
						<Button
							color='warning'
							onClick={toggleUpdateModal}>
							Update
						</Button>
					</div>
				</CardFooter>
			</Card>

			{/* Delete Confirmation Modal */}
			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={deleteModal}
				color='danger'
				toggle={toggleDelete}
				centered>
				<ModalHeader
					toggle={toggleDelete}
					className='bg-danger text-light'>
					<div className='text-white'>Confirm Delete</div>
				</ModalHeader>
				<ModalBody>
					<p>
						Are you sure you want to delete <strong>{data.title}</strong>?
					</p>
					<p className='text-danger'>
						This will permanently delete all lessons, reviews, quizzes,
						assignments, and batch links associated with this course.
					</p>

					<hr />
					<p className='fw-semibold mb-2'>
						Type <code>{data.title}</code> to confirm deletion:
					</p>
					<Input
						placeholder='Type course title to confirm...'
						value={deleteConfirmationText}
						onChange={(e) => setDeleteConfirmationText(e.target.value)}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
						onClick={toggleDelete}>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={confirmDelete}
						disabled={deleteConfirmationText !== data.title}>
						Yes, Delete
					</Button>
				</ModalFooter>
			</Modal>
			<UpdateCourseModal
				isOpen={updateModal}
				toggle={toggleUpdateModal}
				course={data}
				categories={categories}
				subcategories={subcategories}
				wannabe={wannaBeInterests}
				onSave={async (formData: any) => {
					try {
						await updateCourse(data._id || "", formData);
						toast.success("Course updated successfully!");
						toggleUpdateModal();
						fetchData();
					} catch (err) {
						console.error("Update failed:", err);
						toast.error("Update failed");
					}
				}}
			/>
		</Col>
	);
};

export default CourseCard;
