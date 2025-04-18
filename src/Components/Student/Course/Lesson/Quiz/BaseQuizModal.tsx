"use client";

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

interface BaseQuizModalProps {
	isOpen: boolean;
	toggle: () => void;
	onSave: (quizList: QuizQuestion[]) => void;
	initialData?: QuizQuestion[];
	isEdit?: boolean;
}

const BaseQuizModal = ({
	isOpen,
	toggle,
	onSave,
	initialData = [],
	isEdit = false,
}: BaseQuizModalProps) => {
	const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
	const [confirmDiscardOpen, setConfirmDiscardOpen] = useState(false);
	const toggleConfirmDiscard = () => setConfirmDiscardOpen(!confirmDiscardOpen);
	useEffect(() => {
		if (isOpen) {
			setQuizzes(
				initialData.length > 0
					? [...initialData]
					: [{ question: "", options: [""], correctAnswer: "" }]
			);
		}
	}, [isOpen, initialData]);

	const updateQuizField = (
		index: number,
		field: keyof QuizQuestion,
		value: any
	) => {
		const updated = [...quizzes];
		updated[index][field] = value;
		setQuizzes(updated);
	};

	const updateOption = (qIndex: number, oIndex: number, value: string) => {
		const updated = [...quizzes];
		updated[qIndex].options[oIndex] = value;
		setQuizzes(updated);
	};

	const addOption = (qIndex: number) => {
		const updated = [...quizzes];
		updated[qIndex].options.push("");
		setQuizzes(updated);
	};

	const removeOption = (qIndex: number, oIndex: number) => {
		const updated = [...quizzes];
		const removed = updated[qIndex].options.splice(oIndex, 1);
		if (removed[0] === updated[qIndex].correctAnswer) {
			updated[qIndex].correctAnswer = "";
		}
		setQuizzes(updated);
	};

	const addQuestion = () => {
		setQuizzes([
			...quizzes,
			{ question: "", options: [""], correctAnswer: "" },
		]);
	};

	const removeQuestion = (index: number) => {
		const updated = [...quizzes];
		updated.splice(index, 1);
		setQuizzes(updated);
	};

	// Validation
	const isDuplicate = (options: string[]) => {
		const cleaned = options.map((o) => o.trim().toLowerCase());
		return new Set(cleaned).size !== cleaned.length;
	};

	const isInvalidQuiz = (quiz: QuizQuestion) => {
		return (
			!quiz.question.trim() ||
			quiz.options.some((opt) => !opt.trim()) ||
			quiz.correctAnswer.trim() === "" ||
			isDuplicate(quiz.options)
		);
	};

	const isFormInvalid = quizzes.some(isInvalidQuiz);

	const handleSave = () => {
		onSave(quizzes);
		toggle();
	};
	const isReadOnlyQuestion = (qIndex: number) =>
		initialData[qIndex] && !!initialData[qIndex].question;
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size='lg'
			centered>
			<ModalHeader toggle={toggle}>
				{isEdit ? "Edit Quiz Questions" : "Add New Quiz"}
			</ModalHeader>
			<ModalBody style={{ maxHeight: "70vh", overflowY: "auto" }}>
				<Form>
					{quizzes.map((quiz, qIndex) => {
						const duplicates = isDuplicate(quiz.options);
						const isReadOnly = isReadOnlyQuestion(qIndex);

						return (
							<div
								key={qIndex}
								className='border rounded p-3 mb-4 bg-light text-dark'>
								<div className='d-flex justify-content-between align-items-center'>
									<FormGroup className='w-100 me-2'>
										<Label>Question {qIndex + 1}</Label>
										<Input
											type='text'
											value={quiz.question}
											placeholder='Enter question'
											disabled={isReadOnly} // ✅ disables editing
											onChange={(e) =>
												updateQuizField(qIndex, "question", e.target.value)
											}
											invalid={!quiz.question.trim()}
										/>
									</FormGroup>

									{quizzes.length > 1 && !isReadOnly && (
										<Button
											color='danger'
											size='sm'
											onClick={() => removeQuestion(qIndex)}>
											<i className='fa fa-trash' />
										</Button>
									)}
								</div>

								<Label>Options</Label>
								{quiz.options.map((opt, oIndex) => {
									const isDuplicateOpt =
										quiz.options.filter(
											(o) => o.trim().toLowerCase() === opt.trim().toLowerCase()
										).length > 1;

									return (
										<div
											key={oIndex}
											className='d-flex gap-2 mb-2 align-items-center'>
											<Input
												type='text'
												value={opt}
												placeholder={`Option ${oIndex + 1}`}
												onChange={(e) =>
													updateOption(qIndex, oIndex, e.target.value)
												}
												invalid={!opt.trim() || isDuplicateOpt}
											/>
											<Button
												color={
													opt === quiz.correctAnswer
														? "success"
														: "outline-success"
												}
												size='sm'
												onClick={() =>
													updateQuizField(qIndex, "correctAnswer", opt)
												}>
												{opt === quiz.correctAnswer
													? "✓ Correct"
													: "Mark Correct"}
											</Button>
											{quiz.options.length > 1 && (
												<Button
													color='danger'
													size='sm'
													onClick={() => removeOption(qIndex, oIndex)}>
													<i className='fa fa-trash' />
												</Button>
											)}
										</div>
									);
								})}
								{duplicates && (
									<p className='text-danger small mt-1'>
										Duplicate options detected.
									</p>
								)}
								<Button
									color='info'
									size='sm'
									className='mt-2'
									onClick={() => addOption(qIndex)}>
									+ Add Option
								</Button>
							</div>
						);
					})}

					<Button
						color='primary'
						outline
						onClick={addQuestion}>
						+ Add Question
					</Button>
				</Form>
			</ModalBody>
			<ModalFooter>
				<div className='d-flex align-items-center gap-2'>
					<Button
						color='success'
						onClick={handleSave}
						id='saveBtn'
						disabled={isFormInvalid}>
						Save Changes
					</Button>
					{isFormInvalid && (
						<>
							<i
								className='fa fa-info-circle text-danger'
								id='tooltipSave'
							/>
							<UncontrolledTooltip
								target='tooltipSave'
								placement='top'>
								Make sure every question is filled, all options are unique and
								complete, and each question has a correct answer.
							</UncontrolledTooltip>
						</>
					)}
					<Button
						color='outline-danger'
						onClick={toggleConfirmDiscard}>
						Discard Changes
					</Button>
				</div>
			</ModalFooter>
			<Modal
				isOpen={confirmDiscardOpen}
				toggle={toggleConfirmDiscard}
				centered
				size='sm'>
				<ModalHeader toggle={toggleConfirmDiscard}>
					Discard Changes?
				</ModalHeader>
				<ModalBody>
					<p className='text-muted mb-0'>
						Are you sure you want to discard all unsaved quiz changes?
					</p>
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
						onClick={toggleConfirmDiscard}>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={() => {
							toggleConfirmDiscard();
							toggle(); // close main modal
						}}>
						Yes, Discard
					</Button>
				</ModalFooter>
			</Modal>
		</Modal>
	);
};

export default BaseQuizModal;
