"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import {
	createCourse,
	getAllCategories,
	getAllWannaBeInterests,
} from "@/app/api/cc";
import { useAuth } from "@/app/AuthProvider";
import { getSubcategories } from "@/app/api/admin/subcategories";

const SimpleCreateCourseForm = () => {
	const { user } = useAuth();

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		categoryId: "",
		subcategoryId: "",
		wannaBeInterest: [] as string[],
	});

	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [interests, setInterests] = useState([]);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		if (name === "wannaBeInterest") {
			const selectedOptions = Array.from(
				(e.target as HTMLSelectElement).selectedOptions
			).map((opt) => opt.value);
			setFormData((prev) => ({ ...prev, [name]: selectedOptions }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
			if (name === "categoryId") fetchSubcategories(value);
		}
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
			const res = await getSubcategories(categoryId);
			setSubcategories(res);
		} catch (err) {
			console.error(err);
			toast.error("Failed to fetch subcategories");
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const { title, description, categoryId, subcategoryId, wannaBeInterest } =
			formData;

		if (
			!title ||
			!description ||
			!categoryId ||
			!subcategoryId ||
			wannaBeInterest.length === 0
		) {
			return toast.error("Please fill all required fields");
		}

		try {
			await createCourse(formData);
			toast.success("Course created successfully");
			setFormData({
				title: "",
				description: "",
				categoryId: "",
				subcategoryId: "",
				wannaBeInterest: [],
			});
		} catch (err) {
			console.error(err);
			toast.error("Failed to create course");
		}
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

	useEffect(() => {
		if (formData.categoryId) {
			fetchSubcategories(formData.categoryId);
		}
	}, [formData.categoryId]);

	return (
		<Form
			onSubmit={handleSubmit}
			className='p-4 rounded'>
			<Row className='g-3'>
				<Col md={6}>
					<Label>Course Title</Label>
					<Input
						type='text'
						name='title'
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Description</Label>
					<Input
						type='text'
						name='description'
						value={formData.description}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Category</Label>
					<Input
						type='select'
						name='categoryId'
						value={formData.categoryId}
						onChange={handleChange}
						required>
						<option value=''>Select Category</option>
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
						type='select'
						name='subcategoryId'
						value={formData.subcategoryId}
						onChange={handleChange}
						required>
						<option value=''>Select Subcategory</option>
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
						type='select'
						name='wannaBeInterest'
						value={formData.wannaBeInterest}
						onChange={handleChange}
						multiple
						required>
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
					className='text-end'>
					<Button
						type='submit'
						color='primary'>
						Create Course
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default SimpleCreateCourseForm;
