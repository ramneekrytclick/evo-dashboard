"use client";
import { useAuth } from "@/app/AuthProvider";
import { Href, ImagePath } from "@/Constant";
import { userProfileData } from "@/Data/Layout/Header";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, User } from "react-feather";
import { Badge, Button } from "reactstrap";

const UserProfile = () => {
	const { logout } = useAuth();
	const router = useRouter();
	const handleLogout = () => {
		logout();
	};
	const handleClick = (role: string) => {
		console.log(role);
		router.push(`/${role}/dashboard`);
	};
	return (
		<li className="profile-nav onhover-dropdown p-0">
			<div className="d-flex align-items-center profile-media gap-1">
				{/* <Image className='b-r-10 img-40 img-fluid' width={40} height={40} src={session?.user?.image || `${ImagePath}/dashboard/profile.png`} alt='' /> */}
				{/* <div className='flex-grow-1'>
          <span><User/></span>
        </div> */}
				<li onClick={() => handleClick("admin")}>
					<Button
						color={"success"}
						className="d-flex align-items-center">
						Admin
					</Button>
				</li>
				<li onClick={() => handleClick("mentor")}>
					<Button
						color={"success"}
						className="d-flex align-items-center">
						Mentor
					</Button>
				</li>
				<li onClick={() => handleClick("employer")}>
					<Button
						color={"success"}
						className="d-flex align-items-center">
						Employer
					</Button>
				</li>
				<li onClick={() => handleClick("creator")}>
					<Button
						color={"success"}
						className="d-flex align-items-center">
						Creator
					</Button>
				</li>
				<li onClick={() => handleClick("student")}>
					<Button
						color={"success"}
						className="d-flex align-items-center">
						Student
					</Button>
				</li>
				<li onClick={handleLogout}>
					<Button
						color={"primary"}
						className="d-flex align-items-center">
						Logout
						{/* <LogOut /> */}
						{/* <Badge
						className={`badge-light rounded-circle btn-p-space text-dark ms-2`}
						color="">
					</Badge> */}
					</Button>
				</li>
			</div>
		</li>
	);
};
export default UserProfile;
