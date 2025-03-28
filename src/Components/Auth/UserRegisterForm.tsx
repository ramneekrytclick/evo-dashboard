"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserRegisterForm = () => {
	const [role, setRole] = useState("admin");
	const [formData, setFormData] = useState<any>({});
	const [photo, setPhoto] = useState<File | null>(null);
	const router = useRouter();

	const isPasswordMatch = formData.password === formData.confirmPassword;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const URL = process.env.NEXT_PUBLIC_BASE_URL;
			const form = new FormData();

			Object.entries(formData).forEach(([key, value]) => {
				if (key !== "confirmPassword") form.append(key, value as string);
			});
			if (photo && role !== "admin") {
				form.append("photo", photo);
			}

			const endpoint =
				role === "admin"
					? "admin/register"
					: role === "students"
					? "students/signup"
					: role === "mentors"
					? "mentors/signup"
					: role === "publishers/auth"
					? "publishers/auth/signup"
					: role === "course-creators/auth"
					? "course-creators/auth/signup"
					: role === "managers/auth"
					? "managers/auth/signup"
					: role === "jobs"
					? "jobs/signup"
					: "";

			const res = await axios.post(`${URL}/api/${endpoint}`, form);
			toast.success(res.data.message || "Registration successful!");
			router.push("/auth/login");
		} catch (error: any) {
			const errorMsg =
				error?.response?.data?.message ||
				error?.message ||
				"Registration failed";
			toast.error(errorMsg);
		}
	};

	const renderRoleSpecificFields = () => {
		switch (role) {
			case "students":
				return (
					<>
						<FormGroup>
							<Label>DOB</Label>
							<Input
								type="date"
								name="dob"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Contact Number</Label>
							<Input
								name="contactNumber"
								placeholder="Enter your phone number"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Guardian Name</Label>
							<Input
								name="guardianName"
								placeholder="Enter guardian's full name"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Address</Label>
							<Input
								name="address"
								placeholder="Enter your full address"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Education</Label>
							<Input
								name="education"
								placeholder="E.g. B.Tech in CSE"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Preferred Languages</Label>
							<Input
								name="preferredLanguages"
								placeholder="E.g. JavaScript, Python"
								onChange={handleInputChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Wanna Be Interest</Label>
							<Input
								name="wannaBeInterest"
								placeholder="E.g. Frontend Developer, ML Engineer"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Experience</Label>
							<Input
								name="experience"
								placeholder="E.g. Freelancing, Internship at XYZ"
								onChange={handleInputChange}
							/>
						</FormGroup>
					</>
				);

			case "mentors":
			case "publishers/auth":
			case "course-creators/auth":
			case "managers/auth":
				return (
					<>
						<FormGroup>
							<Label>Username</Label>
							<Input
								name="username"
								placeholder="Unique username"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>DOB</Label>
							<Input
								type="date"
								name="dob"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Contact Number</Label>
							<Input
								name="contactNumber"
								placeholder="Enter your contact number"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Education</Label>
							<Input
								name="education"
								placeholder="E.g. M.Sc in AI"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Working Mode</Label>
							<Input
								name="workingMode"
								placeholder="Online / Offline / Hybrid"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Address</Label>
							<Input
								name="address"
								placeholder="Enter your full address"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						{role === "mentors" && (
							<FormGroup>
								<Label>Expertise</Label>
								<Input
									name="expertise"
									placeholder="E.g. MERN Stack, Data Science"
									onChange={handleInputChange}
									required
								/>
							</FormGroup>
						)}
						<FormGroup>
							<Label>Bio/About</Label>
							<Input
								name={role === "mentors" ? "bio" : "about"}
								placeholder="Brief about your background"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
					</>
				);

			case "jobs":
				return (
					<>
						<FormGroup>
							<Label>Type</Label>
							<Input
								name="type"
								placeholder="Company / Individual / Startup"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Contact Number</Label>
							<Input
								name="contactNumber"
								placeholder="Enter official contact number"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Industry</Label>
							<Input
								name="industry"
								placeholder="E.g. IT, Marketing, Finance"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Address</Label>
							<Input
								name="address"
								placeholder="Company address"
								onChange={handleInputChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label>Company Size</Label>
							<Input
								name="companySize"
								placeholder="E.g. 10-50 employees"
								onChange={handleInputChange}
							/>
						</FormGroup>
					</>
				);

			default:
				return null;
		}
	};

	return (
		<div className="register-wrapper">
			{/* Website Logo */}
			<div className="logo mb-4 text-center">
				<Link href="/">
					<Image
						src={imageOne}
						width={200}
						height={34}
						alt="Facetroop Logo Light"
						className="img-fluid for-light"
						priority
					/>
					<Image
						src={imageTwo}
						width={200}
						height={34}
						alt="Facetroop Logo Dark"
						className="img-fluid for-dark"
						priority
					/>
				</Link>
			</div>

			{/* Registration Form */}
			<div className="login-main">
				<Form
					className="theme-form"
					onSubmit={handleRegister}
					encType="multipart/form-data">
					<h4>Create a New Account</h4>
					<p>Fill in your details to register</p>

					{/* Form inputs here (already updated previously) */}
					<FormGroup>
						<Label>Select Role</Label>
						<Input
							type="select"
							value={role}
							onChange={(e) => setRole(e.target.value)}
							required>
							<option value="admin">Admin</option>
							<option value="mentors">Mentor</option>
							<option value="publishers/auth">Publisher</option>
							<option value="managers/auth">Manager</option>
							<option value="course-creators/auth">Course Creator</option>
							<option value="students">Student</option>
							<option value="jobs">Employer</option>
						</Input>
					</FormGroup>

					{/* Shared Inputs */}
					<FormGroup>
						<Label>Name</Label>
						<Input
							name="name"
							placeholder="Full Name"
							onChange={handleInputChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input
							name="email"
							type="email"
							placeholder="Email"
							onChange={handleInputChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input
							name="password"
							type="password"
							placeholder="Password"
							onChange={handleInputChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label>Confirm Password</Label>
						<Input
							name="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							onChange={handleInputChange}
							required
						/>
					</FormGroup>

					{/* Conditional Photo Upload */}
					{role !== "admin" && (
						<FormGroup>
							<Label>Upload Photo</Label>
							<Input
								type="file"
								onChange={handlePhotoChange}
								accept="image/*"
							/>
						</FormGroup>
					)}

					{/* Role-specific fields */}
					{renderRoleSpecificFields()}

					{/* Submit + Login Link */}
					<div className="form-footer mt-3 d-flex justify-content-between align-items-center">
						<Link
							href="/auth/login"
							className="text-primary">
							Already have an account? Login
						</Link>
						<Button
							type="submit"
							color="primary"
							disabled={!isPasswordMatch}>
							Register
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default UserRegisterForm;
