import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Form,
	FormGroup,
	Label,
	Input,
	FormFeedback,
} from "reactstrap";
import { useState } from "react";
export type WannaBeInterestType = "Wanna Be" | "Interest";

export interface WannaBeInterestForm {
	type: WannaBeInterestType;
	name: string;
}
interface ModalProps {
	modalOpen: boolean;
	toggleModal: () => void;
	handleSubmit: (data: WannaBeInterestForm) => Promise<void>;
}

const CreateInterestFormModal: React.FC<ModalProps> = ({
	modalOpen,
	toggleModal,
	handleSubmit,
}) => {
	const [formData, setFormData] = useState<WannaBeInterestForm>({
		type: "Wanna Be",
		name: "",
	});

	const [errors, setErrors] = useState<
		Partial<Record<keyof WannaBeInterestForm, string>>
	>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validate = () => {
		const errs: Partial<Record<keyof WannaBeInterestForm, string>> = {};
		if (!formData.type) errs.type = "Type is required";
		if (!formData.name.trim()) errs.name = "Name is required";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	const onSubmit = async () => {
		if (validate()) {
			await handleSubmit(formData);
			setFormData({ type: "" as WannaBeInterestForm["type"], name: "" });
			setErrors({});
			toggleModal();
		}
	};

	return (
		<Modal
			isOpen={modalOpen}
			toggle={toggleModal}
			centered>
			<ModalHeader toggle={toggleModal}>Create Wanna Be Interest</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleChange}
							invalid={!!errors.name}
							placeholder="Enter name"
						/>
						<FormFeedback>{errors.name}</FormFeedback>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button
					color="secondary"
					onClick={toggleModal}>
					Cancel
				</Button>
				<Button
					color="primary"
					onClick={onSubmit}>
					Submit
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default CreateInterestFormModal;
