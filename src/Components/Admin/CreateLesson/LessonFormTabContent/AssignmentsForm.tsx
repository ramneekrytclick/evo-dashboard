import { Continue, Previous } from "@/Constant";
import { LessonFormProps } from "@/Types/Lesson.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Form, Input, Label, Row, Button } from "reactstrap";

interface AssignmentsFormProps {
	activeCallBack: (tab: number) => void;
	data: LessonFormProps;
	setData: (data: LessonFormProps) => void;
}

const AssignmentsForm = ({
	activeCallBack,
	data,
	setData,
}: AssignmentsFormProps) => {
	const [assignments, setAssignments] = useState<
		{ title: string; description: string; submissionURL: string }[]
	>([]);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		submissionURL: "",
	});

	const updateFormData = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const addAssignmentEntry = () => {
		if (
			formData.title.trim() &&
			formData.description.trim() &&
			formData.submissionURL.trim()
		) {
			setAssignments([...assignments, { ...formData }]);
			setFormData({ title: "", description: "", submissionURL: "" }); // Clear input fields after adding
		} else {
			toast("All fields are required!");
		}
	};

	const removeAssignmentEntry = (index: number) => {
		const updatedAssignments = assignments.filter((_, i) => i !== index);
		setAssignments(updatedAssignments);
	};

	useEffect(() => {
		setData({ ...data, assignments }); // Sync assignments with parent data
	}, [assignments]);

	const handleNextButton = () => {
		if (assignments.length > 0) {
			activeCallBack(4);
		} else {
			toast("Add at least 1 assignment");
		}
	};

	return (
		<Form
			onSubmit={(e) => e.preventDefault()}
			className="needs-validation"
			noValidate>
			<Row className="g-3">
				<Col sm={4}>
					<Label>
						{"Assignment Title"}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="text"
						placeholder="Assignment Title"
						value={formData.title}
						name="title"
						onChange={updateFormData}
					/>
				</Col>
				<Col sm={4}>
					<Label>
						{"Description"}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="textarea"
						placeholder="Description"
						value={formData.description}
						name="description"
						onChange={updateFormData}
					/>
				</Col>
				<Col sm={4}>
					<Label>
						{"Submission URL"}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="text"
						placeholder="Submission URL"
						value={formData.submissionURL}
						name="submissionURL"
						onChange={updateFormData}
					/>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<Button
						color="primary"
						onClick={addAssignmentEntry}>
						Add Assignment
					</Button>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<ul>
						{assignments.map((assignment, index) => (
							<li
								key={index}
								className="my-2 p-2 bg-light text-dark rounded-3">
								<Row>
									<Col sm={11}>
										<strong>{assignment.title}</strong> -{" "}
										{assignment.description} ( {assignment.submissionURL} )
									</Col>
									<Col sm={1}>
										<Button
											color="danger"
											size="sm"
											className="ms-2 text-end"
											onClick={() => removeAssignmentEntry(index)}>
											Remove
										</Button>
									</Col>
								</Row>
							</li>
						))}
					</ul>
				</Col>
			</Row>
			<Col
				xs={12}
				className="text-end">
				<Button
					color="primary"
					className="me-2"
					onClick={() => activeCallBack(1)}>
					{Previous}
				</Button>
				<Button
					color="primary"
					onClick={handleNextButton}>
					{Continue}
				</Button>
			</Col>
		</Form>
	);
};

export default AssignmentsForm;
