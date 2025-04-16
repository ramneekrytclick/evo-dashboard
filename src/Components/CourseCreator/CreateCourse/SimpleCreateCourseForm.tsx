"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import {
	createCourseByCreator,
	getAllCategories,
	getAllWannaBeInterests,
} from "@/app/api/cc";
import { getSubcategories } from "@/app/api/admin/subcategories";

const CourseCreatorForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		whatYouWillLearn: "",
		youtubeLink: "",
		timing: "",
		realPrice: "",
		discountedPrice: "",
		tags: "",
		categoryId: "",
		subcategoryId: "",
		wannaBeInterestIds: [] as string[],
		photo: null as File | null,
	});

	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [interests, setInterests] = useState([]);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;

		if (type === "file") {
			setFormData((prev) => ({
				...prev,
				photo: (e.target as HTMLInputElement).files?.[0] || null,
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));

			if (name === "categoryId") fetchSubcategories(value);
		}
	};

	const handleCheckboxChange = (id: string) => {
		setFormData((prev) => {
			const exists = prev.wannaBeInterestIds.includes(id);
			const updated = exists
				? prev.wannaBeInterestIds.filter((item) => item !== id)
				: [...prev.wannaBeInterestIds, id];
			return { ...prev, wannaBeInterestIds: updated };
		});
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
		} catch {
			toast.error("Failed to fetch subcategories");
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const {
			title,
			description,
			whatYouWillLearn,
			youtubeLink,
			timing,
			categoryId,
			subcategoryId,
			wannaBeInterestIds,
			realPrice,
			discountedPrice,
			tags,
			photo,
		} = formData;

		if (
			!title ||
			!description ||
			!whatYouWillLearn ||
			!youtubeLink ||
			!timing ||
			!categoryId ||
			!subcategoryId ||
			!realPrice ||
			!discountedPrice ||
			!tags ||
			!wannaBeInterestIds.length ||
			!photo
		) {
			return toast.error("Please fill all required fields including photo");
		}

		try {
			const submissionData = new FormData();
			submissionData.append("title", title);
			submissionData.append("description", description);
			submissionData.append("whatYouWillLearn", whatYouWillLearn);
			submissionData.append("youtubeLink", youtubeLink);
			submissionData.append("timing", timing);
			submissionData.append("realPrice", realPrice);
			submissionData.append("discountedPrice", discountedPrice);
			submissionData.append("tags", tags);
			submissionData.append("categoryId", categoryId);
			submissionData.append("subcategoryId", subcategoryId);
			submissionData.append("photo", photo);
			wannaBeInterestIds.forEach((id) =>
				submissionData.append("wannaBeInterestIds", id)
			);

			await createCourseByCreator(submissionData);
			toast.success("Course created successfully");

			setFormData({
				title: "",
				description: "",
				whatYouWillLearn: "",
				youtubeLink: "",
				timing: "",
				realPrice: "",
				discountedPrice: "",
				tags: "",
				categoryId: "",
				subcategoryId: "",
				wannaBeInterestIds: [],
				photo: null,
			});
		} catch {
			toast.error("Course creation failed");
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
					<Label>Course Photo</Label>
					<Input
						type='file'
						name='photo'
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
				<Col md={12}>
					<Label>Wanna Be Interests</Label>
					<Row>
						{interests.map((int: any) => (
							<Col
								xs={6}
								md={4}
								key={int._id}>
								<div className='form-check'>
									<Input
										className='form-check-input'
										type='checkbox'
										id={`interest-${int._id}`}
										checked={formData.wannaBeInterestIds.includes(int._id)}
										onChange={() => handleCheckboxChange(int._id)}
									/>
									<Label
										className='form-check-label'
										htmlFor={`interest-${int._id}`}>
										{int.title}
									</Label>
								</div>
							</Col>
						))}
					</Row>
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

export default CourseCreatorForm;
