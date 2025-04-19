"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CoursesTitle } from "@/Constant";
import { useEffect, useState } from "react";
import { LessonType } from "@/Types/Lesson.type";

import { toast } from "react-toastify";
import { getAllCourses } from "@/app/api/cc";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Spinner,
} from "reactstrap";
import LessonsCardView from "./LessonsCardView";
import {
	getEnrolledCourses,
	getLessonsByCourseID,
	getMyCourseProgress,
} from "@/app/api/student";

const LessonsPageContainer = ({ id }: { id: string }) => {
	const [lessons, setLessons] = useState<LessonType[]>([]);
	const [course, setCourse] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [enrolledCourses, setEnrolledCourses] = useState<any>([]);
	const [progress, setProgress] = useState();
	const fetchProgress = async () => {
		setLoading(true);
		try {
			const response = await getMyCourseProgress();
			setProgress(response.progress);
		} catch (error) {
			toast.error("Error fetching progress");
		}
	};
	const fetchLessons = async () => {
		try {
			setLoading(true);
			const response = await getLessonsByCourseID(id);
			setLessons(response.lessons);
		} catch (error) {
			toast.error("Error fetching lessons");
		}
		setLoading(false);
	};

	const fetchCourse = async () => {
		try {
			setLoading(true);
			const response = await getAllCourses();
			setCourse(response.courses.find((c: any) => c.id === id));
		} catch (error) {
			toast.error("Error fetching course");
		}
		setLoading(false);
	};
	const fetchEnrolledCourses = async () => {
		try {
			setLoading(true);
			const response = await getEnrolledCourses();
			setEnrolledCourses(response.enrolledCourses);
		} catch (error) {
			toast.error("Error fetching course");
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchLessons();
		fetchCourse();
		fetchEnrolledCourses();
		fetchProgress();
	}, []);

	useEffect(() => {
		console.log(enrolledCourses);
		console.log(course);
	}, [enrolledCourses]);
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

	if (course) {
		return (
			<>
				<Row className='h-100'>
					<Col sm={12}>
						<CardHeader>
							<h4 className='mb-0 text-dark'>Course Lessons</h4>
						</CardHeader>
						<CardBody>
							<LessonsCardView
								lessons={lessons}
								courseId={id}
							/>
						</CardBody>
					</Col>
				</Row>
			</>
		);
	}
};

export default LessonsPageContainer;
