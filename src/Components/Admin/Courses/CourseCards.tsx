"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Row } from "reactstrap";
import ScrollBar from "react-perfect-scrollbar";
import { deleteCourse, getCourses } from "@/app/api/admin/course";
import { CourseProps } from "@/Types/Course.type";
import CourseCard from "./CourseCard";
import {
	getAllCategories,
	getAllSubcategories,
	getAllWannaBeInterests,
} from "@/app/api/cc";
import { Review } from "./ReviewModal";

const CourseCards = ({
	reviews,
	fetchReviews,
}: {
	reviews: Review[];
	fetchReviews: () => void;
}) => {
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const [wannaBeInterests, setWannaBeInterests] = useState<any[]>([]);

	const fetchCourses = async () => {
		try {
			const response = await getCourses();
			setCourses(response.reverse());
		} catch (error) {
			console.error(error);
			toast.error("Error fetching courses");
		}
	};
	const fetchCategories = async () => {
		try {
			const catRes = await getAllCategories();
			const subCatRes = await getAllSubcategories();
			const wannaBeRes = await getAllWannaBeInterests();
			setCategories(catRes.categories);
			setSubcategories(subCatRes.subcategories);
			setWannaBeInterests(wannaBeRes.interests);
		} catch (error) {
			toast.error("Error fetching categories data");
		}
	};
	const handleDelete = async (id: string) => {
		try {
			const response = await deleteCourse(id);
			toast.success("Course deleted successfully");
			fetchCourses();
		} catch (error) {
			console.error(error);
			toast.error("Error deleting course");
		}
	};
	useEffect(() => {
		fetchCourses();
		fetchCategories();
	}, []);

	return (
		<>
			<Row>
				{courses.map((course, index) => {
					return (
						<CourseCard
							key={index}
							data={course}
							fetchData={() => {
								fetchCourses();
							}}
							categories={categories}
							subcategories={subcategories}
							wannaBeInterests={wannaBeInterests}
							reviews={reviews}
							onDelete={handleDelete}
						/>
					);
				})}
			</Row>
		</>
	);
};

export default CourseCards;
