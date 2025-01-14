import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { AddCategory, AddSubCategory } from "@/Constant";
import SVG from "@/CommonComponent/SVG";
import { CourseFormProps } from "@/Types/Course.type";
import { getCategories } from "@/app/api/admin/categories";
import { getSubcategories } from "@/app/api/admin/subcategories";

interface CourseCategoriesProps {
	activeCallBack: (tab: number) => void;
	data: CourseFormProps;
	setData: (data: CourseFormProps) => void;
}

const CourseCategories: React.FC<CourseCategoriesProps> = ({
	activeCallBack,
	data,
	setData,
}) => {
	const [categories, setCategories] = useState([{ _id: "", name: "" }]);
	const [subcategories, setSubcategories] = useState([
		{ _id: "", name: "", categoryId: "" },
	]);
	const [formData, setFormData] = useState({
		category: { _id: "", name: "" },
		subcategory: { _id: "", categoryId: "", name: "" },
	});

	const { category, subcategory } = formData;

	const updateFormData = <T extends keyof typeof formData>(
		key: T,
		update: Partial<(typeof formData)[T]>
	) => {
		setFormData((prev) => ({
			...prev,
			[key]: { ...prev[key], ...update },
		}));
	};

	const handleCategoryChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const selectedCategoryId = e.target.value;
		const selectedCategory = categories.find(
			(cat) => cat._id === selectedCategoryId
		);

		updateFormData("category", {
			_id: selectedCategoryId,
			name: selectedCategory?.name || "",
		});
		// Reset subcategory on category change
		updateFormData("subcategory", {
			_id: "",
			name: "",
			categoryId: "",
		});

		// Fetch subcategories if category is selected
		if (selectedCategoryId) {
			await fetchSubcategories(selectedCategoryId);
		} else {
			setSubcategories([]);
		}
	};

	const handleSubcategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedSubcategoryId = e.target.value;
		const selectedSubcategory = subcategories.find(
			(sub) => sub._id === selectedSubcategoryId
		);

		updateFormData("subcategory", {
			_id: selectedSubcategoryId,
			name: selectedSubcategory?.name || "",
			categoryId: selectedSubcategory?.categoryId || "",
		});
	};

	const fetchCategories = async () => {
		try {
			const response = await getCategories();
			setCategories(response.categories);
		} catch (error) {
			toast.error("Failed to fetch categories.");
		}
	};

	const fetchSubcategories = async (categoryId: string) => {
		try {
			const response = await getSubcategories(categoryId);
			setSubcategories(response.subcategories);
		} catch (error) {
			toast.error("Failed to fetch subcategories.");
		}
	};

	const handleNextButton = () => {
		if (category._id && subcategory._id) {
			activeCallBack(3);
		} else {
			toast.error("Please select both category and subcategory.");
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		setData({ ...data, category, subcategory });
	}, [formData]);

	return (
		<div className="sidebar-body">
			<Form>
				<Row className="g-2 border rounded-3 py-2 px-1">
					<Col xs={6}>
						<Label className="m-0">{AddCategory}<span className="ms-1 my-1 txt-danger">{"*"}</span></Label>
						<Input
							type="select"
							name="category"
							value={category._id} // Bind to category._id
							onChange={handleCategoryChange}>
							<option value="">Select a Category</option>
							{categories.map((item) => (
								<option
									key={item._id}
									value={item._id}>
									{item.name}
								</option>
							))}
						</Input>
					</Col>
					<Col xs={6}>
						<Label className="m-0">{AddSubCategory}<span className="ms-1 my-1 txt-danger">{"*"}</span></Label>
						<Input
							type="select"
							name="subcategory"
							value={subcategory._id} // Bind to subcategory._id
							onChange={handleSubcategoryChange}
							disabled={!subcategories.length}>
							<option value="">Select a Subcategory</option>
							{subcategories.map((item) => (
								<option
									key={item._id}
									value={item._id}>
									{item.name}
								</option>
							))}
						</Input>
					</Col>
				</Row>
			</Form>
			<div className="product-buttons">
				<Button
					color="transparent"
					className="me-1"
					onClick={() => activeCallBack(1)}>
					<div className="d-flex align-items-center gap-sm-2 gap-1">
						<SVG iconId="back-arrow" /> {"Previous"}
					</div>
				</Button>
				<Button
					color="transparent"
					onClick={handleNextButton}>
					<div className="d-flex align-items-center gap-sm-2 gap-1">
						{"Next"} <SVG iconId="front-arrow" />
					</div>
				</Button>
			</div>
		</div>
	);
};

export default CourseCategories;
