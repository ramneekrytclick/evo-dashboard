"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import {
	createCourse,
	getAllCategories,
	getAllSubcategories,
	getAllWannaBeInterests,
} from "@/app/api/cc";
import { useAuth } from "@/app/AuthProvider";

const SimpleCreateCourseForm = () => {
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		categoryId: "",
		subcategoryId: "",
		wannaBeInterest: "",
	});

	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [interests, setInterests] = useState([]);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (name === "categoryId") fetchSubcategories(value);
	};

	const fetchInitialData = async () => {
		try {
			const [catRes, intRes] = await Promise.all([
				getAllCategories(),
				getAllWannaBeInterests(),
			]);
			setCategories(catRes.categories);
			setInterests(intRes.interests);
		} catch {
			toast.error("Failed to fetch initial data");
		}
	};

	const fetchSubcategories = async (categoryId: string) => {
		try {
			const res = await getAllSubcategories();
			setSubcategories(
				res.subcategories.filter((sub: any) => sub.categoryId === categoryId)
			);
		} catch {
			toast.error("Failed to fetch subcategories");
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const { name, description, categoryId, subcategoryId, wannaBeInterest } =
			formData;

		if (
			!name ||
			!description ||
			!categoryId ||
			!subcategoryId ||
			!wannaBeInterest
		) {
			return toast.error("Please fill all required fields");
		}

		try {
			await createCourse(formData);
			toast.success("Course created successfully");
			setFormData({
				name: "",
				description: "",
				categoryId: "",
				subcategoryId: "",
				wannaBeInterest: "",
			});
		} catch (err) {
			console.error(err);
			toast.error("Failed to create course");
		}
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

	return (
		<Form
			onSubmit={handleSubmit}
			className="p-4 rounded">
			<Row className="g-3">
				<Col md={6}>
					<Label>Course Title</Label>
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
								{cat.title}
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
								{sub.title}
							</option>
						))}
					</Input>
				</Col>
				<Col md={6}>
					<Label>Wanna Be Interest</Label>
					<Input
						type="select"
						name="wannaBeInterest"
						value={formData.wannaBeInterest}
						onChange={handleChange}
						required>
						<option value="">Select Interest</option>
						{interests.map((int: any) => (
							<option
								key={int._id}
								value={int._id}>
								{int.title}
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
