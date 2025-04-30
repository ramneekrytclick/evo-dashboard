"use client";
import {
	getSubcategories,
	deleteSubcategory,
} from "@/app/api/admin/subcategories";
import { useEffect, useState } from "react";
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";
import CreateSubcategoryModal from "./CreateSubcategoryModal";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
import UpdateSubcategoryModal from "./UpdateSubcategory";
import { Edit2, Trash } from "react-feather";
import Link from "next/link";
import { Category } from "@/Types/Category.type";
import { getCategories, getCategoryBySlug } from "@/app/api/admin/categories";

export interface SubCategory {
	_id: string;
	title: string;
	description?: string;
	category: string;
	photo?: string;
	slug?: string;
}

const SubcategoriesCards = ({
	id,
	category,
}: {
	id: string;
	category: Category;
}) => {
	const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
	const [deleteModal, setDeleteModal] = useState(false);
	const [subcategoryToDelete, setSubcategoryToDelete] =
		useState<SubCategory | null>(null);
	const [subcategoryToUpdate, setSubcategoryToUpdate] =
		useState<SubCategory | null>(null);

	const toggleDeleteModal = () => setDeleteModal(!deleteModal);

	const fetchSubcategories = async () => {
		try {
			const response = await getSubcategories(id);
			setSubcategories(response);
		} catch (error) {
			console.error(error);
		}
	};

	const confirmDelete = (subcategory: SubCategory) => {
		setSubcategoryToDelete(subcategory);
		setDeleteModal(true);
	};
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const handleConfirmedDelete = async () => {
		if (!subcategoryToDelete) return;
		try {
			await deleteSubcategory(subcategoryToDelete._id);
			toast.success("Subcategory deleted");
			setDeleteModal(false);
			setSubcategoryToDelete(null);
			fetchSubcategories();
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete");
		}
	};

	useEffect(() => {
		fetchSubcategories();
	}, []);

	return (
		<Col>
			{/* Create Subcategory */}
			<Row
				sm={6}
				className='ms-1 mb-4'>
				<CreateSubcategoryModal
					fetchData={fetchSubcategories}
					category={{ id: id, categoryName: category?.title || "" }}
				/>
			</Row>

			{/* Subcategories Cards */}
			<Row className='g-sm-4 g-3'>
				{subcategories.length === 0 ? (
					<Col className='text-center text-muted py-5'>
						No subcategories found
					</Col>
				) : (
					subcategories.map((item) => (
						<Col
							xl={4}
							md={6}
							key={item._id}>
							<Card className='shadow-sm rounded-3 border-0'>
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
								<CardHeader className='fw-bold text-success'>
									{item.title}
								</CardHeader>
								<CardBody>
									{item.description && (
										<p className='text-muted small'>{item.description}</p>
									)}
									<Link
										className='fs-5 w-100'
										href={`courses/${item.slug}`}>
										<Button
											className='fs-6 w-100'
											outline
											color='primary'>
											View courses
										</Button>
									</Link>
								</CardBody>
								<CardFooter className='d-flex justify-content-end gap-2'>
									<ButtonGroup>
										<Button
											color='success'
											size='sm'
											className='p-2'
											onClick={() => {
												setSubcategoryToUpdate(item);
												setUpdateModalOpen(true);
											}}>
											<Edit2 size={16} />
										</Button>
										<Button
											color='danger'
											size='sm'
											className='p-2'
											onClick={() => confirmDelete(item)}>
											<Trash size={16} />
										</Button>
									</ButtonGroup>
								</CardFooter>
							</Card>
						</Col>
					))
				)}
			</Row>
			{updateModalOpen && subcategoryToUpdate && (
				<UpdateSubcategoryModal
					isOpen={updateModalOpen}
					toggle={() => setUpdateModalOpen(false)}
					subcategory={subcategoryToUpdate}
					fetchData={fetchSubcategories}
					categoryId={id}
				/>
			)}
			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={deleteModal}
				toggle={toggleDeleteModal}>
				<ModalHeader toggle={toggleDeleteModal}>Delete Subcategory</ModalHeader>
				<ModalBody>
					<p>
						Are you sure you want to delete{" "}
						<strong>{subcategoryToDelete?.title}</strong>?<br />
						This will also remove any related courses or content under it.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						onClick={handleConfirmedDelete}>
						Yes, Delete
					</Button>
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

export default SubcategoriesCards;
