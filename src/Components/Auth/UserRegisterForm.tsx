// Role-based multi-step wizard registration form for all roles
// Components used: BasicInfo, Profile (step 2), RoleSpecific (step 3)
// Logic for Admin stays single-step, others split into 3 steps

"use client";
import React, { useState, ChangeEvent, useRef } from "react";
import {
	Button,
	Card,
	CardBody,
	Col,
	Form,
	Row,
	Input,
	Label,
} from "reactstrap";
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
import { ImagePath } from "@/Constant";

const MultiStepRegister = () => {
	const [step, setStep] = useState(1);
	const [role, setRole] = useState("admin");
	const [formData, setFormData] = useState<any>({});
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const { register } = useAuth();
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value, type, files } = e.target as any;
		const newValue = type === "file" ? files[0] : value;

		if (type === "file" && files[0]) {
			const file = files[0];
			setPhotoFile(file);
			const reader = new FileReader();
			reader.onload = () => setPhotoPreview(reader.result as string);
			reader.readAsDataURL(file);
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
		if (role === "admin") {
			handleSubmitAdmin();
			return;
		}
		try {
			const form = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (key !== "confirmPassword" && key !== "photo") {
					form.append(key, value as string);
				}
			});

			// Only append photo once (if exists)
			if (photoFile && role !== "admin") {
				form.append("photo", photoFile);
			} else {
				// Convert default image to Blob and append
				const defaultImage = await fetch("/assets/images/forms/user.png");
				const blob = await defaultImage.blob();
				const file = new File([blob], "default-photo.png", { type: blob.type });
				form.append("photo", file);
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
				<Link
					className="logo"
					href="/admin/dashboard">
					<Image
						priority
						width={200}
						height={34}
						className="img-fluid for-light"
						src={imageOne}
						alt="login page"
					/>
					<Image
						priority
						width={200}
						height={34}
						className="img-fluid for-dark"
						src={imageTwo}
						alt="login page"
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

						{step === 2 && isMultiStep && (
							<Row className="g-3 avatar-upload">
								<Col xs={12}>
									<div>
										<div className="avatar-edit">
											<Input
												onChange={handleChange}
												innerRef={fileInputRef}
												type="file"
												accept=".png, .jpg, .jpeg"
												name="photo"
											/>
											<Label
												htmlFor="photo"
												onClick={() => fileInputRef.current?.click()}
											/>
										</div>
										<div className="avatar-preview">
											<div
												id="image"
												style={{
													backgroundImage: photoPreview
														? `url(${photoPreview})`
														: `url(${ImagePath}/forms/user.png)`,
												}}
											/>
										</div>
									</div>
									<h3 className="mt-2 text-center">Upload Profile Photo</h3>
								</Col>
							</Row>
						)}

						{step === 3 && isMultiStep && getRoleForm()}

						<div className="text-end pt-3">
							{step > 1 && isMultiStep && (
								<Button
									color="secondary"
									onClick={handleBack}
									className="me-1">
									Back
								</Button>
							)}

							<Button
								color="primary"
								disabled={formData.password !== formData.confirmPassword}
								onClick={
									(role === "admin" && step === 1) ||
									(isMultiStep && step === 3)
										? handleSubmit
										: handleNext
								}>
								{(role === "admin" && step === 1) || (isMultiStep && step === 3)
									? "Submit"
									: step === 2 && !formData.photo
									? "Skip"
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
