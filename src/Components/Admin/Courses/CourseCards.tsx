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
			toast.error("Error fetching courses");
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	return (
		<>
			<Row>
				{courses.map((course, index) => (
					<CourseCard
						key={index}
						data={course}
						fetchData={fetchCourses}
					/>
				))}
			</Row>
		</>
	);
};

export default CourseCards;
