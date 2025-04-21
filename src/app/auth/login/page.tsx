"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Container } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/logo-1.png";
import imageTwo from "../../../../public/assets/images/logo/logo.png";
export default function Home() {
	const router = useRouter();

	const handleRedirect = (role: string) => {
		router.push(`/auth/login/${role}`);
	};

	return (
		<Container className='d-flex flex-column align-items-center justify-content-center text-center vh-100'>
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
			<div className='login-main bg-light text-dark p-2 card'>
				<div className='d-flex flex-wrap gap-3 justify-content-center'>
					<Button
						color='success'
						onClick={() => handleRedirect("student")}>
						Student
					</Button>
					<Button
						color='success'
						onClick={() => handleRedirect("mentor")}>
						Mentor
					</Button>
					<Button
						color='success'
						onClick={() => handleRedirect("admin")}>
						Admin
					</Button>
					<Button
						color='success'
						onClick={() => handleRedirect("manager")}>
						Manager
					</Button>
					<Button
						color='success'
						onClick={() => handleRedirect("publisher")}>
						Publisher
					</Button>
					<Button
						color='success'
						onClick={() => handleRedirect("cc")}>
						Course Creator
					</Button>
					<Button
						color='success'
						onClick={() => handleRedirect("employer")}>
						Employer
					</Button>
				</div>
			</div>
		</Container>
	);
}
