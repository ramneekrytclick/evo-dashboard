"use client";
import { useEffect, useState } from "react";
import { getCourses } from "@/app/api/admin/course";
import { getImageURL } from "@/CommonComponent/imageURL";
import { CourseProps } from "@/Types/Course.type";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import {
	Badge,
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Progress,
	Row,
	Spinner,
} from "reactstrap";
import {
	getAllCategories,
	getAllCourses,
	getAllSubcategories,
} from "@/app/api/cc";
import { getEnrolledCourses, getMyCourseProgress } from "@/app/api/student";
import CourseCard from "../CourseCard";
const CourseCards = () => {
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const [progress, setProgress] = useState<any[]>([]);
	const [enrolledCourses, setEnrolledCourses] = useState<CourseProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [courses, setCourses] = useState<CourseProps[]>([]);

	const fetchData = async () => {
		try {
			const response = await getCourses();
			const catResponse = await getAllCategories();
			const subcatResponse = await getAllSubcategories();
			const progressResponse = await getMyCourseProgress();
			const enrolledResponse = await getEnrolledCourses();
			setEnrolledCourses(enrolledResponse.enrolledCourses);
			setCourses(response);
			setCategories(catResponse.categories);
			setSubcategories(subcatResponse.subcategories);
			setProgress(progressResponse.progress);
		} catch (error) {
			toast.error("Error fetching courses");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const categoryMap = new Map(categories.map((c) => [c._id, c.title]));
	const subcategoryMap = new Map(subcategories.map((s) => [s._id, s.title]));
	const progressMap = new Map(progress.map((p) => [p.courseId, p]));
	useEffect(() => {
		fetchData();
	}, []);

	const isEnrolled = (courseId: string) =>
		enrolledCourses.some((ec: any) => ec?._id === courseId);
	if (loading || !enrolledCourses || !courses) {
		return (
			<>
				<Container className='d-flex gap-2 text-primary justify-content-center align-items-center'>
					<Spinner />
				</Container>
			</>
		);
	}
	return (
		<Container style={{ height: "80vh", overflow: "auto" }}>
			<Row>
				{courses?.reverse().map((course: any) => {
					const enrolled = enrolledCourses.find(
						(ec: any) => ec?.course?._id === course._id
					);
					const prog = progressMap.get(course._id);
					const percent = prog?.progressPercent || 0;

					return (
						<Col
							xl={4}
							md={6}
							sm={12}
							className='mb-4'
							key={course._id}>
							<CourseCard
								percent={percent}
								prog={prog}
								course={course}
								enrolled={enrolled}
								categoryMap={categoryMap}
								subcategoryMap={subcategoryMap}
							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default CourseCards;
