import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { CourseProps, PromoCodeProps } from "@/Types/Course.type";
import { createPromoCode } from "@/app/api/admin/promo-codes";
import { PathProps } from "@/Types/Path.type";
import { getCourses } from "@/app/api/admin/course";
import { getPaths } from "@/app/api/admin/path";

interface PromoCodeCreationFormProps {
	toggle: () => void;
	fetchData: () => Promise<void>;
}

const PromoCodeCreationForm = ({
	toggle,
	fetchData,
}: PromoCodeCreationFormProps) => {
	const [formData, setFormData] = useState<Partial<PromoCodeProps>>({
		code: "",
		discountPercentage: 0,
		validUntil: "",
		isActive: true,
		course: null,
		path: null,
	});

	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [paths, setPaths] = useState<PathProps[]>([]);

	useEffect(() => {
		const fetchDataInit = async () => {
			try {
				const courseRes = await getCourses();
				const pathRes = await getPaths();
				setCourses(courseRes);
				setPaths(pathRes);
			} catch (err) {
				toast.error("Error loading data");
			}
		};
		fetchDataInit();
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createPromoCode({
				code: formData.code || "",
				discountPercentage: formData.discountPercentage || 0,
				validUntil: formData.validUntil || "",
				isActive: formData.isActive ?? true,
				course: formData.course || null,
				path: formData.path || null,
			});
			toast.success("Promo code created!");
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			toast.error("Failed to create promo code.");
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;
		const updatedValue = type === "checkbox" ? checked : value;

		setFormData((prev) => ({
			...prev,
			[name]: name === "discountPercentage" ? +updatedValue : updatedValue,
		}));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label>Promo Code</Label>
					<Input
						name="code"
						type="text"
						value={formData.code || ""}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Discount (%)</Label>
					<Input
						name="discountPercentage"
						type="number"
						value={formData.discountPercentage || 0}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Valid Until</Label>
					<Input
						name="validUntil"
						type="date"
						value={formData.validUntil?.toString().split("T")[0] || ""}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={6}>
					<Label>Apply to Course</Label>
					<Input
						type="select"
						name="course"
						value={(formData.course as any)?._id || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								course: e.target.value ? { _id: e.target.value } : null,
								path: null,
							})
						}>
						<option value="">-- Select Course --</option>
						{courses?.map((course) => (
							<option
								key={course._id}
								value={course._id}>
								{course.name}
							</option>
						))}
					</Input>
				</Col>
				<Col md={6}>
					<Label>Apply to Path</Label>
					<Input
						type="select"
						name="path"
						value={(formData.path as any)?._id || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								path: e.target.value ? { _id: e.target.value } : null,
								course: null,
							})
						}>
						<option value="">-- Select Path --</option>
						{paths?.map((path) => (
							<option
								key={path._id}
								value={path._id}>
								{path.name}
							</option>
						))}
					</Input>
				</Col>
				<Col md={12}>
					<Label>
						<Input
							type="checkbox"
							name="isActive"
							checked={formData.isActive ?? true}
							onChange={handleChange}
						/>{" "}
						Is Active
					</Label>
				</Col>
				<Col md={12}>
					<Button
						color="primary"
						type="submit">
						Create Promo Code
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default PromoCodeCreationForm;
