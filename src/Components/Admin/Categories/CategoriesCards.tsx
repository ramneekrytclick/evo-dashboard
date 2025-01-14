"use client";
import { getCategories } from "@/app/api/admin/categories";
import { Category } from "@/Types/Category.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

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
		<Row className="g-sm-4 g-3">
			{categories.map((item: Category) => (
				<Col
					xl={4}
					md={6}
					key={item._id}>
					<div className="prooduct-details-box d-flex gap-3">
						<div className="d-flex gap-3">
							<Link href={`subcategories/${item._id}`}>{item.name}</Link>
						</div>
					</div>
				</Col>
			))}
		</Row>
	);
};

export default CategoriesCards;
