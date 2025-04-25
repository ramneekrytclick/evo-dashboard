"use client";
import { getMyAnnouncements } from "@/app/api";
import { useAuth } from "@/app/AuthProvider";
import { IAnnouncement } from "@/Types/Announcement.type";
import { useEffect, useState } from "react";
import { Badge } from "reactstrap";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "react-feather";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
const Notifications = () => {
	const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
	const { user } = useAuth();

	const fetchAnnouncements = async (role: string) => {
		try {
			const response = await getMyAnnouncements(role);
			setAnnouncements(response);
		} catch (error) {
			console.error("Failed to fetch announcements", error);
		}
	};

	useEffect(() => {
		if (user?.role) {
			fetchAnnouncements(user.role);
		}
	}, [user]);

	if (user?.role === "Admin") {
		return null;
	}

	return (
		<li className='onhover-dropdown position-relative'>
			<div className='notification-box d-flex align-items-center gap-2'>
				<Bell size={140} />
				{announcements.length > 0 && (
					<Badge
						pill
						color='primary'>
						{announcements.length}
					</Badge>
				)}
			</div>
			<div className='onhover-show-div notification-dropdown px-1'>
				<h6 className=' mb-2 dropdown-title'>Announcements</h6>
				{announcements.length === 0 ? (
					<p className='text-muted'>No announcements yet.</p>
				) : (
					<div className='d-flex flex-column gap-3'>
						{announcements.map((item, index) => (
							<div
								key={index}
								className='border-bottom pb-2'>
								<Link
									href={item.link || "#"}
									className='d-block text-dark text-decoration-none'>
									<span className='mb-1 fw-semibold'>{item.title}</span>
									<p className='text-muted'>{item.description}</p>
									{item.image && (
										<Image
											src={getImageURL(item.image)}
											width={50}
											height={50}
											style={{
												borderRadius: "90%",
												objectFit: "cover",
											}}
											alt='announcement'
										/>
									)}
								</Link>
								<small className='text-muted d-block mt-1'>
									{formatDistanceToNow(new Date(item.createdAt), {
										addSuffix: true,
									})}
								</small>
							</div>
						))}
					</div>
				)}
			</div>
		</li>
	);
};

export default Notifications;
