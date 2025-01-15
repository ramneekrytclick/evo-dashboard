import { Continue, Previous, Submit } from "@/Constant";
import { LessonFormProps, Question, Quiz } from "@/Types/Lesson.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Form, Input, Label, Row, Button } from "reactstrap";

interface QuizzesFormProps {
    activeCallBack: (tab: number) => void;
    data: LessonFormProps;
    setData: (data: LessonFormProps) => void;
    submitFunction: (data: LessonFormProps) => void;
}

const QuizzesForm = ({ activeCallBack, data, setData, submitFunction }: QuizzesFormProps) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [currentQuiz, setCurrentQuiz] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: "",
        correctAnswer: "",
        options: ["", "", "", ""],
    });

    const updateQuestionData = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        if (index !== undefined) {
            const updatedOptions = [...currentQuestion.options];
            updatedOptions[index] = e.target.value;
            setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
        } else {
            setCurrentQuestion({ ...currentQuestion, [e.target.name]: e.target.value });
        }
    };

    const addQuestion = () => {
        if (
            currentQuestion.question.trim() &&
            currentQuestion.correctAnswer.trim() &&
            currentQuestion.options.every((opt) => opt.trim())
        ) {
            setCurrentQuiz([...currentQuiz, { ...currentQuestion }]);
            setCurrentQuestion({ question: "", correctAnswer: "", options: ["", "", "", ""] });
        } else {
            toast("All fields are required for the question!");
        }
    };

    const removeQuestion = (index: number) => {
        const updatedQuiz = currentQuiz.filter((_, i) => i !== index);
        setCurrentQuiz(updatedQuiz);
    };

    const saveQuiz = () => {
        if (currentQuiz.length > 0) {
            setQuizzes([...quizzes, { questions: currentQuiz }]);
            setCurrentQuiz([]); // Clear current quiz
        } else {
            toast("Add at least one question to save the quiz!");
        }
    };

    const removeQuiz = (index: number) => {
        const updatedQuizzes = quizzes.filter((_, i) => i !== index);
        setQuizzes(updatedQuizzes);
    };

    useEffect(() => {
        setData({ ...data, quizzes }); // Sync quizzes with parent data
    }, [quizzes]);

    const handleSubmit = () => {
        if (quizzes.length > 0) {
            submitFunction(data);
        } else {
            toast("Add at least one quiz!");
        }
    };

    return (
        <Form
            onSubmit={(e) => e.preventDefault()}
            className="needs-validation"
            noValidate>
            <Row className="g-3">
                <Col sm={6}>
                    <Label>
                        {"Question"}
                        <span className="txt-danger">*</span>
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter Question"
                        value={currentQuestion.question}
                        name="question"
                        onChange={updateQuestionData}
                    />
                </Col>
                <Col sm={6}>
                    <Label>
                        {"Correct Answer"}
                        <span className="txt-danger">*</span>
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter Correct Answer"
                        value={currentQuestion.correctAnswer}
                        name="correctAnswer"
                        onChange={updateQuestionData}
                    />
                </Col>
            </Row>
            <Row className="g-3 mt-3">
                {currentQuestion.options.map((option, index) => (
                    <Col sm={3} key={index}>
                        <Label>
                            {`Option ${index + 1}`}
                            <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder={`Enter Option ${index + 1}`}
                            value={option}
                            onChange={(e) => updateQuestionData(e, index)}
                        />
                    </Col>
                ))}
            </Row>
            <Row className="mt-3">
                <Col>
                    <Button color="primary" onClick={addQuestion}>
                        Add Question
                    </Button>
                </Col>
            </Row>
            {currentQuiz.length > 0 && (
                <Row className="mt-3">
                    <Col>
                        <ul>
                            {currentQuiz.map((q, index) => (
                                <li key={index} className="my-2">
                                    <strong>{q.question}</strong>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        className="ms-2"
                                        onClick={() => removeQuestion(index)}>
                                        Remove
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            )}
            <Row className="mt-3">
                <Col>
                    <Button color="success" onClick={saveQuiz}>
                        Save Quiz
                    </Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <ul>
                        {quizzes.map((quiz, quizIndex) => (
                            <li
                                key={quizIndex}
                                className="my-2 p-2 bg-light text-dark rounded-3">
                                <strong>Quiz {quizIndex + 1}</strong>
                                <ul>
                                    {quiz.questions.map((q, qIndex) => (
                                        <li key={qIndex}>{q.question}</li>
                                    ))}
                                </ul>
                                <Button
                                    color="danger"
                                    size="sm"
                                    onClick={() => removeQuiz(quizIndex)}>
                                    Remove Quiz
                                </Button>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
            <Col xs={12} className="text-end">
                <Button color="primary" className="me-2" onClick={() => activeCallBack(3)}>
                    {Previous}
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    {Submit}
                </Button>
            </Col>
        </Form>
    );
};

export default QuizzesForm;
