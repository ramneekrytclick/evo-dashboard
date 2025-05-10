"use client";

import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { BookOpen, Award } from "react-feather";
import { Button, Card, CardBody } from "reactstrap";
import Link from "next/link";
import { Path } from ".";
const mainURL = process.env.NEXT_PUBLIC_MAIN_URL;

interface PathRoadmapProps {
	role: string;
	path: Path;
	enrolledCourses: { course: { _id: string } }[];
}

const PathRoadmap = ({ path, enrolledCourses, role }: PathRoadmapProps) => {
	const enrolledCourseIds = enrolledCourses.map((item) => item.course._id);

	return (
		<Card className='mb-4'>
			<CardBody>
				<p className='mb-2 h5'>{path.description}</p>
				<p className='mb-2 h6'>
					<strong>Duration:</strong> {path.timing}
				</p>
				<VerticalTimeline lineColor='#007bff'>
					{path.courses.map((course, idx) => {
						const isEnrolled = enrolledCourseIds.includes(course.id);
						const buttonLabel = isEnrolled ? "Continue Learning" : "Enroll Now";
						const buttonColor = isEnrolled ? "success" : "primary";
						const courseLink = isEnrolled
							? `/student/learning/course/${course.id}`
							: `${mainURL}courses/${course.slug}`;

						return (
							<VerticalTimelineElement
								key={course.id}
								date={`Step ${idx + 1}`}
								icon={<BookOpen />}
								iconStyle={{ background: "#007bff", color: "#fff" }}
								contentStyle={{ background: "#f8f9fa", color: "#000" }}
								contentArrowStyle={{ borderRight: "7px solid #007bff" }}>
								<h4 className='vertical-timeline-element-title'>
									{course.title}
								</h4>
								<p>{course.description}</p>
								<Link
									href={courseLink}
									className='ms-2 ms-md-0'>
									{role !== "Admin" && (
										<Button
											color={buttonColor}
											size='sm'>
											{buttonLabel}
										</Button>
									)}
								</Link>
							</VerticalTimelineElement>
						);
					})}

					<VerticalTimelineElement
						date='Final Goal'
						icon={<Award />}
						iconStyle={{ background: "#28a745", color: "#fff" }}
						contentStyle={{ background: "#e6f4ea", color: "#000" }}
						contentArrowStyle={{ borderRight: "7px solid #28a745" }}>
						<h6 className='vertical-timeline-element-title'>Become:</h6>
						<ul className='mb-0'>
							{path.wannaBeInterest.map((wanna) => (
								<li
									key={wanna}
									className='fw-bold fs-5 text-success'>
									{wanna}
								</li>
							))}
						</ul>
					</VerticalTimelineElement>
				</VerticalTimeline>
			</CardBody>
		</Card>
	);
};

export default PathRoadmap;
