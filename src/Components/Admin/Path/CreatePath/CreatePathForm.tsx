"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { toast } from "react-toastify";
import { Col, Form, Input, Label, Row, Button } from "reactstrap";
import { getCourses } from "@/app/api/admin/course";
import { createPath } from "@/app/api/admin/path";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";
import { CourseProps } from "@/Types/Course.type";

const MAX_IMAGE_SIZE_MB = 2;

const CreatePathForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<any>({
		title: "",
		description: "",
		timing: "",
		price: 0,
		courses: [],
		wannaBeInterest: [],
	});
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [wannaBeInterests, setWannaBeInterests] = useState<any[]>([]);
	const [photo, setPhoto] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const [courseRes, wannaBeRes] = await Promise.all([
					getCourses(),
					getWannaBeInterests(),
				]);
				setCourses(courseRes);
				setWannaBeInterests(wannaBeRes);
			} catch (err) {
				toast.error("Failed to load resources");
			}
		})();
	}, []);

	const courseOptions = courses.map((c) => ({
		label: c.title,
		value: c._id,
	}));

	const interestOptions = wannaBeInterests.map((w) => ({
		label: w.title,
		value: w._id,
	}));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "price" ? Number(value) : value,
		});
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
			toast.error("Image must be less than 2MB");
			return;
		}

		setPhoto(file);
		setPhotoPreview(URL.createObjectURL(file));
	};

	const validateForm = () => {
		if (!formData.title.trim()) return "Title is required";
		if (!formData.description.trim()) return "Description is required";
		if (!formData.timing.trim()) return "Timing is required";
		if (formData.courses.length === 0) return "At least one course is required";
		if (formData.wannaBeInterest.length === 0)
			return "At least one interest is required";
		return null;
	};

	const handleSubmit = async () => {
		const errorMsg = validateForm();
		if (errorMsg) {
			toast.error(errorMsg);
			return;
		}

		const submissionData = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			submissionData.append(
				key,
				Array.isArray(value) ? value.join(",") : String(value)
			);
		});
		if (photo) submissionData.append("photo", photo);

		setIsSubmitting(true);

		await toast.promise(createPath(photo ? { ...formData, photo } : formData), {
			pending: "Creating path...",
			success: "Path created successfully!",
			error: "Failed to create path",
		});

		// Reset state after success
		setFormData({
			title: "",
			description: "",
			timing: "",
			price: 0,
			courses: [],
			wannaBeInterest: [],
		});
		setPhoto(null);
		setPhotoPreview(null);
		setIsSubmitting(false);

		setTimeout(() => router.push("/admin/paths"), 1000);
	};

	return (
		<Form onSubmit={(e) => e.preventDefault()}>
			<Row className='g-3'>
				<Col md={6}>
					<Label>Path Title *</Label>
					<Input
						name='title'
						value={formData.title}
						onChange={handleChange}
					/>
				</Col>
				<Col md={6}>
					<Label>Description *</Label>
					<Input
						name='description'
						value={formData.description}
						onChange={handleChange}
					/>
				</Col>
				<Col md={6}>
					<Label>Timing *</Label>
					<Input
						name='timing'
						value={formData.timing}
						onChange={handleChange}
					/>
				</Col>
				<Col md={6}>
					<Label>Photo (max 2MB)</Label>
					<Input
						type='file'
						accept='image/*'
						onChange={handleImageChange}
					/>
					{photoPreview && (
						<img
							src={photoPreview}
							alt='preview'
							style={{
								marginTop: "10px",
								maxWidth: "100%",
								maxHeight: "200px",
							}}
						/>
					)}
				</Col>
				<Col md={6}>
					<Label>Courses *</Label>
					<Select
						isMulti
						name='courses'
						options={courseOptions}
						value={courseOptions.filter((c) =>
							formData.courses.includes(c.value)
						)}
						onChange={(selected) =>
							setFormData({
								...formData,
								courses: selected.map((s) => s.value),
							})
						}
					/>
				</Col>
				<Col md={6}>
					<Label>WannaBe Interests *</Label>
					<Select
						isMulti
						name='wannaBeInterest'
						options={interestOptions}
						value={interestOptions.filter((i) =>
							formData.wannaBeInterest.includes(i.value)
						)}
						onChange={(selected) =>
							setFormData({
								...formData,
								wannaBeInterest: selected.map((s) => s.value),
							})
						}
					/>
				</Col>
				<Col
					xs={12}
					className='text-end mt-3'>
					<Button
						color='primary'
						disabled={isSubmitting}
						onClick={handleSubmit}>
						{isSubmitting ? "Submitting..." : "Create Path"}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreatePathForm;
