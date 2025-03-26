import React, { useEffect, useState } from "react";
import { Button, Spinner, Card, CardHeader, CardBody } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { deleteCourse, getMyCourses, updateCourse } from "@/app/api/cc";
import EditCourseModal from "./EditCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";
import { Course } from "@/Types/Course.type";
import { toast } from "react-toastify";
import { getCategories } from "@/app/api/admin/categories";
import { getSubcategories } from "@/app/api/admin/subcategories";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";

const CoursesTable: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const [interests, setInterests] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

	const fetchData = async () => {
		try {
			const response: Course[] = await getMyCourses();
			setCourses(response);
		} catch (error) {
			console.error("Error fetching courses:", error);
		} finally {
			setLoading(false);
		}
	};
	const fetchCategories = async () => {
		try {
			const response = await getCategories();
			setCategories(response);
		} catch (error) {
			console.error("Error fetching categories:", error);
			toast.error("Error fetching categories");
		}
	};
	const fetchSubcategories = async (categoryId: string) => {
		try {
			const response = await getSubcategories(categoryId);
			setSubcategories(response);
		} catch (error) {
			console.error("Error fetching subcategories:", error);
			toast.error("Error fetching subcategories");
		}
	};
	const fetchInterests = async () => {
		try {
			const response = await getWannaBeInterests();
			setInterests(response);
		} catch (error) {
			console.error("Error fetching interests:", error);
			toast.error("Error fetching interests");
		}
	};

	useEffect(() => {
		fetchData();
		fetchCategories();
		fetchInterests();
	}, []);
	useEffect(() => {
		if (categories?.length > 0) {
			fetchSubcategories(categories[0]?._id || "");
		}
	}, [categories]);

	const handleEdit = (row: Course) => {
		setSelectedCourse(row);
		setEditModalOpen(true);
	};

	const handleDelete = (row: Course) => {
		setSelectedCourse(row);
		setDeleteModalOpen(true);
	};

	const handleSaveCourse = async (updatedCourse: {
		name: string;
		description: string;
		categoryId: string;
		subcategoryId: string;
		wannaBeInterest: any[];
	}) => {
		try {
			await updateCourse(selectedCourse?._id || "", updatedCourse);
			toast.success("Successfully updated course");
		} catch (error) {
			toast.error("Error updating course");
		}
	};

	const handleDeleteCourse = async (id: string) => {
		try {
			await deleteCourse(id);
			toast.success("Successfully deleted course");
			fetchData();
		} catch (error) {
			toast.error("Error deleting course");
		}
	};

	const columns: TableColumn<Course>[] = [
		{
			name: "Title",
			selector: (row) => row.title || row.name || "Untitled",
			sortable: true,
		},
		{
			name: "Description",
			selector: (row) => row.description,
			wrap: true,
		},
		{
			name: "Subcategory",
			selector: (row) => row.subcategory?.name || "-",
		},
		{
			name: "Interest",
			selector: (row) =>
				row.wannaBeInterest?.map((w) => w.name).join(", ") || "-",
			wrap: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<>
					<Button
						color="primary"
						size="sm"
						className="me-2"
						onClick={() => handleEdit(row)}>
						Edit
					</Button>
					<Button
						color="danger"
						size="sm"
						onClick={() => handleDelete(row)}>
						Delete
					</Button>
				</>
			),
			width: "30%",
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	return (
		<>
			<Card className="mt-4">
				<CardHeader>
					<h4 className="mb-3">My Courses</h4>
				</CardHeader>
				<CardBody>
					{loading ? (
						<div className="text-center">
							<Spinner color="primary" />
						</div>
					) : (
						<DataTable
							columns={columns}
							data={courses}
							pagination
							highlightOnHover
							dense
							noDataComponent="No courses found."
						/>
					)}
				</CardBody>
			</Card>

			{/* Modals */}
			{selectedCourse && (
				<>
					<EditCourseModal
						isOpen={editModalOpen}
						toggle={() => setEditModalOpen(false)}
						course={selectedCourse}
						onSave={handleSaveCourse}
						categories={categories}
						subcategories={subcategories}
						interests={interests}
					/>

					<DeleteCourseModal
						isOpen={deleteModalOpen}
						toggle={() => setDeleteModalOpen(false)}
						course={selectedCourse}
						onDelete={handleDeleteCourse}
					/>
				</>
			)}
		</>
	);
};

export default CoursesTable;
