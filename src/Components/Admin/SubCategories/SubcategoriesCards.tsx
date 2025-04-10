"use client";
import {
	getSubcategories,
	deleteSubcategory,
} from "@/app/api/admin/subcategories";
import { useEffect, useState } from "react";
import {
	Button,
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

export interface SubCategory {
	_id: string;
	title: string;
	description?: string;
	category: string;
	photo?: string;
}

const SubcategoriesCards = ({ id }: { id: string }) => {
	const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
	const [deleteModal, setDeleteModal] = useState(false);
	const [subcategoryToDelete, setSubcategoryToDelete] =
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
				className="ms-1 mb-4">
				<CreateSubcategoryModal
					fetchData={fetchSubcategories}
					id={id}
				/>
			</Row>

			{/* Subcategories Cards */}
			<Row className="g-sm-4 g-3">
				{subcategories.length === 0 ? (
					<Col className="text-center text-muted py-5">
						No subcategories found
					</Col>
				) : (
					subcategories.map((item) => (
						<Col
							xl={4}
							md={6}
							key={item._id}>
							<Card className="shadow-sm rounded-3 border-0">
								{item.photo && (
									<img
										src={`/${item.photo}`}
										alt={item.title}
										className="img-fluid rounded-top"
										style={{ height: "160px", objectFit: "cover" }}
									/>
								)}
								<CardHeader className="fw-bold text-success">
									{item.title}
								</CardHeader>
								<CardBody>
									{item.description && (
										<p className="text-muted small">{item.description}</p>
									)}
								</CardBody>
								<CardFooter className="d-flex justify-content-end gap-2">
									<Button
										color="danger"
										size="sm"
										onClick={() => confirmDelete(item)}>
										Delete
									</Button>
								</CardFooter>
							</Card>
						</Col>
					))
				)}
			</Row>

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
						color="danger"
						onClick={handleConfirmedDelete}>
						Yes, Delete
					</Button>
					<Button
						color="outline-danger"
						onClick={toggleDeleteModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</Col>
	);
};

export default SubcategoriesCards;
