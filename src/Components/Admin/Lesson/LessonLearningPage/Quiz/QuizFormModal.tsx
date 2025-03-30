import {
	Button,
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
import { QuizQuestion } from "@/Types/Lesson.type";
import { createQuiz } from "@/app/api/admin/lessons/quiz";
import { toast } from "react-toastify";

const QuizFormModal = ({
	isOpen,
	toggle,
	id,
	refresh,
}: {
	isOpen: boolean;
	toggle: () => void;
	id: string;
	refresh: () => void;
}) => {
	const [quizList, setQuizList] = useState<QuizQuestion[]>([
		{ question: "", options: [""], correctAnswer: "" },
	]);

	const handleQuizChange = (
		index: number,
		field: keyof QuizQuestion,
		value: any
	) => {
		const updated = [...quizList];
		updated[index][field] = value;
		setQuizList(updated);
	};

	const addMoreQuiz = () => {
		setQuizList([
			...quizList,
			{ question: "", options: [""], correctAnswer: "" },
		]);
	};

	const deleteQuiz = (index: number) => {
		const updated = [...quizList];
		updated.splice(index, 1);
		setQuizList(updated);
	};

	const hasDuplicateOptions = (options: string[]) => {
		const normalized = options.map((o) => o.trim().toLowerCase());
		return new Set(normalized).size !== normalized.length;
	};

	const isDuplicate = (opt: string, allOpts: string[]) =>
		allOpts.filter((o) => o.trim().toLowerCase() === opt.trim().toLowerCase())
			.length > 1;

	// 🧠 Global validation
	const hasAnyDuplicates = quizList.some((quiz) =>
		hasDuplicateOptions(quiz.options)
	);

	const hasEmptyQuestions = quizList.some((quiz) => !quiz.question.trim());

	const hasBlankOrNoOptions = quizList.some(
		(quiz) =>
			quiz.options.length === 0 || quiz.options.some((opt) => !opt.trim())
	);

	const isFormInvalid =
		hasAnyDuplicates || hasEmptyQuestions || hasBlankOrNoOptions;

	const handleSubmit = async () => {
		if (isFormInvalid) {
			toast.error("Please fix form issues before submitting.");
			return;
		}

		const data = {
			lessonId: id,
			quizzes: quizList,
		};
		try {
			await createQuiz(data);
			toast.success("Quiz created successfully");
			refresh();
			toggle();
		} catch (error) {
			toast.error("Error creating quiz");
			console.error(error);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size="lg">
			<ModalHeader toggle={toggle}>Add Questions</ModalHeader>
			<ModalBody>
				{quizList.map((quiz, index) => {
					const addOptionDisabled = quiz.options.some((o) => !o.trim());

					return (
						<div
							key={index}
							className="border rounded p-3 mb-4 bg-light-primary position-relative">
							<h6 className="mb-3 d-flex justify-content-between align-items-center">
								<span>Question {index + 1}</span>
								<Button
									color="danger"
									size="sm"
									onClick={() => deleteQuiz(index)}>
									<i className="fa fa-trash me-1" />
									Delete Question
								</Button>
							</h6>

							<FormGroup>
								<Label>Question</Label>
								<Input
									type="text"
									value={quiz.question}
									onChange={(e) =>
										handleQuizChange(index, "question", e.target.value)
									}
									placeholder="Enter question"
								/>
							</FormGroup>

							<Label>Options</Label>
							{quiz.options.map((opt, optIndex) => (
								<div
									key={optIndex}
									className="d-flex gap-2 mb-2 align-items-center">
									<Input
										type="text"
										value={opt}
										placeholder={`Option ${optIndex + 1}`}
										className={`${
											opt === quiz.correctAnswer ? "border-success" : ""
										} ${isDuplicate(opt, quiz.options) ? "border-danger" : ""}`}
										onChange={(e) => {
											const updated = [...quizList];
											updated[index].options[optIndex] = e.target.value;
											setQuizList(updated);
										}}
									/>
									<Button
										color={opt === quiz.correctAnswer ? "success" : "secondary"}
										size="sm"
										onClick={() => {
											const updated = [...quizList];
											updated[index].correctAnswer = opt;
											setQuizList(updated);
										}}>
										{opt === quiz.correctAnswer ? "✓ Correct" : "Mark Correct"}
									</Button>
									<Button
										color="danger"
										size="sm"
										onClick={() => {
											const updated = [...quizList];
											const removed = updated[index].options.splice(
												optIndex,
												1
											);
											if (quiz.correctAnswer === removed[0]) {
												updated[index].correctAnswer = "";
											}
											setQuizList(updated);
										}}>
										<i className="fa fa-trash" />
									</Button>
								</div>
							))}

							{hasDuplicateOptions(quiz.options) && (
								<p className="text-danger small mt-1">
									Duplicate options detected.
								</p>
							)}

							<Button
								color="info"
								size="sm"
								className="mt-2"
								disabled={addOptionDisabled}
								id={`addOption-${index}`}
								onClick={() => {
									const updated = [...quizList];
									updated[index].options.push("");
									setQuizList(updated);
								}}>
								+ Add Option
							</Button>
							{addOptionDisabled && (
								<UncontrolledTooltip target={`addOption-${index}`}>
									All existing options must be filled first
								</UncontrolledTooltip>
							)}
						</div>
					);
				})}

				<Button
					color="primary"
					onClick={addMoreQuiz}>
					+ Add Another Question
				</Button>
			</ModalBody>
			<ModalFooter>
				<div className="d-flex align-items-center gap-2">
					<Button
						color="primary"
						id="createBtn"
						onClick={handleSubmit}
						disabled={isFormInvalid}>
						Create
					</Button>
					{isFormInvalid && (
						<>
							<i
								className="fa fa-info-circle text-warning"
								id="tooltipCreate"
							/>
							<UncontrolledTooltip
								target="tooltipCreate"
								placement="top">
								Please ensure all questions and options are filled and unique.
							</UncontrolledTooltip>
						</>
					)}
					<Button
						color="dark"
						onClick={toggle}>
						Cancel
					</Button>
				</div>
			</ModalFooter>
		</Modal>
	);
};

export default QuizFormModal;
