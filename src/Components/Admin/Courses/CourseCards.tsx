"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Row, Col, Spinner } from "reactstrap";
import { deleteCourse, getCourses } from "@/app/api/admin/course";
import { CourseProps } from "@/Types/Course.type";
import CourseCard from "./CourseCard";
import {
	getAllCategories,
	getAllSubcategories,
	getAllWannaBeInterests,
} from "@/app/api/cc";

const CourseCards = () => {
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const [wannaBeInterests, setWannaBeInterests] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchAllData = async () => {
		try {
			setLoading(true);

			const [courseRes, catRes, subCatRes, wannaBeRes] = await Promise.all([
				getCourses(),
				getAllCategories(),
				getAllSubcategories(),
				getAllWannaBeInterests(),
			]);

			setCourses(courseRes.reverse());
			setCategories(catRes.categories);
			setSubcategories(subCatRes.subcategories);
			setWannaBeInterests(wannaBeRes.interests);
		} catch (error) {
			console.error(error);
			toast.error("Error loading courses or categories");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteCourse(id);
			toast.success("Course deleted successfully");
			fetchAllData();
		} catch (error) {
			console.error(error);
			toast.error("Error deleting course");
		}
	};

	useEffect(() => {
		fetchAllData();
	}, []);

	return (
		<Row>
			{loading ? (
				<div className='text-center py-5'>
					<Spinner color='primary' />
					<p className='mt-3'>Loading courses...</p>
				</div>
			) : (
				courses.map((course, index) => (
					<CourseCard
						key={index}
						data={course}
						fetchData={fetchAllData}
						categories={categories}
						subcategories={subcategories}
						wannaBeInterests={wannaBeInterests}
						onDelete={handleDelete}
					/>
				))
			)}
		</Row>
	);
};

export default CourseCards;
