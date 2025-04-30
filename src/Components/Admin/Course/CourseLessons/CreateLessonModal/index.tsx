import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateLessonForm from "./CreateLessonModalForm";

const CreateLessonModal = ({
	isOpen,
	toggle,
	refresh,
	courseId,
	courseName,
}: {
	isOpen: boolean;
	toggle: () => void;
	refresh: () => void;
	courseId: string;
	courseName: string;
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size='lg'>
			<ModalHeader toggle={toggle}>Add New Lesson in {courseName}</ModalHeader>
			<ModalBody>
				<CreateLessonForm
					courseId={courseId}
					onSuccess={() => {
						toggle();
						refresh();
					}}
					courseName={courseName}
				/>
			</ModalBody>
		</Modal>
	);
};

export default CreateLessonModal;
