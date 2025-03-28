"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserRegisterForm = () => {
	const [role, setRole] = useState("students");
	const [formData, setFormData] = useState<any>({});
	const [photo, setPhoto] = useState<File | null>(null);
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();

	const isPasswordMatch = formData.password === confirmPassword;
	const URL = process.env.NEXT_PUBLIC_BASE_URL;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isPasswordMatch) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			const form = new FormData();
			for (const key in formData) {
				form.append(key, formData[key]);
			}
			if (photo) {
				form.append("photo", photo);
			}

			const res = await axios.post(`${URL}${role}/signup`, form);
			toast.success("Registration successful!");
			router.push("/auth/login");
		} catch (error: any) {
			const msg =
				error?.response?.data?.message ||
				error?.message ||
				"Registration failed";
			toast.error(msg);
		}
	};

	const isFieldVisible = (field: string) => {
		const roleLower = role.toLowerCase();
		const roleFields: Record<string, string[]> = {
			students: [
				"dob",
				"contactNumber",
				"guardianName",
				"address",
				"education",
				"preferredLanguages",
				"wannaBeInterest",
				"experience",
			],
			mentors: [
				"username",
				"dob",
				"contactNumber",
				"bio",
				"address",
				"education",
				"expertise",
				"workingMode",
			],
			"publishers/auth": [
				"username",
				"dob",
				"contactNumber",
				"address",
				"workingMode",
				"education",
				"about",
			],
			"course-creators/auth": [
				"username",
				"dob",
				"contactNumber",
				"address",
				"workingMode",
				"education",
				"about",
			],
			"managers/auth": [
				"username",
				"dob",
				"contactNumber",
				"about",
				"address",
				"education",
				"workingMode",
			],
			jobs: ["type", "contactNumber", "industry", "address", "companySize"],
		};

		return roleFields[role]?.includes(field);
	};

	return (
		<div>
			<div>
				<Link
					className="logo"
					href="/">
					<Image
						priority
						width={200}
						height={34}
						className="img-fluid for-light"
						src={imageOne}
						alt="register page"
					/>
					<Image
						priority
						width={200}
						height={34}
						className="img-fluid for-dark"
						src={imageTwo}
						alt="register page"
					/>
				</Link>
			</div>

			<div className="login-main">
				<Form
					className="theme-form"
					onSubmit={handleSubmit}>
					<h4>Create a New Account</h4>
					<p>Fill in your details to register</p>

					<FormGroup>
						<Label>Select Role</Label>
						<Input
							type="select"
							value={role}
							onChange={(e) => {
								setRole(e.target.value);
								setFormData({}); // reset on role change
							}}
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

					<FormGroup>
						<Label>Name</Label>
						<Input
							type="text"
							name="name"
							onChange={handleChange}
							required
						/>
					</FormGroup>

					{isFieldVisible("username") && (
						<FormGroup>
							<Label>Username</Label>
							<Input
								type="text"
								name="username"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					<FormGroup>
						<Label>Email</Label>
						<Input
							type="email"
							name="email"
							onChange={handleChange}
							required
						/>
					</FormGroup>

					<FormGroup>
						<Label>Password</Label>
						<Input
							type="password"
							name="password"
							onChange={handleChange}
							required
						/>
					</FormGroup>

					<FormGroup>
						<Label>Confirm Password</Label>
						<Input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</FormGroup>

					{isFieldVisible("dob") && (
						<FormGroup>
							<Label>Date of Birth</Label>
							<Input
								type="date"
								name="dob"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("contactNumber") && (
						<FormGroup>
							<Label>Contact Number</Label>
							<Input
								type="text"
								name="contactNumber"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("guardianName") && (
						<FormGroup>
							<Label>Guardian Name</Label>
							<Input
								type="text"
								name="guardianName"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("address") && (
						<FormGroup>
							<Label>Address</Label>
							<Input
								type="text"
								name="address"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("education") && (
						<FormGroup>
							<Label>Education</Label>
							<Input
								type="text"
								name="education"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("preferredLanguages") && (
						<FormGroup>
							<Label>Preferred Languages (comma-separated)</Label>
							<Input
								type="text"
								name="preferredLanguages"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("wannaBeInterest") && (
						<FormGroup>
							<Label>Wanna Be Interest</Label>
							<Input
								type="text"
								name="wannaBeInterest"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("experience") && (
						<FormGroup>
							<Label>Experience (comma-separated)</Label>
							<Input
								type="text"
								name="experience"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("expertise") && (
						<FormGroup>
							<Label>Expertise</Label>
							<Input
								type="text"
								name="expertise"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("bio") || isFieldVisible("about") ? (
						<FormGroup>
							<Label>About/Bio</Label>
							<Input
								type="textarea"
								name="about"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					) : null}

					{isFieldVisible("workingMode") && (
						<FormGroup>
							<Label>Working Mode</Label>
							<Input
								type="text"
								name="workingMode"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("type") && (
						<FormGroup>
							<Label>Employer Type</Label>
							<Input
								type="text"
								name="type"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("industry") && (
						<FormGroup>
							<Label>Industry</Label>
							<Input
								type="text"
								name="industry"
								onChange={handleChange}
								required
							/>
						</FormGroup>
					)}

					{isFieldVisible("companySize") && (
						<FormGroup>
							<Label>Company Size</Label>
							<Input
								type="text"
								name="companySize"
								onChange={handleChange}
							/>
						</FormGroup>
					)}

					<FormGroup>
						<Label>Upload Photo</Label>
						<Input
							type="file"
							accept="image/*"
							onChange={handlePhotoChange}
						/>
					</FormGroup>

					<div className="text-end mt-3">
						<Button
							type="submit"
							color="primary"
							block
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
