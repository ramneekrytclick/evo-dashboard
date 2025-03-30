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

	const handleOptionsChange = (index: number, value: string) => {
		const updated = [...quizList];
		updated[index].options = value.split(",").map((opt) => opt.trim());
		setQuizList(updated);
	};

	const addMoreQuiz = () => {
		setQuizList([
			...quizList,
			{ question: "", options: [""], correctAnswer: "" },
		]);
	};

	const handleSubmit = async () => {
		console.log("Submitting Quiz List", quizList);
		const data = {
			lessonId: id,
			quizzes: quizList,
		};
		try {
			const response = await createQuiz(data);
			toast.success("Quiz created successfully");
			refresh();
		} catch (error) {
			toast.error("Error creating quiz");
			console.error(error);
		}
		// call API or callback here
		toggle();
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size="lg">
			<ModalHeader toggle={toggle}>Create Quiz</ModalHeader>
			<ModalBody>
				{quizList.map((quiz, index) => (
					<Form
						key={index}
						className="border p-3 mb-3 rounded">
						<h6>Question {index + 1}</h6>
						<FormGroup>
							<Label>Question</Label>
							<Input
								type="text"
								value={quiz.question}
								onChange={(e) =>
									handleQuizChange(index, "question", e.target.value)
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Options (comma separated)</Label>
							<Input
								type="text"
								value={quiz.options.join(", ")}
								onChange={(e) => handleOptionsChange(index, e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Correct Answer</Label>
							<Input
								type="text"
								value={quiz.correctAnswer}
								onChange={(e) =>
									handleQuizChange(index, "correctAnswer", e.target.value)
								}
							/>
						</FormGroup>
					</Form>
				))}
				<Button
					color="secondary"
					onClick={addMoreQuiz}>
					+ Add Another Question
				</Button>
			</ModalBody>
			<ModalFooter>
				<Button
					color="primary"
					onClick={handleSubmit}>
					Create
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

export default QuizFormModal;
