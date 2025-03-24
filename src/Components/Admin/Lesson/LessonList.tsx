"use client";
import { getLessons, deleteLesson } from "@/app/api/admin/lessons/lesson";
import { LessonFormProps } from "@/Types/Lesson.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Card,
	CardBody,
	Col,
	Button,
	Row,
	Modal,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import { useRouter } from "next/navigation";
import { Trash2, Eye } from "react-feather";

const LessonList = ({ id }: { id: string }) => {
	const [lessons, setLessons] = useState<LessonFormProps[]>([]);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [confirmModal, setConfirmModal] = useState(false);
	const router = useRouter();

	const fetchLessons = async () => {
		try {
			const response = await getLessons(id);
			setLessons(response);
		} catch (error) {
			toast.error("Error Fetching Lessons");
		}
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			await deleteLesson(deleteId);
			toast.success("Lesson deleted successfully");
			setConfirmModal(false);
			fetchLessons();
		} catch (err) {
			toast.error("Error deleting lesson");
		}
	};

	useEffect(() => {
		fetchLessons();
	}, []);

	return (
		<Row>
			{lessons.map((lesson, index) => (
				<Col
					xl={4}
					sm={6}
					key={index}
					className="mb-4">
					<Card className="shadow-sm border-0 h-100">
						<CardBody>
							<h5 className="text-truncate">{lesson.title}</h5>
							<p className="text-muted small text-truncate">{lesson.content}</p>
							<a
								href={lesson.videoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="d-block text-primary small mb-2">
								Watch Video
							</a>
							<div className="d-flex justify-content-between">
								<Button
									color="primary"
									size="sm"
									onClick={() =>
										router.push(`/admin/lessons/view/${lesson._id}`)
									}>
									<Eye
										size={14}
										className="me-1"
									/>{" "}
									View
								</Button>
								<Button
									color="danger"
									size="sm"
									onClick={() => {
										setDeleteId(lesson._id || "");
										setConfirmModal(true);
									}}>
									<Trash2
										size={14}
										className="me-1"
									/>{" "}
									Delete
								</Button>
							</div>
						</CardBody>
					</Card>
				</Col>
			))}

			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={confirmModal}
				toggle={() => setConfirmModal(!confirmModal)}>
				<ModalBody>Are you sure you want to delete this lesson?</ModalBody>
				<ModalFooter>
					<Button
						color="danger"
						onClick={handleDelete}>
						Delete
					</Button>
					<Button
						color="secondary"
						onClick={() => setConfirmModal(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</Row>
	);
};

export default LessonList;
