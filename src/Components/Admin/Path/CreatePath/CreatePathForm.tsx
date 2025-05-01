"use client";
import { getCourses } from "@/app/api/admin/course";
import { createPath } from "@/app/api/admin/path";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";
import { CourseProps } from "@/Types/Course.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { Col, Form, Input, Label, Row, Button } from "reactstrap";

const CreatePathForm = () => {
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
	const [photo, setPhoto] = useState<any>(null);
	const courseOptions = courses.map((c) => ({
		label: c.title,
		value: c._id,
	}));
	useEffect(() => {
		(async () => {
			try {
				const courseRes = await getCourses();
				const wannaBeRes = await getWannaBeInterests();
				setCourses(courseRes);
				setWannaBeInterests(wannaBeRes);
			} catch (err) {
				toast.error("Failed to load resources");
			}
		})();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "price" ? Number(value) : value,
		});
	};
	const interestOptions = wannaBeInterests.map((w) => ({
		label: w.title,
		value: w._id,
	}));
	const handleSubmit = async () => {
		if (
			!formData.title ||
			!formData.description ||
			!formData.courses.length ||
			!formData.wannaBeInterest.length
		) {
			toast.error(
				"All fields are required, including at least one course and interest!"
			);
			return;
		}
		const payload = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				payload.append(key, value.join(","));
			} else {
				payload.append(key, String(value));
			}
		});
		if (photo) payload.append("photo", photo);

		try {
			if (photo) {
				await createPath({ ...formData, photo });
			} else {
				await createPath(formData);
			}

			toast.success("Path created successfully");
			setFormData({
				title: "",
				description: "",
				timing: "",
				price: 0,
				courses: [],
				wannaBeInterest: [],
			});
			setPhoto(null);
		} catch (err) {
			toast.error("Failed to create path");
		}
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
					<Label>Photo</Label>
					<Input
						type='file'
						onChange={(e) => setPhoto(e.target.files?.[0] || null)}
					/>
				</Col>
				<Col md={6}>
					<Label for='courses'>Courses</Label>
					<Select
						isMulti
						name='courses'
						options={courseOptions}
						value={courseOptions.filter((c) =>
							formData.courses.includes(c.value || "")
						)}
						onChange={(selected) =>
							setFormData({
								...formData,
								courses: selected.map((s) => s.value || ""),
							})
						}
						className='basic-multi-select'
						classNamePrefix='select'
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
						className='basic-multi-select'
						classNamePrefix='select'
					/>
				</Col>
				<Col
					xs={12}
					className='text-end mt-3'>
					<Button
						color='primary'
						onClick={handleSubmit}>
						Create Path
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreatePathForm;
