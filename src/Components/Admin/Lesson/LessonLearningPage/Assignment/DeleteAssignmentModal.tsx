import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const DeleteAssignmentModal = ({
	isOpen,
	toggle,
	onConfirm,
	assignmentTitle,
}: {
	isOpen: boolean;
	toggle: () => void;
	onConfirm: () => void;
	assignmentTitle: string;
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
			<ModalBody>
				Are you sure you want to delete the assignment:{" "}
				<strong>{assignmentTitle}</strong>?
			</ModalBody>
			<ModalFooter>
				<Button
					color="danger"
					onClick={onConfirm}>
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

export default DeleteAssignmentModal;
