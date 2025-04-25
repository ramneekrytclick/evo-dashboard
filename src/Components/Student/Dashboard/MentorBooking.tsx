"use client";

import { useEffect, useRef, useState } from "react";
import { getMyMentorBookings, getMyMentors } from "@/app/api/student";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardTitle, Spinner } from "reactstrap";
import Link from "next/link";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";

const YourMentorBookings = ({
	loading,
	setLoading,
}: {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [mentorBookings, setMentorBookings] = useState<any[]>([]);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [myMentors, setMyMentors] = useState<any[]>([]);

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
	const fetchMyMentors = async () => {
		try {
			const response = await getMyMentors();
			setMyMentors(response);
			console.log("Mentorss:", response);
		} catch (error: any) {
			console.log(error);
			toast.error(error.response?.data?.message || "Failed to load mentors");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMentorBookings();
		fetchMyMentors();
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
					<Link
						href='/student/batches'
						className='btn btn-primary mt-2'>
						Book Now
					</Link>
				</div>
			) : (
				<>
					<div className='d-flex justify-content-between align-items-center mb-3'>
						<h4 className='fw-bold mb-0 text-muted'>Your Mentor Bookings</h4>
						<Link
							href='/student/batches'
							className='btn btn-primary'>
							Schedule 1:1 Mentor Session
						</Link>
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
							<Card
								key={booking._id}
								className='flex-shrink-0 p-3 border shadow-sm rounded-4 bg-white text-dark'
								style={{ width: "280px", scrollSnapAlign: "start" }}>
								<CardBody className='p-0 d-flex flex-column h-100 justify-content-between'>
									<div>
										<CardTitle
											tag='h6'
											className='text-primary fw-semibold mb-2'>
											<span className='text-dark'>
												Session: {booking.mentor?.name || "Unnamed Mentor"}
											</span>
										</CardTitle>
										<p className='fw-normal fs-6 mb-1 text-dark'>
											{booking.message || "—"}
										</p>
									</div>
									<div className='mt-3 fs-6'>
										<p className='mb-1 small'>
											<strong>Date:</strong>{" "}
											{new Date(booking.date).toLocaleDateString("en-IN")}
										</p>
										<p className='mb-1 small'>
											<strong>Time:</strong> {booking.timeSlot || "—"}
										</p>
										<p className='mb-1 small'>
											<strong>Status:</strong>{" "}
											<span
												className={`badge bg-${
													booking.status === "Confirmed"
														? "success"
														: booking.status === "Rejected"
														? "danger"
														: "warning"
												}`}>
												{booking.status}
											</span>
										</p>
										<p className='mb-0 small text-dark'>
											<strong>Mentor Reply:</strong>{" "}
											<span className='text-muted'>
												{booking.replyFromMentor || "No reply yet"}
											</span>
										</p>
									</div>
								</CardBody>
							</Card>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default YourMentorBookings;
