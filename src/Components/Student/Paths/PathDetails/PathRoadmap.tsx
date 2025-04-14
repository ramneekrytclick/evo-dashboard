"use client";

import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { BookOpen, Award } from "react-feather";
import { Button, Card, CardBody } from "reactstrap";
import Link from "next/link";

interface PathRoadmapProps {
	path: {
		title: string;
		description: string;
		timing: string;
		price: number;
		courses: { _id: string; title: string }[];
		wannaBeInterest: { _id: string; title: string }[];
	};
	enrolledCourses: { course: { _id: string } }[];
}

const PathRoadmap = ({ path, enrolledCourses }: PathRoadmapProps) => {
	const enrolledCourseIds = enrolledCourses.map((item) => item.course._id);

	return (
		<Card className='mb-4'>
			<CardBody>
				<h3 className='mb-2 text-primary'>{path.title}</h3>
				<p className='mb-2'>{path.description}</p>
				<p className='mb-2'>
					<strong>Duration:</strong> {path.timing}
				</p>

				<h5 className='mb-4 mt-4'>🚀 Your Learning Journey</h5>

				<VerticalTimeline lineColor='#007bff'>
					{path.courses.map((course, idx) => {
						const isEnrolled = enrolledCourseIds.includes(course._id);
						const buttonLabel = isEnrolled ? "Continue Learning" : "Enroll Now";
						const buttonColor = isEnrolled ? "success" : "primary";
						const courseLink = isEnrolled
							? `/student/course/${course._id}`
							: `/student/dashboard/`; //has to be changed

						return (
							<VerticalTimelineElement
								key={course._id}
								date={`Step ${idx + 1}`}
								icon={<BookOpen />}
								iconStyle={{ background: "#007bff", color: "#fff" }}
								contentStyle={{ background: "#f8f9fa", color: "#000" }}
								contentArrowStyle={{ borderRight: "7px solid #007bff" }}>
								<h4 className='vertical-timeline-element-title'>
									{course.title}
								</h4>
								<p>Core skill-building course to advance your journey.</p>
								<Link href={courseLink}>
									<Button
										color={buttonColor}
										size='sm'>
										{buttonLabel}
									</Button>
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
						<h4 className='vertical-timeline-element-title'>Become:</h4>
						<ul className='mb-0'>
							{path.wannaBeInterest.map((wanna) => (
								<li key={wanna._id}>{wanna.title}</li>
							))}
						</ul>
					</VerticalTimelineElement>
				</VerticalTimeline>
			</CardBody>
		</Card>
	);
};

export default PathRoadmap;
