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
} from "reactstrap";
import { useState } from "react";
import { createAssignment } from "@/app/api/admin/lessons/assignment";

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

	const handleSubmit = async () => {
		if (!title || !description || !attachment) {
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

			const response = await createAssignment(formData); // Must accept FormData in the API
			console.log("Assignment created:", response);
			refresh();
			toggle(); // close modal
			resetForm();
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
			<ModalBody>
				<Form>
					{error && <div className="text-danger mb-2">{error}</div>}
					<FormGroup>
						<Label>Title</Label>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Description</Label>
						<Input
							type="textarea"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>PDF Attachment</Label>
						<Input
							type="file"
							accept=".pdf"
							onChange={(e) =>
								setAttachment(e.target.files ? e.target.files[0] : null)
							}
						/>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button
					color="primary"
					onClick={handleSubmit}
					disabled={loading}>
					{loading ? "Uploading..." : "Create"}
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

export default AssignmentFormModal;
