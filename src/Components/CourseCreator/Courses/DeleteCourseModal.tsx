import { Course } from "@/Types/Course.type";
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

interface DeleteCourseModalProps {
	isOpen: boolean;
	toggle: () => void;
	course: Course;
	onDelete: (courseId: string) => void;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
	isOpen,
	toggle,
	course,
	onDelete,
}) => {
	const handleDelete = () => {
		onDelete(course._id);
		toggle();
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
			<ModalBody>
				Are you sure you want to delete the course{" "}
				<strong>{course.title || course.name}</strong>?
			</ModalBody>
			<ModalFooter>
				<Button
					color="danger"
					onClick={handleDelete}>
					Delete
				</Button>
				<Button
					color="secondary"
					onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DeleteCourseModal;
