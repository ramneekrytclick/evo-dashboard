"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Card,
	CardBody,
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionBody,
	ListGroup,
	ListGroupItem,
	Button,
} from "reactstrap";
import { FileText, List, Youtube, ArrowLeftCircle, Plus } from "react-feather";
import { useEffect, useState } from "react";
import { getLessons } from "@/app/api/admin/lessons/lesson";
import CreateLessonModal from "../CourseLessons/CreateLessonModal";

const LessonSidebar = ({
	courseId,
	lessonId,
}: {
	courseId: string;
	lessonId: string;
}) => {
	const pathname = usePathname();
	const [lessons, setLessons] = useState<any[]>([]);
	const [openLesson, setOpenLesson] = useState<string>(lessonId || "");
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchLessons = async () => {
			const result = await getLessons(courseId);
			setLessons(result);
		};
		fetchLessons();
	}, [courseId]);

	const toggle = (id: string) => {
		setOpenLesson((prev) => (prev === id ? "" : id));
	};

	const handleSuccess = async () => {
		setShowModal(false);
		const updatedLessons = await getLessons(courseId);
		setLessons(updatedLessons);
	};

	return (
		<CardBody className='h-100 bg-light-subtle d-flex flex-column'>
			<h6 className='fw-bold text-secondary mb-3 d-flex align-items-center gap-2'>
				<Link href={`/admin/course/${courseId}`}>
					<ArrowLeftCircle
						size={18}
						className='text-warning'
					/>
				</Link>
				Lessons
			</h6>
			<div style={{ maxHeight: "60vw", overflowY: "auto", width: "100%" }}>
				<Accordion
					open={openLesson}
					toggle={toggle}
					flush>
					{lessons.map((lesson) => (
						<AccordionItem key={lesson._id}>
							<AccordionHeader targetId={lesson._id}>
								{lesson.title}
							</AccordionHeader>
							<AccordionBody accordionId={lesson._id}>
								<ListGroup flush>
									<ListGroupItem
										tag={Link}
										href={`/admin/course/${courseId}/${lesson._id}`}
										action
										className={
											pathname === `/admin/course/${courseId}/${lesson._id}`
												? "fw-semibold bg-light text-primary"
												: "text-dark"
										}>
										<Youtube size={14} /> Lesson Overview
									</ListGroupItem>
									<ListGroupItem
										tag={Link}
										href={`/admin/course/${courseId}/${lesson._id}/quiz`}
										action
										className={
											pathname ===
											`/admin/course/${courseId}/${lesson._id}/quiz`
												? "fw-semibold bg-light text-primary"
												: "text-dark"
										}>
										<List size={14} /> Quiz
									</ListGroupItem>
									<ListGroupItem
										tag={Link}
										href={`/admin/course/${courseId}/${lesson._id}/assignment`}
										action
										className={
											pathname ===
											`/admin/course/${courseId}/${lesson._id}/assignment`
												? "fw-semibold bg-light text-primary"
												: "text-dark"
										}>
										<FileText size={14} /> Assignment
									</ListGroupItem>
								</ListGroup>
							</AccordionBody>
						</AccordionItem>
					))}
				</Accordion>
			</div>

			<div className='mt-auto pt-3 border-top w-100'>
				<Button
					color='success'
					className='w-100 d-flex align-items-center justify-content-center gap-2'
					onClick={() => setShowModal(true)}>
					<Plus size={16} />
					Add Lesson
				</Button>
			</div>

			<CreateLessonModal
				isOpen={showModal}
				toggle={() => setShowModal(false)}
				courseId={courseId}
				refresh={handleSuccess}
			/>
		</CardBody>
	);
};

export default LessonSidebar;
