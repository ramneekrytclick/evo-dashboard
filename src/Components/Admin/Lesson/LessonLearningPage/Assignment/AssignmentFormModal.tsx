import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	UncontrolledTooltip,
} from "reactstrap";
import { useState } from "react";
import { createAssignment } from "@/app/api/admin/lessons/assignment";
import { toast } from "react-toastify";

const AssignmentFormModal = ({
	isOpen,
	toggle,
	lessonId,
	refresh,
	onSuccess,
}: {
	isOpen: boolean;
	toggle: () => void;
	lessonId: string;
	onSuccess?: () => void;
	refresh: () => void;
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [attachment, setAttachment] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isFormInvalid = !title.trim() || !description.trim() || !attachment;

	const handleSubmit = async () => {
		if (isFormInvalid) {
			setError("All fields including attachment are required.");
			return;
		}

		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("lessonId", lessonId);
			formData.append("title", title);
			formData.append("description", description);
			formData.append("attachment", attachment);

			await createAssignment(formData);
			toast.success("Assignment created successfully");
			refresh();
			toggle();
			resetForm();
			if (onSuccess) onSuccess();
		} catch (err: any) {
			console.error("Assignment upload error", err);
			setError("Failed to upload assignment.");
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setTitle("");
		setDescription("");
		setAttachment(null);
		setError(null);
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Create Assignment</ModalHeader>
			<ModalBody className="bg-light-warning">
				<Form>
					<FormGroup>
						<Label>Title</Label>
						<Input
							type="text"
							value={title}
							invalid={!title.trim() && error !== null}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter assignment title"
						/>
					</FormGroup>
					<FormGroup>
						<Label>Description</Label>
						<Input
							type="textarea"
							value={description}
							invalid={!description.trim() && error !== null}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Brief description"
						/>
					</FormGroup>
					<FormGroup>
						<Label>PDF Attachment</Label>
						<Input
							type="file"
							id="attachmentField"
							accept=".pdf"
							onChange={(e) =>
								setAttachment(e.target.files ? e.target.files[0] : null)
							}
							invalid={!attachment && error !== null}
						/>
						<small className="text-muted">Only PDF files allowed</small>
					</FormGroup>
					{error && <p className="text-danger mt-2">{error}</p>}
				</Form>
			</ModalBody>
			<ModalFooter>
				<div className="d-flex align-items-center gap-2">
					<Button
						color="primary"
						id="createAssignmentBtn"
						onClick={handleSubmit}
						disabled={loading || isFormInvalid}>
						{loading ? "Uploading..." : "Create"}
					</Button>
					{isFormInvalid && (
						<>
							<i
								className="fa fa-info-circle text-warning"
								id="tooltipCreateAssignment"
							/>
							<UncontrolledTooltip
								target="tooltipCreateAssignment"
								placement="top">
								All fields including PDF attachment are required.
							</UncontrolledTooltip>
						</>
					)}
					<Button
						color="secondary"
						onClick={toggle}>
						Cancel
					</Button>
				</div>
			</ModalFooter>
		</Modal>
	);
};

export default AssignmentFormModal;
