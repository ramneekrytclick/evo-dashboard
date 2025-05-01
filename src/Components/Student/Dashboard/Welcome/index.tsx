"use client";
import { ImagePath } from "@/Constant";
import Link from "next/link";
import { Card, CardBody, Col } from "reactstrap";
import ClockBox from "./ClockBox";
import Image from "next/image";
import { useAuth } from "@/app/AuthProvider";

const WelcomeCard = ({
	content,
	title,
}: {
	content?: string;
	title?: string;
}) => {
	const { user } = useAuth();
	return (
		<Col>
			<Card className='welcome-card text-dark'>
				<CardBody>
					<div className='d-flex'>
						<div className='flex-grow-1 text-danger'>
							<h1>
								Hello, {user?.name}. {title}
							</h1>
							<p>{content}</p>
							<Link
								className='btn btn-success'
								href={`/student/courses`}>
								{"Explore Courses"}
							</Link>
						</div>
						<div className='flex-shrink-0'>
							<Image
								src={`${ImagePath}/dashboard/welcome.png`}
								alt='welcomeCard'
								width={341}
								height={290}
							/>
						</div>
						<ClockBox />
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};
export default WelcomeCard;
