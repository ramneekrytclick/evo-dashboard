"use client";
import { getEnrolledCourses, getLessonsByCourseID } from "@/app/api/student";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Container, Row } from "reactstrap";
import StudentLessonLearningPage from "./Learning";

const CourseViewPageContainer = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [lessons, setLessons] = useState<any | null>(null);
	const [enrolledCourses, setCourses] = useState<any[]>([]);

	const router = useRouter();

	const fetchEnrolledCourses = async () => {
		try {
			const response = await getEnrolledCourses();
			setCourses(response.enrolledCourses);
		} catch (error: any) {
			setError(error);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const fetchCourseData = async () => {
		const isEnrolled = enrolledCourses.some((item) => item.course._id === id);
		if (!isEnrolled) {
			toast.error("You are not enrolled in this course");
			router.push("/404"); // or you can show a custom message/page
			return;
		}
		try {
			const response = await getLessonsByCourseID(id);
			setLessons(response.lessons);
			// toast.success("Course Lessons fetched successfully");
		} catch (error: any) {
			setError(error);
			toast.error("API NOT WORKING");
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const init = async () => {
			await fetchEnrolledCourses();
		};
		init();
	}, []);

	useEffect(() => {
		if (enrolledCourses.length > 0) {
			fetchCourseData();
		}
	}, [enrolledCourses]);

	if (loading) return <div>Loading...</div>;

	return (
		<>
			<Breadcrumbs
				mainTitle={"Learning"}
				parent={"Student"}
				title={"Learning"}
			/>
			<Container fluid>
				<Row>
					<StudentLessonLearningPage lessons={lessons} />
				</Row>
			</Container>
		</>
	);
};

export default CourseViewPageContainer;
