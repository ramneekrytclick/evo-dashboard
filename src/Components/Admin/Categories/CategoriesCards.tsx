"use client";
import { getCategories } from "@/app/api/admin/categories";
import { Category } from "@/Types/Category.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import CreateCategoryModal from "./CreateCategoryModal";

const CategoriesCards = () => {
	const [categories, setCategories] = useState([]);
	const fetchCategories = async () => {
		try {
			const response = await getCategories();
			setCategories(response.categories);
			// console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchCategories();
	}, []);
	return (
		<Col>
			<Row sm={6} className="ms-1 mb-4">
				<CreateCategoryModal fetchData={fetchCategories} />
			</Row>
			<Row className="g-sm-4 g-3">
				{categories.map((item: Category) => (
					<Col
						xl={2}
						md={3}
						key={item._id}>
						<div className="prooduct-details-box d-flex gap-3">
							<div className="d-flex gap-3">
								<Link href={`subcategories/${item._id}`}>{item.name}</Link>
							</div>
						</div>
					</Col>
				))}
			</Row>
		</Col>
	);
};

export default CategoriesCards;
