"use client";
import { useAuth } from "@/app/AuthProvider";
import { Href, ImagePath } from "@/Constant";
import { userProfileData } from "@/Data/Layout/Header";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { LogOut, User } from "react-feather";
import { Badge, Button } from "reactstrap";

const UserProfile = () => {
	const { logout } = useAuth();
	const handleLogout = () => {
		logout();
	};
	return (
		<li className="profile-nav onhover-dropdown p-0">
			<div className="d-flex align-items-center profile-media">
				{/* <Image className='b-r-10 img-40 img-fluid' width={40} height={40} src={session?.user?.image || `${ImagePath}/dashboard/profile.png`} alt='' /> */}
				{/* <div className='flex-grow-1'>
          <span><User/></span>
        </div> */}
			</div>
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
		</li>
	);
};
export default UserProfile;
