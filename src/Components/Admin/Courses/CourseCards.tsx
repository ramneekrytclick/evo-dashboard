"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Row } from "reactstrap";
import ScrollBar from "react-perfect-scrollbar";
import { getCourses } from "@/app/api/admin/course";
import { CourseProps } from "@/Types/Course.type";
import CourseCard from "./CourseCard";

const CourseCards = () => {
	const [courses, setCourses] = useState<CourseProps[]>([]);

	const fetchCourses = async () => {
		try {
			const response = await getCourses();
			setCourses(response);
		} catch (error) {
			console.error(error);
			toast.error("Error in fetching courses");
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	return (
		<ScrollBar
			style={{ width: "100%", height: "40em" }}
			className="vertical-scroll scroll-demo text-center">
			<Row>
				{courses.map((course, index) => (
					<CourseCard
						key={index}
						data={course}
						fetchData={fetchCourses}
					/>
				))}
			</Row>
		</ScrollBar>
	);
};

export default CourseCards;
