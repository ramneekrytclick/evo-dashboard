"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import { useAuth } from "@/app/AuthProvider";

const UserForm = () => {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("admin@evo.com");
	const [password, setPassword] = useState("1234");
	const [loading, setLoading] = useState(false);
	const [role, setRole] = useState("admin");
	const { login } = useAuth();
	const router = useRouter();

	const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoading(true);
		try {
			const response = await login(email, password, role);
			if (response?.status === 200) {
				switch (role) {
					case "admin":
						router.push(`/admin/dashboard`); // or route based on role
						break;
					case "students":
						router.push(`/student/dashboard`); // or route based on role
						break;
					case "mentors":
						router.push(`/mentor/dashboard`); // or route based on role
						break;

					default:
						router.push(`/${role}/dashboard`); // or route based on role
						break;
				}
			}
		} catch (error: any) {
			const errorMsg =
				error?.response?.data?.message ||
				error?.message ||
				"Something went wrong during login.";
			toast.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div>
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

			<div className="login-main">
				<Form
					className="theme-form"
					onSubmit={formSubmitHandle}>
					<h4>Sign In to Your Account</h4>
					<p>Enter your email & password to login</p>

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
						<div className="form-input position-relative">
							<Input
								type={show ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								required
							/>
							<div
								className="show-hide"
								onClick={() => setShow(!show)}>
								<span className="show" />
							</div>
						</div>
					</FormGroup>

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
							className="link"
							href="/auth/register">
							Register User
						</Link>

						<div className="text-end mt-3">
							<Button
								type="submit"
								color="primary"
								disabled={loading}
								block>
								Sign In
								{loading && (
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"
									/>
								)}
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default UserForm;
