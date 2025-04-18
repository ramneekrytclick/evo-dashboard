import { useState } from "react";
import { LessonType } from "@/Types/Lesson.type";
import {
	Card,
	CardBody,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import Link from "next/link";
import { Trash, Youtube, FileText } from "react-feather";

/**
 * Renders a lesson card with details, actions, and delete confirmation modal
 * @param {Object} props - Component properties
 * @param {LessonType} props.lesson - The lesson data to be displayed
 * @param {(id: string) => void} props.onDelete - Callback function to handle lesson deletion
 * @returns {React.ReactElement} A card component representing a lesson with interactive elements
 */
const LessonCard = ({
	lesson,
	onDelete,
}: {
	lesson: LessonType;
	onDelete: (id: string) => void;
}) => {
	const [modalOpen, setModalOpen] = useState(false);
	const toggleModal = () => setModalOpen(!modalOpen);
	const confirmDelete = () => {
		onDelete(lesson._id);
		toggleModal();
	};

	return (
		<>
			<Card className='shadow-sm h-100 border-0 rounded-4'>
				<CardBody className='p-4 d-flex flex-column justify-content-between'>
					{/* Header */}
					<div className='d-flex justify-content-between align-items-start'>
						<div className='me-2'>
							<Link href={`/admin/course/${lesson.course}/${lesson._id}`}>
								<h5 className='fw-bold mb-1'>{lesson.title}</h5>
							</Link>
							<p className='text-muted mb-3'>{lesson.content}</p>
						</div>
						<Button
							color='light'
							size='sm'
							onClick={toggleModal}
							className='p-1 rounded-circle'>
							<Trash
								className='text-danger'
								size={18}
							/>
						</Button>
					</div>

					{/* Watch Video */}
					{lesson.videoUrl && (
						<Button
							outline
							color='primary'
							size='sm'
							className='w-100 d-flex align-items-center justify-content-center gap-2 mb-3'
							tag={Link}
							href={lesson.videoUrl}
							target='_blank'>
							<Youtube size={16} />
							Watch Video
						</Button>
					)}

					{/* Quiz & Assignment Buttons */}
					<div className='d-flex justify-content-between align-items-center gap-2 mb-3 w-full'>
						<Button
							color='info'
							size='sm'
							className='w-100'
							tag={Link}
							href={`/admin/course/${lesson.course}/${lesson._id}/quiz`}>
							Quiz
						</Button>
						<Button
							color='warning'
							size='sm'
							className='w-100'
							tag={Link}
							href={`/admin/course/${lesson.course}/${lesson._id}/assignment`}>
							Assignment
						</Button>
					</div>

					{/* Resources */}
					<div>
						<strong className='d-block mb-1'>Resources:</strong>
						{lesson.resources?.length > 0 ? (
							<div className='d-flex flex-wrap gap-2'>
								{lesson.resources.map((url, index) => (
									<Button
										key={index}
										color='outline-secondary'
										size='sm'
										tag={Link}
										href={url}
										target='_blank'
										className='d-flex align-items-center gap-1'>
										<FileText size={14} /> Resource {index + 1}
									</Button>
								))}
							</div>
						) : (
							<p className='text-muted small mb-0'>No resources available.</p>
						)}
					</div>
				</CardBody>
			</Card>

			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered>
				<ModalHeader toggle={toggleModal}>Delete Lesson</ModalHeader>
				<ModalBody>
					<p>
						Are you sure you want to delete <strong>{lesson.title}</strong>?
					</p>
					<p className='text-danger mb-0'>
						This will permanently delete all content, quizzes, assignments,
						resources, and associated student progress.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary'
						onClick={toggleModal}>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={confirmDelete}>
						Yes, Delete
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default LessonCard;
