"use client";
import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import {
	getAllCourses,
	getAllCategories,
	getAllSubcategories,
	getAllWannaBeInterests,
	updateCourse,
} from "@/app/api/cc";
import CourseCardCC from "./CourseCardCC";
import UpdateCourseModal from "./UpdateCourseModal";
import { toast } from "react-toastify";

const CoursesContainerCC = () => {
	const [courses, setCourses] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const [wannabe, setWannaBe] = useState<any[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const fetchData = async () => {
		const [courseRes, catRes, subcatRes, wannaRes] = await Promise.all([
			getAllCourses(),
			getAllCategories(),
			getAllSubcategories(),
			getAllWannaBeInterests(),
		]);
		setCourses(courseRes.courses.reverse());
		setCategories(catRes.categories);
		setSubcategories(subcatRes.subcategories);
		setWannaBe(wannaRes.interests);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleOpenModal = (course: any) => {
		setSelectedCourse(course);
		setModalOpen(true);
	};

	const handleUpdate = async (updatedData: {
		title?: string;
		description?: string;
		whatYouWillLearn?: string;
		youtubeLink?: string;
		timing?: string;
		categoryId?: string;
		subcategoryId?: string;
		wannaBeInterestIds?: string[];
		realPrice?: string;
		discountedPrice?: string;
		tags?: string;
	}) => {
		try {
			await updateCourse(selectedCourse._id, updatedData);
			setModalOpen(false);
			fetchData();
			toast.success("Course updated successfully");
		} catch (error) {
			console.error("Error updating course", error);
			toast.error("Error updating course");
		}
	};

	return (
		<>
			<Breadcrumbs
				title='Courses'
				parent='Course Creator'
				mainTitle='Courses'
			/>
			<div className='p-3'>
				<Row className='g-3'>
					{courses.map((course) => (
						<Col
							md={6}
							lg={4}
							key={course.id}>
							<CourseCardCC
								course={course}
								categories={categories}
								subcategories={subcategories}
								wannabe={wannabe}
								onEdit={() => handleOpenModal(course)}
							/>
						</Col>
					))}
				</Row>
			</div>

			<UpdateCourseModal
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}
				course={selectedCourse}
				categories={categories}
				subcategories={subcategories}
				wannabe={wannabe}
				onSave={handleUpdate}
			/>
		</>
	);
};

export default CoursesContainerCC;
