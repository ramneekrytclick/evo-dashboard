import { useEffect, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Spinner,
} from "reactstrap";
import { Assignment } from "@/Types/Lesson.type";

interface Props {
	isOpen: boolean;
	toggle: () => void;
	assignment: Assignment;
	onSave: (updated: Assignment) => void;
	isSaving?: boolean;
	lessonId: string;
}

const EditAssignmentModal = ({
	isOpen,
	toggle,
	assignment,
	onSave,
	lessonId,
	isSaving = false,
}: Props) => {
	const [title, setTitle] = useState(assignment.title || "");
	const [description, setDescription] = useState(assignment.description || "");

	useEffect(() => {
		if (isOpen) {
			setTitle(assignment.title);
			setDescription(assignment.description);
		}
	}, [isOpen, assignment]);

	const handleSubmit = () => {
		const updated: Assignment = {
			...assignment,
			title,
			description,
		};
		onSave(updated);
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Edit Assignment</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label for='title'>Title</Label>
						<Input
							type='text'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for='description'>Description</Label>
						<Input
							type='textarea'
							id='description'
							rows={5}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button
					color='primary'
					onClick={handleSubmit}
					disabled={!title.trim() || !description.trim() || isSaving}>
					{isSaving ? <Spinner size='sm' /> : "Save Changes"}
				</Button>
				<Button
					color='secondary'
					onClick={toggle}
					disabled={isSaving}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default EditAssignmentModal;
