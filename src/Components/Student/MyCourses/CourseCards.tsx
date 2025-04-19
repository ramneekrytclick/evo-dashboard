"use client";
import { getAllCategories, getAllSubcategories } from "@/app/api/cc";
import { getEnrolledCourses, getMyCourseProgress } from "@/app/api/student";
import { getImageURL } from "@/CommonComponent/imageURL";
import { CourseProps } from "@/Types/Course.type";
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
	Progress,
	Row,
} from "reactstrap";

const MyEnrolledCourses = () => {
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

	const getProgress = async () => {
		try {
			const response = await getMyCourseProgress();
			setProgress(response.progress);
		} catch (error) {
			toast.error("Error fetching progress");
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

	return (
		<Row style={{ height: "80vh", overflow: "auto" }}>
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
						<Card className='border-0 shadow rounded-4 overflow-hidden h-100 course-card'>
							<CardImg
								top
								width='100%'
								height='200px'
								src={getImageURL(course.photo)}
								alt={course.title}
								style={{ objectFit: "cover" }}
							/>
							<CardBody className='p-4 d-flex flex-column'>
								<Link
									className='text-dark text-decoration-none'
									href={`/student/learning/course/${course._id}`}>
									<h3 className='fw-bold text-dark mb-1 text-truncate'>
										{course.title || "Untitled Course"}
										{course.title}
									</h3>
								</Link>
								<div className='mb-2'>
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
								<CardText className='text-muted small mb-3 flex-grow-1'>
									{course.description?.length > 100
										? `${course.description.slice(0, 100)}...`
										: course.description || "No description provided."}
								</CardText>
								<Button
									color='primary'
									size='sm'
									className='w-100 mb-2'
									tag={Link}
									href={`/student/learning/course/${course._id}`}>
									Continue Learning
								</Button>
								<div className='text-center w-100 '>
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
							</CardBody>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
};

export default MyEnrolledCourses;
