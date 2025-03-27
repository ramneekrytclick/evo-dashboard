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

	const fetchSubcategories = async () => {
		try {
			const response = await getSubcategories(id);
			setSubcategories(response);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (subId: string) => {
		try {
			await deleteSubcategory(subId);
			toast.success("Subcategory deleted");
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
			<Row
				sm={6}
				className="ms-1 mb-4">
				<CreateSubcategoryModal
					fetchData={fetchSubcategories}
					id={id}
				/>
			</Row>
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
										color="warning"
										size="sm"
										disabled>
										Update
									</Button>
									<Button
										color="danger"
										size="sm"
										onClick={() => handleDelete(item._id)}>
										Delete
									</Button>
								</CardFooter>
							</Card>
						</Col>
					))
				)}
			</Row>
		</Col>
	);
};

export default SubcategoriesCards;
