import { useState, useEffect } from "react";
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
	UncontrolledTooltip,
} from "reactstrap";
import { QuizQuestion } from "@/Types/Lesson.type";

const EditQuizModal = ({
	isOpen,
	toggle,
	quiz,
	index,
	onSave,
}: {
	isOpen: boolean;
	toggle: () => void;
	quiz: QuizQuestion;
	index: number;
	onSave: (updatedQuiz: QuizQuestion, index: number) => void;
}) => {
	const [question, setQuestion] = useState(quiz.question);
	const [options, setOptions] = useState<string[]>(quiz.options || []);
	const [correctAnswer, setCorrectAnswer] = useState(quiz.correctAnswer || "");

	// Helpers
	const hasDuplicateOptions = () => {
		const normalized = options.map((o) => o.trim().toLowerCase());
		return new Set(normalized).size !== normalized.length;
	};

	const isDuplicate = (opt: string) =>
		options.filter((o) => o.trim().toLowerCase() === opt.trim().toLowerCase())
			.length > 1;

	const hasInvalidForm =
		!question.trim() ||
		options.length === 0 ||
		options.some((o) => !o.trim()) ||
		hasDuplicateOptions();

	const addOptionDisabled = options.some((o) => !o.trim());

	const handleSave = () => {
		const updatedQuiz: QuizQuestion = {
			question,
			options,
			correctAnswer,
		};
		onSave(updatedQuiz, index);
		toggle();
	};

	useEffect(() => {
		if (isOpen) {
			setQuestion(quiz.question);
			setOptions(quiz.options);
			setCorrectAnswer(quiz.correctAnswer);
		}
	}, [isOpen, quiz]);

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Edit Quiz Question</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label>Question</Label>
						<Input
							type="text"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							placeholder="Enter question"
						/>
					</FormGroup>

					<Label>Options</Label>
					{options.map((opt, i) => (
						<div
							key={i}
							className="d-flex gap-2 mb-2 align-items-center">
							<Input
								type="text"
								value={opt}
								placeholder={`Option ${i + 1}`}
								className={`${opt === correctAnswer ? "border-success" : ""} ${
									isDuplicate(opt) ? "border-danger" : ""
								}`}
								onChange={(e) => {
									const updated = [...options];
									updated[i] = e.target.value;
									setOptions(updated);
								}}
							/>
							<Button
								color={opt === correctAnswer ? "success" : "secondary"}
								size="sm"
								onClick={() => setCorrectAnswer(opt)}>
								{opt === correctAnswer ? "✓ Correct" : "Mark Correct"}
							</Button>
							<Button
								color="danger"
								size="sm"
								onClick={() => {
									const filtered = options.filter((_, idx) => idx !== i);
									setOptions(filtered);
									if (opt === correctAnswer) setCorrectAnswer("");
								}}>
								<i className="fa fa-trash" />
							</Button>
						</div>
					))}

					{/* Warning below options */}
					{hasDuplicateOptions() && (
						<p className="text-danger small mt-1">
							Duplicate options detected. Please fix them to proceed.
						</p>
					)}

					<Button
						color="info"
						size="sm"
						className="mt-2"
						disabled={addOptionDisabled}
						id="addOptionBtn"
						onClick={() => setOptions([...options, ""])}>
						+ Add Option
					</Button>

					{addOptionDisabled && (
						<UncontrolledTooltip target="addOptionBtn">
							All existing options must be filled before adding a new one.
						</UncontrolledTooltip>
					)}
				</Form>
			</ModalBody>
			<ModalFooter>
				<div className="d-flex align-items-center gap-2">
					<Button
						color="primary"
						onClick={handleSave}
						disabled={hasInvalidForm}
						id="saveBtn">
						Save
					</Button>
					{hasInvalidForm && (
						<>
							<i
								className="fa fa-info-circle text-warning"
								id="tooltipSave"
							/>
							<UncontrolledTooltip
								target="tooltipSave"
								placement="top">
								Fill the question, complete all options, and remove duplicates.
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

export default EditQuizModal;
