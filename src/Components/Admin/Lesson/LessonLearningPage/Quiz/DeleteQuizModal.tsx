import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const DeleteQuizModal = ({
	isOpen,
	toggle,
	onConfirm,
	questionText,
}: {
	isOpen: boolean;
	toggle: () => void;
	onConfirm: () => void;
	questionText: string;
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
			<ModalBody>
				Are you sure you want to delete the quiz question:
				<br />
				<strong>{questionText}</strong>?
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

export default DeleteQuizModal;
