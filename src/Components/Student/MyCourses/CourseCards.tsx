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
			<Container className='d-flex gap-2 text-primary justify-content-center align-items-center card'>
				<div className='text-center py-4'>
					<h5 className='mb-2 fw-semibold'>👋 Welcome to EVO!</h5>
					<p className='text-muted'>You haven’t enrolled in any courses yet.</p>
					<Link
						href={`${process.env.NEXT_PUBLIC_MAIN_URL}courses`}
						className='btn btn-primary mt-2'>
						Explore Courses
					</Link>
				</div>
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
							<Card className='border-0 shadow rounded-4 overflow-hidden h-100 '>
								<Image
									width={200}
									height={200}
									className='w-100'
									src={getImageURL(course.photo)}
									alt={course.title}
									style={{ objectFit: "cover" }}
								/>
								<CardBody
									className='p-4 d-flex flex-column align-items-center justify-content-between'
									style={{
										textWrap: "pretty",
									}}>
									<Link
										className='text-dark text-decoration-none'
										href={`/student/learning/course/${course._id}`}>
										<h3
											className='fw-bold text-dark mb-1 text-center'
											style={{
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "ellipsis",
												width: "100%",
											}}>
											{course.title || "Untitled Course"}
										</h3>
									</Link>
									<div className='mb-4'>
										<Badge
											color='info'
											className='me-2'>
											{subcategoryMap.get(course.subcategory) ||
												"Unknown Subcategory"}
										</Badge>
										<Badge color='warning'>
											{categoryMap.get(course.category) || "Unknown Category"}
										</Badge>
									</div>

									<div className='text-center w-100'>
										<Progress
											value={percent}
											style={{ height: "8px", width: "100%" }}
											className='rounded-pill mt-1'
											color='success'
										/>
										<span className='text-muted h6'>{percent}% Completed</span>
										<p className='text-muted small'>
											({prog?.completedLessons || "0"} of{" "}
											{prog?.totalLessons || "0"} Lessons)
										</p>
									</div>
									<Button
										color='primary'
										className='w-100 mb-2 rounded-pill'
										tag={Link}
										href={`/student/learning/course/${course._id}`}>
										Continue Learning
									</Button>
								</CardBody>
							</Card>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default MyEnrolledCourses;
