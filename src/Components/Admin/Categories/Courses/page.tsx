"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CoursesTable from "./CoursesTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategoryBySlug } from "@/app/api/admin/categories";
import { Spinner } from "reactstrap";

const CoursesUnderCategory = ({ categoryId }: { categoryId: string }) => {
	const [category, setCategory] = useState<{
		_id: string;
		title: string;
		description: string;
		photo: string;
		slug: string;
	}>();
	const [loading, setLoading] = useState(false);
	const fetchCategory = async () => {
		setLoading(true);
		try {
			const response = await getCategoryBySlug(categoryId);
			setCategory(response);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchCategory();
	}, []);
	if (loading || !category) {
		return (
			<div className='d-flex justify-content-center align-items-center text-primary h-100 pt-5'>
				Loading...
				<Spinner />{" "}
			</div>
		);
	}

	return (
		<>
			<Breadcrumbs
				mainTitle={` ${category?.title} Courses`}
				parent='Courses'
				title={category?.title}
			/>
			<CoursesTable category={category} />
		</>
	);
};

export default CoursesUnderCategory;
