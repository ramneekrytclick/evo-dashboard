"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { createCourse } from "@/app/api/admin/course";
import { getCategories } from "@/app/api/admin/categories";
import { getSubcategories } from "@/app/api/admin/subcategories";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";
import { toast } from "react-toastify";

const SimpleCreateCourseForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		whatYouWillLearn: "",
		youtubeLink: "",
		timing: "",
		categoryId: "",
		subcategoryId: "",
		wannaBeInterestId: "",
		realPrice: "",
		discountedPrice: "",
		tags: "",
		createdBy: "admin-id-placeholder", // Replace with actual logic
		review: "No reviews yet",
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
				getCategories(),
				getWannaBeInterests(),
			]);
			setCategories(catRes);
			setInterests(intRes);
		} catch {
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
		const requiredFields = [
			"title",
			"description",
			"whatYouWillLearn",
			"youtubeLink",
			"timing",
			"categoryId",
			"subcategoryId",
			"wannaBeInterestId",
			"realPrice",
			"discountedPrice",
			"tags",
			"createdBy",
			"review",
		];

		for (const field of requiredFields) {
			if (!formData[field as keyof typeof formData]) {
				return toast.error("All fields are required");
			}
		}

		try {
			// No split — send tags as a comma-separated string
			await createCourse(formData);
			toast.success("Course created successfully");
			setFormData({
				title: "",
				description: "",
				whatYouWillLearn: "",
				youtubeLink: "",
				timing: "",
				categoryId: "",
				subcategoryId: "",
				wannaBeInterestId: "",
				realPrice: "",
				discountedPrice: "",
				tags: "",
				createdBy: "admin-id-placeholder",
				review: "No reviews yet",
			});
		} catch (err) {
			toast.error("Failed to create course");
		}
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

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
					<Label>What You Will Learn</Label>
					<Input
						type='textarea'
						name='whatYouWillLearn'
						value={formData.whatYouWillLearn}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>YouTube Link</Label>
					<Input
						type='text'
						name='youtubeLink'
						value={formData.youtubeLink}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Timing</Label>
					<Input
						type='text'
						name='timing'
						value={formData.timing}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Real Price</Label>
					<Input
						type='number'
						name='realPrice'
						value={formData.realPrice}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Discounted Price</Label>
					<Input
						type='number'
						name='discountedPrice'
						value={formData.discountedPrice}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Tags (comma-separated)</Label>
					<Input
						type='text'
						name='tags'
						value={formData.tags}
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
						name='wannaBeInterestId'
						value={formData.wannaBeInterestId}
						onChange={handleChange}
						required>
						<option value=''>Select Interest</option>
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
