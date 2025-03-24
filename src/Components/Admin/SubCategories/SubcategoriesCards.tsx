"use client";
import { getSubcategories } from "@/app/api/admin/subcategories";
import { Subcategory } from "@/Types/Category.type";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import CreateSubcategoryModal from "./CreateSubcategoryModal";
import { subcategoryFakeData } from "@/FakeData/admin/categorysub";
export interface SubCategory {
	_id: string;
	name: string;
	categoryId: string;
}
const SubcategoriesCards = ({ id }: { id: string }) => {
	const [subcategories, setSubcategories] = useState<SubCategory[]>();
	const fetchSubcategories = async () => {
		try {
			const response = await getSubcategories(id);
			setSubcategories(response);
			// setSubcategories(subcategoryFakeData);
		} catch (error) {
			console.error(error);
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
				{subcategories?.map((item: Subcategory) => (
					<Col
						xl={4}
						md={6}
						key={item._id}>
						<div className="d-flex gap-3 bg-light p-3 rounded-3 border-b-info">
							<div className="d-flex gap-3 text-success pe-none">
								{item.name}
							</div>
						</div>
					</Col>
				))}
			</Row>
		</Col>
	);
};

export default SubcategoriesCards;
