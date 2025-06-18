"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../public/assets/images/logo/logo.png";
import { useAuth } from "@/app/AuthProvider";

const UserForm = ({
	role,
	route = "student",
}: {
	role: string;
	route: string;
}) => {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const router = useRouter();

	const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoading(true);
		try {
			const response = await login(email, password, role);
			if (response) {
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
					case "jobs":
						router.push(`/employer/dashboard`); // or route based on role
						break;
					case "publishers/auth":
						router.push(`/publisher/dashboard`); // or route based on role
						break;
					case "course-creators/auth":
						router.push(`/course-creator/dashboard`); // or route based on role
						break;
					case "managers/auth":
						router.push(`/manager/dashboard`); // or route based on role
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
	//TO BE REMOVED
	// useEffect(() => {
	// 	switch (role) {
	// 		case "admin":
	// 			setEmail("admin@evo.com");
	// 			break;
	// 		case "students":
	// 			setEmail("singhrrammy@gmail.com");
	// 			break;
	// 		case "mentors":
	// 			setEmail("mentor@evo.com");
	// 			setPassword("123");
	// 			break;
	// 		case "jobs":
	// 			setEmail("emp2@evo.com");
	// 			break;
	// 		case "publishers/auth":
	// 			setEmail("publisher@evo.com");
	// 			break;
	// 		case "course-creators/auth":
	// 			setEmail("cc@evo.com");
	// 			break;
	// 		case "managers/auth":
	// 			setEmail("manager@evo.com");
	// 			break;
	// 		default:
	// 			setEmail("admin@evo.com");
	// 			break;
	// 	}
	// }, [role]);

	return (
		<div>
			<div>
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

			<Row className='login-main p-0 overflow-hidden'>
				<Col className='p-4 col-md-6'>
					<Form
						className='theme-form'
						onSubmit={formSubmitHandle}>
						<h4>Sign In to Your Account</h4>
						<p>Enter your email & password to login</p>

						<FormGroup>
							<Label className='col-form-label fs-6'>Email Address</Label>
							<Input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Enter your email'
								required
							/>
						</FormGroup>

						<FormGroup>
							<Label className='col-form-label fs-6'>Password</Label>
							<div className='form-input position-relative'>
								<Input
									type={show ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder='Enter your password'
									required
								/>
								<div
									className='show-hide'
									onClick={() => setShow(!show)}>
									<span className='show' />
								</div>
							</div>
						</FormGroup>

						<div className='mt-4 text-center'>
							<Button
								type='submit'
								color='primary'
								disabled={loading}
								block>
								Sign In
								{loading && (
									<span
										className='spinner-border spinner-border-sm me-2'
										role='status'
										aria-hidden='true'
									/>
								)}
							</Button>
							<p className='mt-2 mb-0'>
								Don't have an account?{" "}
								<Link href={`/auth/register/${route}`}>Register</Link>
							</p>
						</div>
					</Form>
				</Col>
				<Col className='p-0 d-none d-md-flex col-md-6 login-img justify-content-end align-items-center'>
					<Image
						priority
						width={500}
						height={500}
						className='img-fluid p-0'
						src='/assets/images/login/login.png'
						alt='login image'
					/>
				</Col>
			</Row>
		</div>
	);
};

export default UserForm;
