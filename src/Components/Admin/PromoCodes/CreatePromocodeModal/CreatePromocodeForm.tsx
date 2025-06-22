import React, { FormEvent, useEffect, useState } from "react";
import {
	Button,
	Col,
	Form,
	Input,
	Label,
	Row,
	Card,
	CardBody,
	CardTitle,
	Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import { CourseProps, PromoCodeProps } from "@/Types/Course.type";
import { createPromoCode } from "@/app/api/admin/promo-codes";
import { getCourses } from "@/app/api/admin/course";

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
		course: { _id: "", title: "" },
		usageLimit: undefined,
	});
	const [loading, setLoading] = useState(false);
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [isOverall, setIsOverall] = useState(false);

	useEffect(() => {
		const fetchDataInit = async () => {
			try {
				const courseRes = await getCourses();
				setCourses(courseRes);
			} catch (err) {
				toast.error("Error loading courses");
			}
		};
		fetchDataInit();
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!formData.course && !formData.usageLimit) {
			toast.error("Set course or usage limit for overall promo");
			return;
		}
		setLoading(true);
		toast.promise(
			createPromoCode({
				code: formData.code || "",
				discountPercentage: formData.discountPercentage || 0,
				validUntil: formData.validUntil || "",
				isActive: formData.isActive ?? true,
				course: isOverall ? undefined : formData.course || undefined,
				usageLimit: isOverall ? formData.usageLimit || 1 : undefined,
			}),
			{
				pending: "Creating promo code...",
				success: {
					render() {
						fetchData();
						setLoading(false);
						toggle();
						return "Promo code created!";
					},
				},
				error: {
					render({ data }) {
						setLoading(false);
						console.error(data);
						return "Failed to create promo code.";
					},
				},
			}
		);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;
		const updatedValue = type === "checkbox" ? checked : value;

		if (name === "isOverall") {
			setIsOverall(checked);
			setFormData((prev) => ({
				...prev,
				course: undefined,
				usageLimit: checked ? 1 : undefined,
			}));
			return;
		}

		setFormData((prev) => ({
			...prev,
			[name]:
				name === "discountPercentage" || name === "usageLimit"
					? +updatedValue
					: updatedValue,
		}));
	};

	return (
		<Card className='shadow border-0'>
			<CardBody>
				<Form onSubmit={handleSubmit}>
					<Row className='g-4'>
						<Col md={12}>
							<Label className='fw-semibold'>Promo Code</Label>
							<Input
								name='code'
								type='text'
								value={formData.code || ""}
								onChange={handleChange}
								placeholder='E.g. WELCOME50'
								required
							/>
						</Col>
						<Col md={6}>
							<Label className='fw-semibold'>Discount (%)</Label>
							<Input
								name='discountPercentage'
								type='number'
								value={formData.discountPercentage || 0}
								onChange={handleChange}
								min={1}
								max={100}
								required
							/>
						</Col>
						<Col md={6}>
							<Label className='fw-semibold'>Valid Until</Label>
							<Input
								name='validUntil'
								type='date'
								min={new Date().toISOString().split("T")[0]}
								value={formData.validUntil?.toString().split("T")[0] || ""}
								onChange={handleChange}
								required
							/>
						</Col>

						<Col md={12}>
							<Label
								check
								className='fw-semibold'>
								<Input
									type='checkbox'
									name='isOverall'
									checked={isOverall}
									onChange={handleChange}
								/>{" "}
								Apply as Overall Promo (not course-specific)
							</Label>
						</Col>

						{!isOverall && (
							<Col md={12}>
								<Label className='fw-semibold'>Apply to Course</Label>
								<Input
									type='select'
									name='course'
									value={formData.course?._id || ""}
									onChange={(e) =>
										setFormData({
											...formData,
											course: e.target.value
												? { _id: e.target.value, title: "" }
												: undefined,
										})
									}>
									<option value=''>-- Select Course --</option>
									{courses?.map((course) => (
										<option
											key={course._id}
											value={course._id}>
											{course.title}
										</option>
									))}
								</Input>
							</Col>
						)}

						{isOverall && (
							<Col md={12}>
								<Label className='fw-semibold'>Usage Limit</Label>
								<Input
									name='usageLimit'
									type='number'
									value={formData.usageLimit || 1}
									min={1}
									onChange={handleChange}
									required
								/>
							</Col>
						)}

						<Col
							md={12}
							className='text-end'>
							<Button
								color='primary'
								disabled={loading}
								type='submit'>
								{loading ? (
									<>
										<Spinner />
									</>
								) : (
									"Create Promo Code"
								)}
							</Button>
						</Col>
					</Row>
				</Form>
			</CardBody>
		</Card>
	);
};

export default PromoCodeCreationForm;
