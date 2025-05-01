"use client";

import { getMyAnnouncements } from "@/app/api";
import { useAuth } from "@/app/AuthProvider";
import { IAnnouncement } from "@/Types/Announcement.type";
import { useEffect, useRef, useState } from "react";
import { Badge, Col, Row } from "reactstrap";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bell, ChevronDown } from "react-feather";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
import clsx from "clsx";

const Notifications = () => {
	const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement>(null);
	const { user } = useAuth();

	const toggleDropdown = () => setDropdownOpen((prev) => !prev);

	const fetchAnnouncements = async (role: string) => {
		try {
			const response = await getMyAnnouncements(role);
			setAnnouncements(response.reverse());
		} catch (error) {
			console.error("Failed to fetch announcements", error);
		}
	};

	useEffect(() => {
		if (user?.role) {
			fetchAnnouncements(user.role);
		}
	}, [user]);

	// Close dropdown on outside click
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

	if (user?.role === "Admin") return null;

	return (
		<li
			ref={dropdownRef}
			className='position-relative text-dark rounded-circle'
			style={{ cursor: "pointer" }}>
			<div
				className='notification-box d-flex align-items-center gap-2'
				onClick={toggleDropdown}>
				<Bell size={22} />
				{announcements.length > 0 && (
					<Badge
						pill
						color='primary'>
						{announcements.length}
					</Badge>
				)}
			</div>

			<div
				className={clsx("dropdown-menu-box", { show: dropdownOpen })}
				style={{
					position: "absolute",
					top: "100%",
					right: 0,
					minWidth: "300px",
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
				<h6 className='mb-3 fw-bold border-bottom pb-3'>Announcements</h6>
				{announcements.length === 0 ? (
					<p className='text-muted'>No announcements yet.</p>
				) : (
					<div
						className='d-flex flex-column gap-3 col'
						style={{ maxHeight: "300px", overflow: "auto" }}>
						{announcements.map((item, index) => (
							<Row
								key={index}
								className='border-bottom pb-2 w-100'>
								<Col className='col-8'>
									<Link
										href={item.link || "#"}
										className='d-block text-dark text-decoration-none'>
										<span className='mb-1 fw-semibold'>{item.title}</span>
										<p className='text-muted mb-1'>{item.description}</p>
									</Link>
								</Col>
								<Col className='col-1'>
									{item.image && (
										<Image
											src={getImageURL(item.image)}
											width={50}
											height={50}
											style={{
												borderRadius: "50%",
												objectFit: "cover",
											}}
											alt='announcement'
										/>
									)}
								</Col>
								<small
									className='text-muted d-block mt-1'
									style={{ fontSize: "12px" }}>
									{formatDistanceToNow(new Date(item.createdAt), {
										addSuffix: true,
									})}
								</small>
							</Row>
						))}
					</div>
				)}
			</div>
		</li>
	);
};

export default Notifications;
