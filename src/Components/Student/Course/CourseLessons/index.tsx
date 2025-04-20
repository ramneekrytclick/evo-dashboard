"use client";

import { useEffect, useState } from "react";
import { Button, CardHeader, Col, Row, Spinner } from "reactstrap";
import { toast } from "react-toastify";

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CoursesTitle } from "@/Constant";
import { LessonType } from "@/Types/Lesson.type";
import LessonsCardView from "./LessonsCardView";
import {
	getLessonsByCourseID,
	getEnrolledCourses,
	getMyCourseProgress,
} from "@/app/api/student";
import { getAllCourses } from "@/app/api/cc";

const LessonsPageContainer = ({ id }: { id: string }) => {
	const [lessons, setLessons] = useState<LessonType[]>([]);
	const [course, setCourse] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
	const [progress, setProgress] = useState<any>(null);

	const fetchAllData = async () => {
		try {
			setLoading(true);

			const [lessonRes, courseRes, enrolledRes, progressRes] =
				await Promise.all([
					getLessonsByCourseID(id),
					getAllCourses(),
					getEnrolledCourses(),
					getMyCourseProgress(),
				]);

			setLessons(lessonRes.lessons);
			setCourse(courseRes.courses.find((c: any) => c._id === id));
			setEnrolledCourses(enrolledRes.enrolledCourses);
			setProgress(progressRes.progress);
		} catch (error) {
			toast.error("Error loading course data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAllData();
	}, [id]);

	if (loading) {
		return (
			<>
				<div className='d-flex justify-content-center align-items-center py-5'>
					Loading Content... <Spinner className='ms-2' />
				</div>
			</>
		);
	}

	// Check if user is enrolled in this course
	const enrollment = enrolledCourses.find((c) => c.course._id === id);
	const completedLessons = enrollment?.completedLessons || [];
	if (enrollment) {
		return (
			<>
				<Row className='h-100'>
					<Col sm={12}>
						<CardHeader>
							<h4 className='mb-0 text-dark'>Course Lessons</h4>
						</CardHeader>

						<LessonsCardView
							completedLessons={completedLessons}
							lessons={lessons}
							courseId={id}
						/>
					</Col>
				</Row>
			</>
		);
	}
};

export default LessonsPageContainer;
