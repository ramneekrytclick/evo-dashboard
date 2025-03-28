// Role-based multi-step wizard registration form for all roles
// Components used: BasicInfo, RoleSpecific (step 2), ImageUpload, FinalReview
// Logic for Admin stays single-step, others split into 2-3 steps depending on fields
"use client";
import React, { useState, ChangeEvent } from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import { toast } from "react-toastify";
import BasicInfoForm, {
	EmployerForm,
	MentorForm,
	StudentForm,
} from "./FormSteps";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";

const MultiStepRegister = () => {
	const [step, setStep] = useState(1);
	const [role, setRole] = useState("admin");
	const [formData, setFormData] = useState<any>({});
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const { register } = useAuth();
	const router = useRouter();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value, type, files } = e.target as any;
		const newValue = type === "file" ? files[0] : value;

		if (type === "file" && files[0]) {
			const reader = new FileReader();
			reader.onload = () => setPhotoPreview(reader.result as string);
			reader.readAsDataURL(files[0]);
		}

		setFormData((prev: any) => ({
			...prev,
			[name]: newValue,
		}));
	};

	const isBasicValid = () => {
		const { name, email, password, confirmPassword } = formData;
		return (
			name &&
			email &&
			password &&
			confirmPassword &&
			password === confirmPassword
		);
	};

	const handleNext = () => {
		if (step === 1 && isBasicValid()) {
			setStep(2);
		} else if (step === 2) {
			setStep(3);
		} else {
			toast.error("Please fill out all required fields.");
		}
	};

	const handleBack = () => {
		setStep((prev) => prev - 1);
	};

	const handleSubmit = async () => {
		if (role == "admin") {
			handleSubmitAdmin();
			return;
		}
		try {
			const form = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (key !== "confirmPassword") {
					form.append(key, value as string);
				}
			});
			if (formData.photo && role !== "admin") {
				form.append("photo", formData.photo);
			}
			const res = await register(form, role);

			toast.success(res.message || "Registration successful!");
			router.push("/auth/login");
		} catch (error: any) {
			const errorMsg =
				error?.response?.data?.message ||
				error?.message ||
				"Something went wrong during registration.";
			toast.error(errorMsg);
		}
	};
	const handleSubmitAdmin = async () => {
		try {
			const form = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			};
			const res = await register(form, role);

			toast.success(res.message || "Registration successful!");
			router.push("/auth/login");
		} catch (error: any) {
			const errorMsg =
				error?.response?.data?.message ||
				error?.message ||
				"Something went wrong during registration.";
			toast.error(errorMsg);
		}
	};

	const getRoleForm = () => {
		switch (role) {
			case "students":
				return (
					<StudentForm
						formData={formData}
						handleChange={handleChange}
					/>
				);
			case "mentors":
			case "publishers/auth":
			case "course-creators/auth":
			case "managers/auth":
				return (
					<MentorForm
						formData={formData}
						handleChange={handleChange}
						role={role}
					/>
				);
			case "jobs":
				return (
					<EmployerForm
						formData={formData}
						handleChange={handleChange}
					/>
				);
			default:
				return null;
		}
	};

	const isMultiStep = role !== "admin";

	return (
		<Col
			xl={6}
			className="mx-auto">
			<div className="text-center mb-4">
				<Link href="/">
					<Image
						src={imageOne}
						width={200}
						height={70}
						alt="Logo Light"
						className="for-light"
						priority
					/>
					<Image
						src={imageTwo}
						width={200}
						height={34}
						alt="Logo Dark"
						className="for-dark"
						priority
					/>
				</Link>
			</div>
			<Card>
				<CardBody>
					<Form className="form-wizard">
						{step === 1 && (
							<BasicInfoForm
								formData={formData}
								handleChange={handleChange}
								role={role}
								setRole={setRole}
							/>
						)}
						{step === 2 && isMultiStep && getRoleForm()}

						<div className="text-end pt-3">
							{step > 1 && isMultiStep && (
								<Button
									color="secondary"
									onClick={handleBack}
									className="me-1">
									Back
								</Button>
							)}

							{/* Step-based logic for button text and action */}
							<Button
								color="primary"
								onClick={
									(role === "admin" && step === 1) ||
									(isMultiStep && step === 2)
										? handleSubmit
										: handleNext
								}>
								{(role === "admin" && step === 1) || (isMultiStep && step === 2)
									? "Submit"
									: "Next"}
							</Button>
						</div>
						<div className="text-center mt-3">
							<Link
								href="/auth/login"
								className="text-primary">
								Already have an account? Login
							</Link>
						</div>
					</Form>
				</CardBody>
			</Card>
		</Col>
	);
};

export default MultiStepRegister;
