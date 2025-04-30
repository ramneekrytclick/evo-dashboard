"use client";

import {
	deleteCourse,
	getAllCategories,
	getAllCourses,
	getAllSubcategories,
	getAllWannaBeInterests,
} from "@/app/api/cc";
import { CourseProps } from "@/Types/Course.type";
import { useEffect, useState } from "react";
import { Card, CardBody, Row } from "reactstrap";
import CourseCard from "../../Courses/CourseCard";
import { toast } from "react-toastify";

const CoursesTable = ({ subcategory }: { subcategory: any }) => {
	const [loading, setLoading] = useState(false);
	const [courses, setCourses] = useState<CourseProps[]>();
	const [allCourses, setAllCourses] = useState([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const [wannaBeInterests, setWannaBeInterests] = useState<any[]>([]);
	const fetchAllCourses = async () => {
		setLoading(true);
		try {
			const response = await getAllCourses();
			setAllCourses(response.courses);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (allCourses.length > 0) {
			setCourses(
				allCourses.filter(
					(course: CourseProps) => course.subcategory === subcategory._id
				)
			);
		}
	}, [allCourses]);
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
			fetchAllCourses();
		} catch (error) {
			console.error(error);
			toast.error("Error deleting course");
		}
	};
	useEffect(() => {
		fetchAllCourses();
		fetchCategories();
	}, []);
	return (
		<Card>
			<CardBody>
				<Row>
					{courses?.map((course, index) => {
						return (
							<CourseCard
								key={index}
								data={course}
								fetchData={() => {
									fetchAllCourses();
								}}
								categories={categories}
								subcategories={subcategories}
								wannaBeInterests={wannaBeInterests}
								onDelete={handleDelete}
							/>
						);
					})}
				</Row>
			</CardBody>
		</Card>
	);
};

export default CoursesTable;
