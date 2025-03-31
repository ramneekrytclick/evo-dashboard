"use client";
import { getEnrolledCourses } from "@/app/api/student";
import { Href, ImagePath } from "@/Constant";
import { CourseProps } from "@/Types/Course.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Badge, Card, CardBody, Col, Progress, Row } from "reactstrap";

const MyEnrolledCourses = () => {
	const [enrolledCourses, setEnrolledCourses] = useState<
		{ course: CourseProps; completedLessons: any }[]
	>([]);

	const fetchCourses = async () => {
		try {
			const response = await getEnrolledCourses();
			setEnrolledCourses(response.student.enrolledCourses);
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
						xl={6}
						className="box-col-6"
						key={course._id}>
						<Link href={`/student/course/${course._id}`}>
							<Card className="course-card">
								<CardBody>
									<div className="d-flex">
										<Image
											priority
											width={50}
											height={50}
											className="img-50 img-fluid m-r-20"
											src={`${ImagePath}/job-search/${course._id}.jpg`}
											alt={course.title || "Course"}
										/>
										<div className="flex-grow-1">
											<h6 className="f-w-700">
												<Link
													className="text-primary"
													href={`/student/course/${course._id}`}>
													{course.title || "Untitled Course"}
												</Link>
												<Badge
													color="primary"
													className="pull-right">
													{course.category || "Category"}
												</Badge>
											</h6>
											<p>{course.subcategory || "Subcategory"}</p>
											<p>Duration: {course.timing || "N/A"}</p>
										</div>
									</div>
									<p className="mt-3">{course.description}</p>
									<div>
										<p className="mb-2">Progress</p>
										<Progress value={progress} />
										<small>{progress}% Completed</small>
									</div>
								</CardBody>
							</Card>
						</Link>
					</Col>
				);
			})}
		</Row>
	);
};

export default MyEnrolledCourses;
