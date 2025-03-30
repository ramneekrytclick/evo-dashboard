import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	Button,
	Card,
	CardBody,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import { useState } from "react";
import { LessonType } from "@/Types/Lesson.type";
import Link from "next/link";
import DeleteLessonModal from "./DeleteLesson";
import { deleteLesson } from "@/app/api/admin/lessons/lesson";
import { toast } from "react-toastify";

const LessonSidebar = ({
	lessons,
	onSelect,
	refresh,
}: {
	lessons: LessonType[];
	onSelect: (lesson: LessonType, view: "video" | "quiz" | "assignment") => void;
	refresh: () => void;
}) => {
	const [open, setOpen] = useState("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedLessonForDelete, setSelectedLessonForDelete] =
		useState<LessonType | null>(null);

	const toggle = (id: string) => setOpen(open === id ? "" : id);

	const openDeleteModal = (lesson: LessonType) => {
		setSelectedLessonForDelete(lesson);
		setShowDeleteModal(true);
	};

	const handleDeleteLesson = async () => {
		if (selectedLessonForDelete) {
			try {
				const response = await deleteLesson(selectedLessonForDelete._id);
				toast.success("Lesson deleted successfully");
			} catch (error) {
				toast.error("Error deleting lesson");
				console.error("Error deleting lesson:", error);
			} finally {
				refresh();
			}
			setShowDeleteModal(false);
		}
	};

	return (
		<>
			<Card
				className="rounded-0 border-start"
				style={{ height: "600px", overflow: "scroll" }}>
				<CardBody>
					<div className="d-flex justify-content-between align-items-center py-2">
						<h2 className="mb-3">Lessons</h2>
						<Link
							className="btn btn-primary"
							href={"/admin/create-lesson"}>
							<i className="fa fa-plus me-2 py-1" /> Add Lesson
						</Link>
					</div>
					<Accordion
						flush
						open={open}
						toggle={toggle}>
						{lessons.map((lesson) => (
							<AccordionItem key={lesson._id}>
								<AccordionHeader targetId={lesson._id}>
									<div className="d-flex justify-content-between align-items-center w-100 ">
										<span>{lesson.title}</span>
										<Button
											color="danger"
											onClick={(e) => {
												e.stopPropagation();
												openDeleteModal(lesson);
											}}>
											<i className="fa fa-trash" />
										</Button>
									</div>
								</AccordionHeader>
								<AccordionBody
									accordionId={lesson._id}
									className="bg-light-dark">
									<ListGroup flush>
										<ListGroupItem
											tag="button"
											action
											onClick={() => onSelect(lesson, "video")}>
											▶️ Video
										</ListGroupItem>
										<ListGroupItem
											tag="button"
											action
											onClick={() => onSelect(lesson, "quiz")}>
											📝 Quiz
										</ListGroupItem>
										<ListGroupItem
											tag="button"
											action
											onClick={() => onSelect(lesson, "assignment")}>
											📄 Assignment
										</ListGroupItem>
									</ListGroup>
								</AccordionBody>
							</AccordionItem>
						))}
					</Accordion>
				</CardBody>
			</Card>

			<DeleteLessonModal
				isOpen={showDeleteModal}
				toggle={() => setShowDeleteModal(false)}
				onConfirm={handleDeleteLesson}
				lessonTitle={selectedLessonForDelete?.title || ""}
			/>
		</>
	);
};

export default LessonSidebar;
