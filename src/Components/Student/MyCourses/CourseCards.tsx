"use client";
import { getAllCategories, getAllSubcategories } from "@/app/api/cc";
import { getEnrolledCourses, getMyCourseProgress } from "@/app/api/student";
import { getImageURL } from "@/CommonComponent/imageURL";
import { CourseProps } from "@/Types/Course.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	Col,
	Container,
	Progress,
	Row,
	Spinner,
} from "reactstrap";
import CourseCard from "../CourseCard";
import WelcomeCard from "../Dashboard/Welcome";

const MyEnrolledCourses = () => {
	const [loading, setLoading] = useState(true);
	const [enrolledCourses, setEnrolledCourses] = useState<
		{
			course: CourseProps;
			completedLessons: any[];
		}[]
	>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const [progress, setProgress] = useState<any[]>([]);

	const fetchCourses = async () => {
		setLoading(true);
		try {
			const response = await getEnrolledCourses();
			setEnrolledCourses(response.enrolledCourses);
		} catch (error) {
			toast.error("Error fetching courses");
		} finally {
			setLoading(false);
		}
	};

	const fetchCategories = async () => {
		setLoading(true);

		try {
			const response = await getAllCategories();
			setCategories(response.categories);
		} catch (error) {
			toast.error("Error fetching categories");
		} finally {
			setLoading(false);
		}
	};

	const fetchSubcategories = async () => {
		setLoading(true);

		try {
			const response = await getAllSubcategories();
			setSubcategories(response.subcategories);
		} catch (error) {
			toast.error("Error fetching subcategories");
		} finally {
			setLoading(false);
		}
	};

	const getProgress = async () => {
		setLoading(true);

		try {
			const response = await getMyCourseProgress();
			setProgress(response.progress);
		} catch (error) {
			toast.error("Error fetching progress");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourses();
		fetchCategories();
		fetchSubcategories();
		getProgress();
	}, []);

	const categoryMap = new Map(categories.map((c) => [c._id, c.title]));
	const subcategoryMap = new Map(subcategories.map((s) => [s._id, s.title]));
	const progressMap = new Map(progress.map((p) => [p.courseId, p]));

	if (loading || !enrolledCourses) {
		return (
			<>
				<Container className='d-flex gap-2 text-primary justify-content-center align-items-center'>
					<Spinner />
				</Container>
			</>
		);
	}
	if (enrolledCourses.length === 0) {
		return (
			<Container className='d-flex gap-2 text-primary justify-content-center align-items-center default-dashboard'>
				<WelcomeCard
					title='Welcome to EVO!'
					content=" You haven't enrolled in any courses yet. Explore our courses and start today!"
				/>
			</Container>
		);
	}

	return (
		<Container style={{ height: "80vh", overflow: "auto" }}>
			<Row>
				{enrolledCourses.map(({ course }, idx) => {
					if (!course) return null;
					const prog = progressMap.get(course?._id);
					const percent = prog?.progressPercent || 0;

					return (
						<Col
							xl={4}
							md={6}
							sm={12}
							className='mb-4'
							key={course._id}>
							<CourseCard
								prog={prog}
								percent={percent}
								course={course}
								enrolled
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

export default MyEnrolledCourses;
