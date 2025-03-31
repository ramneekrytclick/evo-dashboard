"use client";
import { getEnrolledCourses } from "@/app/api/student";
import { Href, ImagePath } from "@/Constant";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Badge, Card, CardBody, Col, Progress } from "reactstrap";

export interface CourseProps {
	_id?: string;
	name: string;
	category: string;
	subcategory: string;
	description: string;
	duration: string;
	mentorAssigned: { name: string; id: string; email: string };
	managerAssigned: { name: string; id: string; email: string };
	batchesAvailable: string[];
	promoCodes: { code: string; discount: number }[];
	price: number;
}
const MyEnrolledCourses = () => {
	const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
	const fetchCourses = async () => {
		try {
			const response = await getEnrolledCourses();
			setEnrolledCourses(response);
		} catch (error) {
			toast.error("Error fetching courses");
		}
	};
	useEffect(() => {
		fetchCourses();
	}, []);

	return (
		<>
			{enrolledCourses?.map((course) => (
				<Col
					xl={6}
					className="box-col-6"
					key={course._id}>
					<Link href={`/student/course/lesson`}>
						<Card className="course-card">
							<CardBody>
								<div className="d-flex">
									<Image
										priority
										width={50}
										height={50}
										className="img-50 img-fluid m-r-20"
										src={`${ImagePath}/job-search/${course._id}.jpg`}
										alt={course.name}
									/>
									<div className="flex-grow-1">
										<h6 className="f-w-700">
											<Link
												className="text-primary"
												href={Href}>
												{course.name}
											</Link>
											<Badge
												color="primary"
												className="pull-right">
												{JSON.stringify(course.category)}
											</Badge>
										</h6>
										<p>{JSON.stringify(course.subcategory)}</p>
										<p>Duration: {course.duration}</p>
										<p>
											Mentor: <strong>{course.mentorAssigned.name}</strong>
										</p>
									</div>
								</div>
								<p>{course.description}</p>
								<div>
									<p className="mb-2">Progress</p>
									<Progress value={Math.floor(Math.random() * 100)} />
								</div>
							</CardBody>
						</Card>
					</Link>
				</Col>
			))}
		</>
	);
};

export default MyEnrolledCourses;
