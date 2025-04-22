"use client";

import { useEffect, useRef, useState } from "react";
import { getMyMentorBookings } from "@/app/api/student";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardTitle, Spinner } from "reactstrap";
import Link from "next/link";

const YourMentorBookings = ({
	loading,
	setLoading,
}: {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [mentorBookings, setMentorBookings] = useState<any[]>([]);
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = (
		ref: React.RefObject<HTMLDivElement>,
		direction: "left" | "right"
	) => {
		if (ref.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
			className='position-relative card p-4 shadow-sm border-0 bg-white rounded-4'
			style={{ height: "350px" }}>
			{loading ? (
				<div
					className='d-flex justify-content-center align-items-center'
					style={{ height: "150px" }}>
					<Spinner color='primary' />
				</div>
			) : mentorBookings.length === 0 ? (
				<div className='text-center py-4'>
					<h5 className='mb-2 fw-semibold'>No Mentor Bookings Yet</h5>
					<p className='text-muted'>
						You haven’t booked any mentor sessions yet.
					</p>
					<Link
						href='/student/batches'
						className='btn btn-primary mt-2'>
						View Batches
					</Link>
				</div>
			) : (
				<>
					<h4 className='fw-bold mb-4 d-flex align-items-center gap-2'>
						Your Mentor Bookings
					</h4>

					{mentorBookings.length > 4 && (
						<>
							<button
								className='btn btn-outline-primary position-absolute top-50 start-0 translate-middle-y z-2'
								onClick={() => scroll(scrollRef, "left")}
								style={{ borderRadius: "50%" }}>
								←
							</button>
							<button
								className='btn btn-outline-primary position-absolute top-50 end-0 translate-middle-y z-2'
								onClick={() => scroll(scrollRef, "right")}
								style={{ borderRadius: "50%" }}>
								→
							</button>
						</>
					)}

					<div
						ref={scrollRef}
						className='d-flex overflow-auto gap-3 pb-2'
						style={{
							height: "350px",
							width: "100%",
							overflow: "scroll",
							scrollSnapType: "x mandatory",
						}}>
						{mentorBookings.map((booking, i) => (
							<Card
								key={booking._id}
								className='bg-light text-dark text-center'
								style={{
									height: "250px",
								}}>
								<CardBody className='d-flex flex-column justify-content-between align-items-center text-center'>
									<CardTitle tag='h6'>
										Mentor: {booking.mentor?.name || "Unnamed Mentor"}
									</CardTitle>
									<p className='text-dark fw-bold fs-6 mb-0'>
										Topic:{" "}
										<span className='text-muted '>
											{booking.message || "—"}
										</span>
									</p>
									<div className='text-dark'>
										<p className='mb-1'>
											<strong>Date:</strong>{" "}
											{new Date(booking.date).toLocaleDateString("en-IN")}
										</p>
										<p className='mb-1'>
											<strong>Time:</strong>{" "}
											{booking.timeSlot || "Not specified"}
										</p>
										<p className='mb-1'>
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

										<p className='text-dark fw-bold mb-0'>
											Mentor Reply:{" "}
											<span className='text-muted fw-light'>
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
