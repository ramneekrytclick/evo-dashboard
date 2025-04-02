import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const DeleteLessonModal = ({
	isOpen,
	toggle,
	onConfirm,
	lessonTitle,
}: {
	isOpen: boolean;
	toggle: () => void;
	onConfirm: () => void;
	lessonTitle: string;
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
			<ModalBody>
				Are you sure you want to delete the lesson{" "}
				<strong>{lessonTitle}</strong>? This action cannot be undone.
			</ModalBody>
			<ModalFooter>
				<Button
					color="danger"
					onClick={onConfirm}>
					Delete
				</Button>
				<Button
					color="outline-danger"
					onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DeleteLessonModal;
