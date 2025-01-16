"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import axios from "axios";
import { DecodedTokenProps } from "@/Types/Auth.type";
import { useAuth } from "@/app/AuthProvider";

const UserForm = () => {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("rittik@ample.com");
	const [password, setPassword] = useState("12345678");
	const {login} = useAuth()
	const router = useRouter();
	const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await login(email,password);
		if (response==200) {
			toast.success("Login Successful!")
		}
		else {
			toast.error("Invalid Credentials!")
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
						width={100}
						height={34}
						className="img-fluid for-light"
						src={imageOne}
						alt="login page"
					/>
					<Image
						priority
						width={100}
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
							onChange={(event) => setEmail(event.target.value)}
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
								onChange={(event) => setPassword(event.target.value)}
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
							href="/forgot-password">
							Forgot Password?
						</Link>
						<div className="text-end mt-3">
							<Button
								type="submit"
								color="primary"
								block>
								Sign In
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default UserForm;
