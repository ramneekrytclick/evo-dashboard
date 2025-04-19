"use client";

import { useEffect, useState } from "react";
import { getAllCourses } from "@/app/api/cc";
import { getEnrolledCourses } from "@/app/api/student";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { notFound, usePathname } from "next/navigation";
import { Container, Col, Row, Card, CardBody, Spinner } from "reactstrap";
import LessonSidebar from "@/Components/Student/Course/Lesson/LessonSidebar";

const Layout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) => {
	const [enrolledCourse, setEnrolledCourse] = useState<any>(null);
	const [course, setCourse] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const pathname = usePathname();
	const isLessonRoute = pathname?.split("/").length > 5; // or use regex
	useEffect(() => {
		const fetchData = async () => {
			try {
				const allCourses = await getAllCourses();
				const allEnrolled = await getEnrolledCourses();
				const matchedCourse = allCourses.courses.find(
					(c: any) => c.id === params.id
				);
				const matchedEnrolled = allEnrolled.enrolledCourses.find(
					(c: any) => c.course._id === params.id
				);
				if (matchedCourse && matchedEnrolled) {
					setCourse(matchedCourse);
					setEnrolledCourse(matchedEnrolled);
				} else {
					console.warn("⚠️ Course or enrollment not found");
				}
			} catch (error) {
				console.error("❌ Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [params.id]);

	if (loading)
		return (
			<div className='text-center mt-5'>
				<Spinner />
			</div>
		);

	// Uncomment this line when you're done debugging:
	if (!course || !enrolledCourse) return notFound();

	return (
		<Container fluid>
			<Breadcrumbs
				parent='Courses'
				title={course?.title || "Course"}
				mainTitle={course?.title || "Course"}
			/>
			<Card
				className='p-2 bg-light-subtle'
				style={{ minHeight: "80vh" }}>
				<Row className='h-100'>
					<Col
						sm={12}
						lg={isLessonRoute ? 10 : 12}>
						{isLessonRoute ? (
							<Card
								className='shadow-sm'
								style={{ minHeight: "70vh" }}>
								<CardBody>{children}</CardBody>
							</Card>
						) : (
							<>{children}</>
						)}
					</Col>
					{isLessonRoute && (
						<Col
							sm={12}
							lg={2}>
							<LessonSidebar courseId={params.id} />
						</Col>
					)}
				</Row>
			</Card>
		</Container>
	);
};

export default Layout;
