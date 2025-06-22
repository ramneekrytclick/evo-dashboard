"use client";
import { useAuth } from "@/app/AuthProvider";
import { Error3 } from "@/Data/Pages/PagesSvgIcons";
import { useRouter } from "next/navigation";
import { Button, Col, Container } from "reactstrap";

const Error403Container = () => {
	const BackToHomePage: string = "BACK TO HOME PAGE";
	const router = useRouter();
	const { user } = useAuth();
	const { role } = user ? user : { role: "" };

	return (
		<div
			className='page-wrapper compact-wrapper'
			id='pageWrapper'>
			<div className='error-wrapper'>
				<Container>
					<div className='svg-wrraper'>
						<Error3 />
					</div>
					<Col
						md={8}
						className='offset-md-2'>
						<h3>{"Sorry, Something Goes Wrong"}</h3>
						<p className='sub-content'>
							{
								"The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."
							}
						</p>
						{role === "Course Creator" ? (
							<Button
								tag='a'
								color='primary'
								onClick={() => router.push(`/course-creator/dashboard`)}>
								{BackToHomePage}
							</Button>
						) : (
							<Button
								tag='a'
								color='primary'
								onClick={() => router.push("/auth/login")}>
								{BackToHomePage}
							</Button>
						)}
					</Col>
				</Container>
			</div>
		</div>
	);
};

export default Error403Container;
