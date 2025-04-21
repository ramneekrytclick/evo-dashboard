"use client";

import { useAuth } from "@/app/AuthProvider";
import Link from "next/link";
import { User, Settings } from "react-feather";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
const UserProfile = () => {
	const { user, logout } = useAuth();
	if (!user) return null;
	return (
		<li className='onhover-dropdown text-dark position-relative border rounded border-dark hover-shadow-sm'>
			<div className='notification-box d-flex align-items-center gap-2'>
				<span className='fw-semibold text-primary'>
					{user.name?.split(" ")[0] || "User"}
				</span>
				<Image
					src={getImageURL(user.photo || "")}
					alt='Profile'
					width={25}
					height={25}
					className='rounded'
				/>
			</div>

			<div className='onhover-show-div shadow-lg'>
				<ul className='list-unstyled mb-0'>
					<li className='d-flex align-items-center justify-content-between'>
						<div className='d-flex flex-column align-items-start'>
							<span className='fs-5 fw-medium'>{user.name}</span>
							<p className='text-muted link-underline-primary'>
								({user.email})
							</p>
						</div>
						<Image
							src={getImageURL(user.photo || "")}
							alt='Profile'
							width={60}
							height={60}
							className='rounded-circle'
						/>
					</li>
					<li className=''>
						{user.role === "Course Creator" ? (
							<>
								<Link
									href={`/course-creator/profile`}
									className='text-decoration-none d-flex align-items-center gap-2 text-dark'>
									<User size={16} />
									<span>View Profile</span>
								</Link>
							</>
						) : (
							<Link
								href={`/${user.role.toLowerCase()}/profile`}
								className='text-decoration-none d-flex align-items-center gap-2 text-dark'>
								<User size={16} />
								<span>View Profile</span>
							</Link>
						)}
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
