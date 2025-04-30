"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CoursesTable from "./CoursesTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSubcategoryBySlug } from "@/app/api/admin/subcategories";
import { Spinner } from "reactstrap";

const CoursesUnderSubsubcategory = ({
	subcategoryId,
}: {
	subcategoryId: string;
}) => {
	const [subcategory, setCategory] = useState<{
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
			const response = await getSubcategoryBySlug(subcategoryId);
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
	if (loading || !subcategory) {
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
				mainTitle={` ${subcategory?.title} Courses`}
				parent='Courses'
				title={subcategory?.title}
			/>
			<CoursesTable subcategory={subcategory} />
		</>
	);
};

export default CoursesUnderSubsubcategory;
