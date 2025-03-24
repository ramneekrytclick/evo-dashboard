"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import { toast } from "react-toastify";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";

const UserRegisterForm = () => {
	const [role, setRole] = useState("Admin");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [expertise, setExpertise] = useState("");
	const [wannaBe, setWannaBe] = useState("");
	const { register } = useAuth();
	const router = useRouter();

	const isPasswordMatch = password === confirmPassword;

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await register(
				email,
				password,
				role,
				name,
				expertise,
				wannaBe
			);
			toast.success("Registration successful!");
			router.push("/auth/login");
		} catch (error: any) {
			const errorMsg =
				error?.response?.data?.message ||
				error?.message ||
				"Something went wrong during registration.";
			toast.error(errorMsg);
		}
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
					onSubmit={handleRegister}>
					<h4>Create a New Account</h4>
					<p>Fill in your details to register</p>

					<FormGroup>
						<Label className="col-form-label">Select Role</Label>
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

					<FormGroup>
						<Label className="col-form-label">Name</Label>
						<Input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter your name"
							required
						/>
					</FormGroup>

					<FormGroup>
						<Label className="col-form-label">Email Address</Label>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							required
						/>
					</FormGroup>

					<FormGroup>
						<Label className="col-form-label">Password</Label>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							required
						/>
					</FormGroup>

					<FormGroup>
						<Label className="col-form-label">Confirm Password</Label>
						<Input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm your password"
							required
						/>
					</FormGroup>

					{role === "mentors" && (
						<FormGroup>
							<Label className="col-form-label">Expertise</Label>
							<Input
								type="text"
								value={expertise}
								onChange={(e) => setExpertise(e.target.value)}
								placeholder="E.g. React, Python"
								required
							/>
						</FormGroup>
					)}
					{role === "students" && (
						<FormGroup>
							<Label className="col-form-label">WannaBe Interests</Label>
							<Input
								type="text"
								value={wannaBe}
								onChange={(e) => setWannaBe(e.target.value)}
								placeholder="E.g. React, Python"
								required
							/>
						</FormGroup>
					)}
					<div className="form-group mb-0">
						<div className="checkbox p-0">
							<Input
								id="checkbox1"
								type="checkbox"
							/>
							<Label
								className="text-muted"
								htmlFor="checkbox1">
								Remember me
							</Label>
						</div>
						<Link
							className="link form-group"
							href="/auth/login">
							Login
						</Link>
						<div className="text-end mt-3">
							<Button
								type="submit"
								color="primary"
								block
								disabled={!isPasswordMatch}>
								Register
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default UserRegisterForm;
