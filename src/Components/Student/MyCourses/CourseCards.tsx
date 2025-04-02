"use client";
import { getEnrolledCourses } from "@/app/api/student";
import { CourseProps } from "@/Types/Course.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Badge,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Progress,
	Row,
} from "reactstrap";

const MyEnrolledCourses = () => {
	const [enrolledCourses, setEnrolledCourses] = useState<
		{ course: CourseProps; completedLessons: any[] }[]
	>([]);

	const fetchCourses = async () => {
		try {
			const response = await getEnrolledCourses();
			setEnrolledCourses(response.enrolledCourses);
		} catch (error) {
			toast.error("Error fetching courses");
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	const calculateProgress = (
		completedLessons: any[],
		totalLessons: number = 10
	) => {
		const completed = completedLessons.length;
		return totalLessons > 0 ? Math.floor((completed / totalLessons) * 100) : 0;
	};

	return (
		<Row>
			{enrolledCourses?.map((item) => {
				const course = item.course;
				const progress = calculateProgress(item.completedLessons);
				return (
					<Col
						xl={4}
						className="mb-4"
						key={course._id}>
						<Card className="border-0 shadow-md rounded-4 overflow-hidden h-100">
							<div className="position-relative">
								<CardImg
									top
									width="100%"
									height="200px"
									src={`/uploads/${course.photo}`}
									alt={course.title}
									className="object-fit-cover"
								/>
							</div>

							<CardBody className="text-start p-4 d-flex flex-column">
								<CardTitle
									tag="h5"
									className="fw-bold text-dark mb-2">
									<Link
										className="fw-bold text-dark mb-2"
										href={`/student/course/${course._id}`}>
										{course.title || "Untitled Course"}
									</Link>
								</CardTitle>

								<div className="mb-2">
									<Badge
										color="primary"
										className="me-2">
										{course.category}
									</Badge>
									<Badge color="success">{course.subcategory}</Badge>
								</div>

								<CardText className="text-muted small mb-3 flex-grow-1">
									{course.description?.slice(0, 100) ||
										"No description provided."}
								</CardText>

								{/* Progress Bar */}
								<div className="mb-3">
									<small className="text-muted">Progress</small>
									<Progress
										value={progress}
										className="my-1"
									/>
									<small>{progress}% Completed</small>
								</div>

								<Link
									href={`/student/course/${course._id}`}
									className="btn btn-sm btn-outline-primary w-100 mt-auto">
									Continue Learning
								</Link>
							</CardBody>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
};

export default MyEnrolledCourses;
