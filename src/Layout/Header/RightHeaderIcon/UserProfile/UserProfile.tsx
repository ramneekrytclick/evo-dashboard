"use client";

import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, Settings } from "react-feather";
import Image from "next/image";
import { Badge } from "reactstrap";
import { getMyProfile } from "@/app/api";
import { useEffect } from "react";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL;

const UserProfile = () => {
	const { user, logout } = useAuth();
	const router = useRouter();
	const role = user?.role || "Student";
	const fetchProfile = async () => {
		try {
			const response = await getMyProfile(role);
			console.log(response);
		} catch (error) {}
	};
	useEffect(() => {
		fetchProfile();
	}, []);
	if (!user) return null;
	return (
		<li className='onhover-dropdown text-dark position-relative border rounded border-primary btn btn-success'>
			<div className='notification-box d-flex align-items-center gap-2'>
				<User size={20} />
				<span className='fw-semibold'>
					{user.name?.split(" ")[0] || "User"}
				</span>
			</div>

			<div className='onhover-show-div shadow-lg'>
				<ul className='list-unstyled mb-0'>
					<li className='d-flex flex-column align-items-center justify-content-between'>
						<Image
							src={`/assets/images/user}`}
							alt='Profile'
							width={40}
							height={40}
						/>
						{user.name}
						<p className='text-muted link-underline-primary'>({user.email})</p>
					</li>
					<li className=''>
						<Link
							href={`/${user.role.toLowerCase()}/profile`}
							className='text-decoration-none d-flex align-items-center gap-2 text-dark'>
							<User size={16} />
							<span>View Profile</span>
						</Link>
					</li>
					<li>
						<Link
							href={`/${user.role.toLowerCase()}/support/tickets`}
							className='text-decoration-none d-flex align-items-center gap-2 text-dark'>
							<Settings size={16} />
							<span>Support</span>
						</Link>
					</li>
					<li
						onClick={() => logout()}
						style={{ cursor: "pointer" }}>
						<div className='d-flex justify-content-center align-items-center gap-2 btn btn-danger'>
							<span>Logout</span>
							<i
								className='fa fa-sign-out'
								color='white'
							/>
						</div>
					</li>
				</ul>
			</div>
		</li>
	);
};

export default UserProfile;
