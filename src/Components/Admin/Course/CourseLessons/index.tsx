"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CoursesTitle } from "@/Constant";
import { useEffect, useState } from "react";
import { LessonType } from "@/Types/Lesson.type";
import { getLessons } from "@/app/api/admin/lessons/lesson";
import { toast } from "react-toastify";
import { getAllCourses } from "@/app/api/cc";
import { Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";
import LessonsCardView from "./LessonsCardView";
import CreateLessonModal from "./CreateLessonModal";

const LessonsPageContainer = ({ id }: { id: string }) => {
	const [lessons, setLessons] = useState<LessonType[]>([]);
	const [course, setCourse] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const fetchLessons = async () => {
		try {
			setLoading(true);
			const response = await getLessons(id);
			setLessons(response);
		} catch (error) {
			toast.error("Error fetching lessons");
		}
		setLoading(false);
	};

	const fetchCourse = async () => {
		try {
			setLoading(true);
			const response = await getAllCourses();
			setCourse(response.courses.find((c: any) => c._id === id));
		} catch (error) {
			toast.error("Error fetching course");
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchLessons();
		fetchCourse();
	}, []);
	if (loading) {
		return (
			<>
				<Breadcrumbs
					mainTitle={"Course View"}
					parent={CoursesTitle}
					title={"Course View"}
				/>
				<div className='d-flex justify-content-center align-items-center '>
					Loading Content...
					<Spinner />{" "}
				</div>
			</>
		);
	}

	if (course && !loading) {
		return (
			<>
				<Breadcrumbs
					mainTitle={course.title}
					parent={CoursesTitle}
					title={course.title}
				/>
				<Card
					color='light'
					className='p-2 shadow-lg'>
					<CardHeader className='bg-light d-flex justify-content-between align-items-center'>
						<h4 className='mb-0 text-dark'>Lessons</h4>
						<Button
							color='primary'
							onClick={() => setShowCreateModal(true)}>
							<i className='fa fa-plus me-1' />
							Create Lesson
						</Button>
					</CardHeader>
					<CardBody>
						<LessonsCardView
							lessons={lessons}
							refresh={fetchLessons}
						/>
					</CardBody>
				</Card>

				<CreateLessonModal
					isOpen={showCreateModal}
					toggle={() => setShowCreateModal(false)}
					refresh={fetchLessons}
					courseId={id}
				/>
			</>
		);
	}
};

export default LessonsPageContainer;
