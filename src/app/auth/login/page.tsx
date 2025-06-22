"use client";
import UserForm from "@/Components/Auth/UserForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

const UserLogin = ({ params }: { params: { userRole: string } }) => {
	const [role, setRole] = useState("admin");
	const validRoles = [
		"admin",
		"mentor",
		"publisher",
		"cc",
		"manager",
		"student",
		"employer",
	];
	const router = useRouter();
	useEffect(() => {
		switch (params.userRole) {
			case "admin":
				setRole("admin");
				break;
			case "mentor":
				setRole("mentors");
				break;
			case "publisher":
				setRole("publishers/auth");
				break;
			case "cc":
				setRole("course-creators/auth");
				break;
			case "manager":
				setRole("managers/auth");
				break;
			case "student":
				setRole("students");
				break;
			case "employer":
				setRole("jobs");
				break;
			default:
				setRole("students");
				break;
		}
		if (!validRoles.includes(params.userRole)) {
			router.push("/404");
		}
	}, [params.userRole]);
	return (
		<Container
			fluid
			className='p-0'>
			<Row className='m-0'>
				<Col
					xs={12}
					className='p-0'>
					<div className='login-card login-dark'>
						<UserForm
							role={role}
							route={params.userRole}
						/>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default UserLogin;
