"use client";
import { getSubcategories } from "@/app/api/admin/subcategories";
import { getAllCategories, getAllSubcategories } from "@/app/api/cc";
import { getEnrolledCourses } from "@/app/api/student";
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
	CardTitle,
	Col,
	Progress,
	Row,
} from "reactstrap";
const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL;
const MyEnrolledCourses = () => {
	const [enrolledCourses, setEnrolledCourses] = useState<
		{ course: CourseProps; completedLessons: any[] }[]
	>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const fetchCourses = async () => {
		try {
			const response = await getEnrolledCourses();
			setEnrolledCourses(response.enrolledCourses);
		} catch (error) {
			toast.error("Error fetching courses");
		}
	};
	const fetchCategories = async () => {
		try {
			const response = await getAllCategories();
			setCategories(response.categories);
		} catch (error) {
			toast.error("Error fetching categories");
		}
	};
	const fetchSubcategories = async () => {
		try {
			const response = await getAllSubcategories();
			setSubcategories(response.subcategories);
		} catch (error) {
			toast.error("Error fetching subcategories");
		}
	};
	const categoryMap = new Map(categories.map((c) => [c._id, c.title]));
	const subcategoryMap = new Map(subcategories.map((s) => [s._id, s.title]));

	useEffect(() => {
		fetchCourses();
		fetchCategories();
		fetchSubcategories();
	}, []);

	const calculateProgress = (
		completedLessons: any[],
		totalLessons: number = 10
	) => {
		const completed = completedLessons.length;
		return totalLessons > 0 ? Math.floor((completed / totalLessons) * 100) : 0;
	};

	return (
		<>
			<Row style={{ height: "80vh", overflow: "scroll" }}>
				{enrolledCourses?.map((item) => {
					const course = item.course;
					const progress = calculateProgress(item.completedLessons);
					return (
						<Col
							xl={4}
							md={6}
							sm={12}
							className='mb-4'
							key={course._id}>
							<Card className='border-0 shadow rounded-4 overflow-hidden h-100 course-card'>
								<CardImg
									top
									width='100%'
									height='200px'
									src={`${backendURL}/uploads/${course.photo}`}
									alt={course.title}
									style={{ objectFit: "cover" }}
								/>

								<CardBody className='p-4 d-flex flex-column'>
									<h5 className='fw-bold text-dark mb-1 text-truncate'>
										<Link
											className='text-dark text-decoration-none'
											href={`/student/course/${course._id}`}>
											{course.title || "Untitled Course"}
										</Link>
									</h5>

									<div className='mb-2'>
										<Badge
											color='info'
											className='me-2'>
											{subcategoryMap.get(course.subcategory) ||
												"Unknown Subcategory"}
										</Badge>
										<Badge color='primary'>
											{categoryMap.get(course.category) || "Unknown Category"}
										</Badge>
									</div>

									<CardText className='text-muted small mb-3 flex-grow-1'>
										{course.description?.length > 100
											? `${course.description.slice(0, 100)}...`
											: course.description || "No description provided."}
									</CardText>

									<div className='mb-3'>
										<small className='text-muted d-block mb-1'>Progress</small>
										<Progress
											value={progress}
											style={{ height: "8px" }}
											className='rounded-pill'
											color='success'
										/>
										<small className='text-muted'>{progress}% Completed</small>
									</div>

									<Button
										color='primary'
										size='sm'
										className='mt-auto w-100'
										tag={Link}
										href={`/student/course/${course._id}`}>
										Continue Learning
									</Button>
								</CardBody>
							</Card>
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default MyEnrolledCourses;
