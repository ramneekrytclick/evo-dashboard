// ✅ Updated MultiStepRegister with improved UX for OTP sending

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
	Spinner,
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
	const [otpSent, setOtpSent] = useState(false);
	const [otp, setOtp] = useState("");
	const [sendingOtp, setSendingOtp] = useState(false);
	const { register, verifyStudentOtp } = useAuth();
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
		setOtpSent(false); // Re-enable OTP if user edits the form
		setFormData((prev: any) => ({ ...prev, [name]: newValue }));
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
		if (step === 1 && isBasicValid()) setStep(2);
		else if (step === 2) setStep(3);
		else toast.error("Please fill out all required fields.");
	};

	const handleBack = () => setStep((prev) => prev - 1);

	const handleSendOtp = async () => {
		try {
			setSendingOtp(true);
			const form = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (
					key !== "confirmPassword" &&
					(typeof value === "string" || value instanceof Blob)
				) {
					form.append(key, value);
				}
			});
			if (photoFile) form.append("photo", photoFile);
			else {
				const defaultImage = await fetch("/assets/images/forms/user.png");
				const blob = await defaultImage.blob();
				form.append(
					"photo",
					new File([blob], "default-photo.png", { type: blob.type })
				);
			}
			await register(form, role);
			toast.success("OTP sent to your email");
			setOtpSent(true);
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "Failed to send OTP");
		} finally {
			setSendingOtp(false);
		}
	};

	const handleVerifyOtp = async () => {
		try {
			await verifyStudentOtp(formData.email, otp);
			toast.success("Email verified successfully!");
			router.push("/auth/login");
		} catch (error: any) {
			toast.error("Invalid OTP or expired. Please try again.");
		}
	};

	const handleSubmitAdmin = async () => {
		try {
			const form = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			};
			await register(form, role);
			toast.success("Registration successful!");
			router.push("/auth/login");
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ||
					"Something went wrong during registration."
			);
		}
	};

	const getRoleForm = () => {
		if (role === "students") {
			return (
				<StudentForm
					formData={formData}
					handleChange={handleChange}
					otpSent={otpSent}
					handleSendOtp={handleSendOtp}
					otp={otp}
					setOtp={setOtp}
					handleVerifyOtp={handleVerifyOtp}
				/>
			);
		}
		switch (role) {
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
			className='mx-auto'>
			<div className='text-center mb-4'>
				<Link
					className='logo'
					href='/admin/dashboard'>
					<Image
						priority
						width={200}
						height={34}
						className='img-fluid for-light'
						src={imageOne}
						alt='login page'
					/>
					<Image
						priority
						width={200}
						height={34}
						className='img-fluid for-dark'
						src={imageTwo}
						alt='login page'
					/>
				</Link>
			</div>
			<Card>
				<CardBody>
					<Form className='form-wizard'>
						{step === 1 && (
							<BasicInfoForm
								formData={formData}
								handleChange={handleChange}
								role={role}
								setRole={setRole}
							/>
						)}
						{step === 2 && isMultiStep && (
							<Row className='g-3 avatar-upload'>
								<Col xs={12}>
									<div className='avatar-edit'>
										<Input
											onChange={handleChange}
											innerRef={fileInputRef}
											type='file'
											accept='.png, .jpg, .jpeg'
											name='photo'
										/>
										<Label
											htmlFor='photo'
											onClick={() => fileInputRef.current?.click()}
										/>
									</div>
									<div className='avatar-preview'>
										<div
											id='image'
											style={{
												backgroundImage: photoPreview
													? `url(${photoPreview})`
													: `url(${ImagePath}/forms/user.png)`,
											}}
										/>
									</div>
									<h3 className='mt-2 text-center'>Upload Profile Photo</h3>
								</Col>
							</Row>
						)}
						{step === 3 && isMultiStep && getRoleForm()}
						<div className='text-end pt-3'>
							{step > 1 && step < 4 && (
								<Button
									color='secondary'
									onClick={handleBack}
									className='me-1'>
									Back
								</Button>
							)}
							{step < 4 && (
								<Button
									color='primary'
									onClick={() => {
										if (role === "admin" && step === 1) {
											handleSubmitAdmin();
										} else if (role === "students" && step === 3) {
											otpSent ? handleVerifyOtp() : handleSendOtp();
										} else if (
											isMultiStep &&
											step === 3 &&
											role !== "students"
										) {
											handleSubmitAdmin();
										} else {
											handleNext();
										}
									}}
									disabled={
										sendingOtp || formData.password !== formData.confirmPassword
									}>
									{sendingOtp ? (
										<>
											<Spinner
												size='sm'
												className='me-1'
											/>{" "}
											Sending...
										</>
									) : role === "students" && step === 3 ? (
										otpSent ? (
											"Verify OTP"
										) : (
											"Send OTP"
										)
									) : (role === "admin" && step === 1) ||
									  (isMultiStep && step === 3) ? (
										"Submit"
									) : step === 2 && !formData.photo ? (
										"Skip"
									) : (
										"Next"
									)}
								</Button>
							)}
						</div>
						<div className='text-center mt-3'>
							<Link
								href='/auth/login'
								className='text-primary'>
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
