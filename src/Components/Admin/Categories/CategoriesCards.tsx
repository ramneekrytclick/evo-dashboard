"use client";
import { getCategories, deleteCategory } from "@/app/api/admin/categories";
import { Category } from "@/Types/Category.type";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ButtonGroup,
} from "reactstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Row,
} from "reactstrap";
import CreateCategoryModal from "./CreateCategoryModal";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
import { Edit2, Trash } from "react-feather";
import UpdateCategoryModal from "./UpdateModal";
const CategoriesCards = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const fetchCategories = async () => {
		try {
			const response = await getCategories();
			setCategories(response);
		} catch (error) {
			console.log(error);
		}
	};
	const [deleteModal, setDeleteModal] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
		null
	);
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [categoryToUpdate, setCategoryToUpdate] = useState<Category | null>(
		null
	);
	const toggleDeleteModal = () => setDeleteModal(!deleteModal);
	const confirmDelete = (category: Category) => {
		setCategoryToDelete(category);
		setDeleteModal(true);
	};
	const handleConfirmedDelete = async () => {
		if (!categoryToDelete) return;

		try {
			await deleteCategory(categoryToDelete._id || "");
			toast.success("Category deleted");
			setDeleteModal(false);
			setCategoryToDelete(null);
			fetchCategories();
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete");
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<Col>
			<Row
				sm={6}
				className='ms-1 mb-4'>
				<CreateCategoryModal fetchData={fetchCategories} />
			</Row>

			<Row className='g-sm-4 g-3'>
				{categories.length === 0 ? (
					<Col className='text-center text-muted py-5'>No categories found</Col>
				) : (
					categories.map((item: Category) => (
						<Col
							xl={3}
							md={4}
							sm={6}
							key={item._id}>
							<Card
								className='shadow-sm rounded-3 border-0 text-center'
								style={{ height: "100%" }}>
								<Link
									className='fs-5'
									href={`subcategories/${item._id}`}>
									<Image
										src={getImageURL(item.photo || "")}
										width={400}
										height={200}
										alt={item.title}
										className='img-fluid rounded-top'
										style={{
											width: "100%",
											height: "160px",
											objectFit: "cover",
										}}
									/>
								</Link>

								<CardHeader className='fw-bold text-primary'>
									<Link
										className='fs-5'
										href={`subcategories/${item._id}`}>
										{item.title}
									</Link>
								</CardHeader>
								<CardBody>
									{item.description && (
										<p className='text-secondary small mb-2'>
											{item.description}
										</p>
									)}
								</CardBody>
								<CardFooter className='d-flex flex-column justify-content-center align-items-center gap-2'>
									<Link
										className='fs-5 w-100'
										href={`subcategories/${item._id}`}>
										<Button
											className='fs-6 w-100'
											color='primary'>
											View Subcategories
										</Button>
									</Link>
									<Link
										className='fs-5 w-100'
										href={`categories/courses/${item.slug}`}>
										<Button
											className='fs-6 w-100'
											outline
											color='primary'>
											View courses
										</Button>
									</Link>

									<ButtonGroup>
										<Button
											color='success'
											size='sm'
											className='p-2'
											onClick={(e) => {
												e.stopPropagation();
												setCategoryToUpdate(item);
												setUpdateModalOpen(true);
											}}>
											<Edit2 size={16} />
										</Button>
										<Button
											color='danger'
											size='sm'
											className='p-2'
											onClick={(e) => {
												confirmDelete(item);
											}}>
											<Trash size={16} />
										</Button>
									</ButtonGroup>
								</CardFooter>
							</Card>
						</Col>
					))
				)}
			</Row>
			{updateModalOpen && categoryToUpdate && (
				<UpdateCategoryModal
					isOpen={updateModalOpen}
					toggle={() => setUpdateModalOpen(false)}
					category={categoryToUpdate}
					fetchData={fetchCategories}
				/>
			)}
			<Modal
				isOpen={deleteModal}
				toggle={toggleDeleteModal}>
				<ModalHeader toggle={toggleDeleteModal}>Delete Category</ModalHeader>
				<ModalBody>
					<p>
						Are you sure you want to delete{" "}
						<strong>{categoryToDelete?.title}</strong>?<br />
						This will also remove all its subcategories and associated courses.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						onClick={handleConfirmedDelete}>
						Yes, Delete
					</Button>{" "}
					<Button
						color='outline-danger'
						onClick={toggleDeleteModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</Col>
	);
};

export default CategoriesCards;
