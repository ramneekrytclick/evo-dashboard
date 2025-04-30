"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CategoriesTitle, SubcategoriesTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";
import SubcategoriesCards from "./SubcategoriesCards";
import { useEffect, useState } from "react";
import { Category } from "@/Types/Category.type";
import { toast } from "react-toastify";
import { getCategories } from "@/app/api/admin/categories";

const SubcategoriesContainer = ({ id }: { id: string }) => {
	const [category, setCategory] = useState<Category>();
	const [loading, setLoading] = useState(false);
	const getCategory = async () => {
		setLoading(true);
		try {
			const response = await getCategories();
			const category = response.find((cat: Category) => cat._id === id);
			setCategory(category);
		} catch (error) {
			console.error(error);
			toast.error("Failed to fetch category");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getCategory();
	}, []);
	if (loading || !category) {
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
				mainTitle={`${category?.title} Subcategories`}
				parent={CategoriesTitle}
				title={SubcategoriesTitle}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<Card>
							<CardBody>
								<SubcategoriesCards
									id={id}
									category={category}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SubcategoriesContainer;
