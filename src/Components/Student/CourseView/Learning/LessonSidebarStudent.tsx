import { LessonType } from "@/Types/Lesson.type";
import { useState } from "react";
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	Card,
	CardBody,
	ListGroup,
	ListGroupItem,
} from "reactstrap";

const LessonSidebar = ({
	lessons,
	onSelect,
}: {
	lessons: LessonType[];
	onSelect: (lesson: LessonType, view: "video" | "quiz" | "assignment") => void;
}) => {
	const [open, setOpen] = useState("");
	const toggle = (id: string) => setOpen(open === id ? "" : id);

	return (
		<Card className="rounded-0 border-start">
			<CardBody>
				<h2 className="mb-3">Lessons</h2>
				<div style={{ height: "550px", overflow: "scroll" }}>
					<Accordion
						flush
						open={open}
						toggle={toggle}>
						{lessons?.map((lesson) => (
							<AccordionItem key={lesson._id}>
								<AccordionHeader targetId={lesson._id}>
									{lesson.title}
								</AccordionHeader>
								<AccordionBody
									accordionId={lesson._id}
									className="bg-light">
									<ListGroup flush>
										<ListGroupItem
											tag="button"
											action
											onClick={() => onSelect(lesson, "video")}>
											View Lesson
										</ListGroupItem>

										{lesson.quizzes?.length > 0 && (
											<ListGroupItem
												tag="button"
												action
												onClick={() => onSelect(lesson, "quiz")}>
												Quiz
											</ListGroupItem>
										)}

										{lesson.assignments?.length > 0 && (
											<ListGroupItem
												tag="button"
												action
												onClick={() => onSelect(lesson, "assignment")}>
												Assignments
											</ListGroupItem>
										)}
									</ListGroup>
								</AccordionBody>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</CardBody>
		</Card>
	);
};

export default LessonSidebar;
