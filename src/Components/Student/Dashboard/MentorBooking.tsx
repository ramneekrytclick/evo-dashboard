"use client";

import { useEffect, useRef, useState } from "react";
import { getMyMentorBookings } from "@/app/api/student";
import { toast } from "react-toastify";
import Link from "next/link";

const YourMentorBookings = () => {
	const [mentorBookings, setMentorBookings] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
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
		<div className='col-lg-9 mb-4 position-relative'>
			<div className='card shadow-sm h-100'>
				<div className='card-body'>
					<h5 className='fw-bold mb-3'>Your Mentor Bookings</h5>

					{loading ? (
						<p>Loading bookings...</p>
					) : mentorBookings.length === 0 ? (
						<p className='text-muted'>
							No bookings yet. <Link href='/student/batches'>View Batches</Link>{" "}
							to book a session.
						</p>
					) : (
						<>
							<div className='position-absolute top-0 end-0'>
								<button
									className='btn btn-sm btn-outline-primary me-2'
									onClick={() => scroll("left")}
									disabled={mentorBookings.length <= 2}>
									←
								</button>
								<button
									className='btn btn-sm btn-outline-primary'
									onClick={() => scroll("right")}
									disabled={mentorBookings.length <= 2}>
									→
								</button>
							</div>

							<div
								ref={scrollRef}
								className='d-flex overflow-auto gap-3 pb-1'>
								{mentorBookings.map((booking) => (
									<div
										key={booking._id}
										className='card bg-light  shadow-sm rounded-3 text-dark d-flex flex-column justify-content-between'
										style={{
											minWidth: "280px",
											minHeight: "230px",
											scrollSnapAlign: "start",
											border: "1px solid #eee",
										}}>
										<div className='card-body d-flex flex-column'>
											<h6 className='fw-bold text-primary mb-2 text-truncate'>
												Mentor: {booking.mentor.name}
											</h6>

											<p className='text-muted small mb-1'>
												<b>Date:</b>{" "}
												{new Date(booking.date).toLocaleDateString("en-IN")}
												<br />
												<b>Time:</b> {booking.timeSlot}
											</p>

											<p className='small mb-1'>
												<b>Status:</b>{" "}
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

											<p className='text-muted small mb-2'>
												<b>Your Message:</b> {booking.message || "—"}
											</p>

											<div className='text-primary p-2 mb-0 mt-auto small'>
												<b>Mentor Reply:</b>{" "}
												{booking.replyFromMentor || (
													<span className='text-muted'>No reply yet.</span>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default YourMentorBookings;
