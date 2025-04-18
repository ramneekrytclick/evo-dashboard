import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateLessonForm from "./CreateLessonModalForm";

const CreateLessonModal = ({
	isOpen,
	toggle,
	refresh,
	courseId,
}: {
	isOpen: boolean;
	toggle: () => void;
	refresh: () => void;
	courseId: string;
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size="lg">
			<ModalHeader toggle={toggle}>Add New Lesson</ModalHeader>
			<ModalBody>
				<CreateLessonForm
					courseId={courseId}
					onSuccess={() => {
						toggle();
						refresh();
					}}
				/>
			</ModalBody>
		</Modal>
	);
};

export default CreateLessonModal;
