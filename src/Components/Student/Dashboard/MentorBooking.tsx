"use client";

import { useEffect, useRef, useState } from "react";
import { getMyMentorBookings, getMyMentors } from "@/app/api/student";
import { toast } from "react-toastify";
import { Badge, Button, Card, CardBody, CardTitle, Spinner } from "reactstrap";
import Link from "next/link";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import NewMentorBooking from "./NewMentorBooking";
import Image from "next/image";
import SessionBookingCard from "./SessionBookingCard";

const YourMentorBookings = ({
	loading,
	setLoading,
}: {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [mentorBookings, setMentorBookings] = useState<any[]>([]);
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	const fetchMentorBookings = async () => {
		try {
			const response = await getMyMentorBookings();
			setMentorBookings(response.bookings);
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to load bookings");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMentorBookings();
	}, []);

	return (
		<div
			className='position-relative card shadow-sm border-0 bg-light-subtle rounded-4 p-4'
			style={{ minHeight: "350px" }}>
			{loading ? (
				<div
					className='d-flex justify-content-center align-items-center'
					style={{ height: "150px" }}>
					<Spinner color='primary' />
				</div>
			) : mentorBookings.length === 0 ? (
				<div className='text-center py-4'>
					<h5 className='fw-semibold mb-2'>No Mentor Bookings Yet</h5>
					<p className='text-muted fs-6'>
						You haven’t booked any mentor sessions yet. Go to your{" "}
						<Link href={`/student/batches`}>batches</Link> to book a 1:1 mentor
						session.
					</p>
					<NewMentorBooking />
				</div>
			) : (
				<>
					<div className='d-flex justify-content-between align-items-center mb-3'>
						<h4 className='fw-bold mb-0 text-muted'>Your Mentor Bookings</h4>
						<NewMentorBooking />
					</div>

					{/* Scroll Arrows */}
					{mentorBookings.length > 2 && (
						<>
							<button
								className='btn btn-outline-primary position-absolute top-50 mt-4 mx-1 start-0 translate-middle-y z-2'
								onClick={() => scroll("left")}
								style={{
									borderRadius: "100%",
									padding: "0",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "rgb(13, 110, 253, 0.13)",
								}}>
								<ArrowLeftCircle size={24} />
							</button>
							<button
								className='btn btn-outline-primary position-absolute top-50 mt-4 mx-1 end-0 translate-middle-y z-2 
								'
								onClick={() => scroll("right")}
								style={{
									borderRadius: "100%",
									padding: "0",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "rgb(13, 110, 253, 0.13)",
								}}>
								<ArrowRightCircle size={24} />
							</button>
						</>
					)}

					{/* Booking Cards */}
					<div
						ref={scrollRef}
						className='d-flex gap-3 overflow-auto px-1'
						style={{
							scrollSnapType: "x mandatory",
							scrollBehavior: "smooth",
						}}>
						{mentorBookings.map((booking) => (
							<SessionBookingCard
								key={booking._id}
								booking={booking}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default YourMentorBookings;
