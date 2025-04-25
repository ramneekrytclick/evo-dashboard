"use client";

import { useAuth } from "@/app/AuthProvider";
import Link from "next/link";
import { User, ChevronDown } from "react-feather";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
import { FaEnvelope } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx"; // Optional: classnames utility (you can remove if not using it)

const UserProfile = () => {
	const { user, logout } = useAuth();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement>(null);

	const toggleDropdown = () => setDropdownOpen((prev) => !prev);

	// Click outside to close
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	if (!user) return null;

	return (
		<li
			ref={dropdownRef}
			className='position-relative text-dark rounded'
			style={{ cursor: "pointer" }}>
			{/* Profile toggle */}
			<div
				className='notification-box d-flex align-items-center gap-2'
				onClick={toggleDropdown}>
				<Image
					src={getImageURL(user.photo || "")}
					alt='Profile'
					width={35}
					height={35}
					className='rounded'
				/>
				<div className='ms-2 d-flex flex-column'>
					<div className='d-flex align-items-center gap-1'>
						<div
							className='fw-semibold text-primary'
							style={{ fontSize: "1.3rem" }}>
							{user.name?.split(" ")[0] || "User"}
						</div>
						<ChevronDown
							size={16}
							className={clsx("transition-all", {
								"rotate-180": dropdownOpen,
							})}
							style={{
								transition: "transform 0.3s ease",
								transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
							}}
						/>
					</div>
					<div
						className='fw-light text-muted'
						style={{ fontSize: "0.8rem" }}>
						{user.email}
					</div>
				</div>
			</div>
			<div>
				<div
					className={clsx("dropdown-menu-box", {
						show: dropdownOpen,
					})}
					style={{
						position: "absolute",
						top: "100%",
						right: 0,
						minWidth: "250px",
						zIndex: 9999,
						backgroundColor: "#fff",
						borderRadius: "10px",
						boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
						padding: "1rem",
						transition: "all 0.3s ease",
						transform: dropdownOpen ? "translateY(10px)" : "translateY(0px)",
						opacity: dropdownOpen ? 1 : 0,
						pointerEvents: dropdownOpen ? "auto" : "none",
					}}>
					<ul
						className='list-unstyled mb-0'
						style={{
							padding: "1rem 0.5rem",
						}}>
						<li className='d-flex align-items-center justify-content-between pb-4 border-bottom'>
							<div className='d-flex flex-column align-items-start px-3'>
								<span className='fs-5 fw-medium'>{user.name}</span>
								<p className='text-muted mb-0'>{user.email}</p>
							</div>
							<Image
								src={getImageURL(user.photo || "")}
								alt='Profile'
								width={60}
								height={60}
								className='rounded-circle'
							/>
						</li>
						<li className='py-3 border-bottom'>
							<Link
								href={`/${
									user.role === "Course Creator"
										? "course-creator"
										: user.role.toLowerCase()
								}/profile`}
								className='text-decoration-none d-flex align-items-center gap-2 text-dark'>
								<User size={16} />
								<span>View Profile</span>
							</Link>
						</li>
						<li className='py-3 border-bottom'>
							<Link
								href={`/${user.role.toLowerCase()}/support/tickets`}
								className='text-decoration-none d-flex align-items-center gap-2 text-dark'>
								<FaEnvelope size={16} />
								<span>Support</span>
							</Link>
						</li>
						<li
							onClick={() => logout()}
							style={{ cursor: "pointer" }}>
							<div className='d-flex justify-content-center align-items-center gap-2 btn btn-danger w-100 mt-2'>
								<span>Logout</span>
								<i
									className='fa fa-sign-out'
									color='white'
								/>
							</div>
						</li>
					</ul>
				</div>
			</div>
			{/* Dropdown Menu */}
		</li>
	);
};

export default UserProfile;
