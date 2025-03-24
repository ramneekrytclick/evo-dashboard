// SimpleCreateCourseForm.tsx
"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { createCourse } from "@/app/api/admin/course";
import { getCategories } from "@/app/api/admin/categories";
import { getSubcategories } from "@/app/api/admin/subcategories";
import { toast } from "react-toastify";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";

const SimpleCreateCourseForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		categoryId: "",
		subcategoryId: "",
		wannaBeInterestId: "",
	});

	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [interests, setInterests] = useState([]);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (name === "categoryId") fetchSubcategories(value);
	};

	const fetchInitialData = async () => {
		try {
			const [catRes, intRes] = await Promise.all([
				getCategories(),
				getWannaBeInterests(),
			]);
			setCategories(catRes);
			setInterests(intRes);
		} catch (err) {
			toast.error("Failed to fetch initial data");
		}
	};

	const fetchSubcategories = async (categoryId: string) => {
		try {
			const res = await getSubcategories(categoryId);
			setSubcategories(res);
		} catch {
			toast.error("Failed to fetch subcategories");
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const { name, description, categoryId, subcategoryId, wannaBeInterestId } =
			formData;
		if (
			!name ||
			!description ||
			!categoryId ||
			!subcategoryId ||
			!wannaBeInterestId
		) {
			return toast.error("All fields are required");
		}
		try {
			const res = await createCourse(formData);
			toast.success("Course created successfully");
		} catch (error) {
			toast.error("Failed to create course");
		}
	};

	React.useEffect(() => {
		fetchInitialData();
	}, []);

	return (
		<Form
			onSubmit={handleSubmit}
			className="p-4 rounded">
			<Row className="g-3">
				<Col md={6}>
					<Label>Course Name</Label>
					<Input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Description</Label>
					<Input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Category</Label>
					<Input
						type="select"
						name="categoryId"
						value={formData.categoryId}
						onChange={handleChange}
						required>
						<option value="">Select Category</option>
						{categories.map((cat: any) => (
							<option
								key={cat._id}
								value={cat._id}>
								{cat.name}
							</option>
						))}
					</Input>
				</Col>
				<Col md={6}>
					<Label>Subcategory</Label>
					<Input
						type="select"
						name="subcategoryId"
						value={formData.subcategoryId}
						onChange={handleChange}
						required>
						<option value="">Select Subcategory</option>
						{subcategories.map((sub: any) => (
							<option
								key={sub._id}
								value={sub._id}>
								{sub.name}
							</option>
						))}
					</Input>
				</Col>
				<Col md={6}>
					<Label>Wanna Be Interest</Label>
					<Input
						type="select"
						name="wannaBeInterestId"
						value={formData.wannaBeInterestId}
						onChange={handleChange}
						required>
						<option value="">Select Interest</option>
						{interests.map((int: any) => (
							<option
								key={int._id}
								value={int._id}>
								{int.name}
							</option>
						))}
					</Input>
				</Col>
				<Col
					md={12}
					className="text-end">
					<Button
						type="submit"
						color="primary">
						Create Course
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default SimpleCreateCourseForm;
