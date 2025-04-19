"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLessonById, deleteLesson } from "@/app/api/admin/lessons/lesson";
import { LessonType } from "@/Types/Lesson.type";
import { toast } from "react-toastify";
import {
	Spinner,
	Card,
	CardBody,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import Link from "next/link";
import { FileText, Trash2 } from "react-feather";

const LessonContainer = ({
	lessonId,
	courseId,
}: {
	courseId: string;
	lessonId: string;
}) => {
	const router = useRouter();
	const [data, setData] = useState<LessonType | null>(null);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	const toggleModal = () => setModalOpen(!modalOpen);

	const fetchData = async () => {
		try {
			const response = await getLessonById(lessonId, courseId);
			if (!response || Object.keys(response).length === 0) {
				toast.error("Lesson not found");
				return;
			}
			setData(response);
		} catch (error) {
			toast.error("Failed to fetch lessonss");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteLesson(lessonId);
			toast.success("Lesson deleted successfully");
			router.push(`/admin/course/${courseId}`);
		} catch (err) {
			toast.error("Error deleting lesson");
		}
	};

	useEffect(() => {
		if (lessonId && courseId) {
			fetchData();
		} else {
			toast.error("lessonId or courseId is undefined");
			setLoading(false);
		}
	}, [lessonId, courseId]);

	if (loading) return <Spinner className='m-3' />;
	if (!data) return <p className='text-muted'>No data available.</p>;

	// Utility to embed YouTube video
	const getYoutubeEmbedUrl = (url: string) => {
		const match = url.match(
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
		);
		return match ? `https://www.youtube.com/embed/${match[1]}` : null;
	};

	const videoEmbed = data.videoUrl ? getYoutubeEmbedUrl(data.videoUrl) : null;

	return (
		<>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<h4 className='fw-bold mb-0'>{data.title}</h4>
				<Button
					color='light'
					onClick={toggleModal}
					className='p-1 rounded-circle'>
					<Trash2
						size={16}
						className='text-danger'
					/>
				</Button>
			</div>

			{/* Video Section */}
			{videoEmbed && (
				<div className='mb-4'>
					<div className='ratio ratio-16x9'>
						<iframe
							src={videoEmbed}
							title='Lesson Video'
							allowFullScreen
							className='rounded border'></iframe>
					</div>
				</div>
			)}

			{/* Content Section */}
			<div className='mb-4'>
				<h6 className='fw-semibold'>{data.title}</h6>
				<p className='text-muted'>{data.content}</p>
			</div>

			{/* Resources Section */}
			<div className='mb-4'>
				<h6 className='fw-semibold'>Resources</h6>
				{data.resources && data.resources.length > 0 ? (
					<div className='d-flex flex-wrap gap-2'>
						{data.resources.map((url, index) => (
							<Button
								key={index}
								color='outline-secondary'
								size='sm'
								tag={Link}
								href={url}
								target='_blank'
								className='d-flex align-items-center gap-1'>
								<FileText size={14} /> View Resource {index + 1}
							</Button>
						))}
					</div>
				) : (
					<p className='text-muted'>No resources available.</p>
				)}
			</div>

			{/* Navigation Buttons */}
			<div className='d-flex gap-3'>
				<Button
					color='info'
					onClick={() =>
						router.push(`/admin/course/${courseId}/${lessonId}/quiz`)
					}>
					View Quiz
				</Button>
				<Button
					color='warning'
					onClick={() =>
						router.push(`/admin/course/${courseId}/${lessonId}/assignment`)
					}>
					View Assignment
				</Button>
			</div>

			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered>
				<ModalHeader toggle={toggleModal}>Delete Lesson</ModalHeader>
				<ModalBody>
					<p>
						Are you sure you want to delete <strong>{data.title}</strong>?
					</p>
					<p className='text-danger mb-0'>
						This will permanently remove all associated videos, quizzes,
						assignments, and student progress.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
						onClick={toggleModal}>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={handleDelete}>
						Yes, Delete
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default LessonContainer;
