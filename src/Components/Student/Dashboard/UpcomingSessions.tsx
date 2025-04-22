"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardTitle, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { getMyUpcomingSessions } from "@/app/api/student";
import Link from "next/link";

const UpcomingSessions = ({
	loading,
	setLoading,
}: {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [sessions, setSessions] = useState<any[]>([]);

	const scroll = (
		ref: React.RefObject<HTMLDivElement>,
		direction: "left" | "right"
	) => {
		if (ref.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	const fetchSessions = async () => {
		setLoading(true);
		try {
			const res = await getMyUpcomingSessions();
			console.log(res.upcomingSessions);
			setSessions(res.upcomingSessions || []);
		} catch (error) {
			toast.error("Error fetching upcoming sessions.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSessions();
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
			) : sessions.length === 0 ? (
				<div className='text-center py-4'>
					<h5 className='mb-2 fw-semibold'>No Upcoming Sessions</h5>
					<p className='text-muted'>
						You don’t have any mentor sessions scheduled yet.
					</p>
				</div>
			) : (
				<>
					<h4 className='fw-bold mb-4 d-flex align-items-center gap-2'>
						Upcoming Batch Classes
					</h4>

					{sessions.length > 4 && (
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
							width: "100%",
							overflow: "scroll",
							scrollSnapType: "x mandatory",
						}}>
						{sessions.map((session, i) => (
							<>
								<Card
									className='bg-light text-dark text-center'
									style={{
										height: "240px",
									}}>
									<CardBody>
										<Link href={`/student/batches/${session.batchId}`}>
											<CardTitle tag='h6'>{session.batchName}</CardTitle>
										</Link>
										<div className='text-dark fs-4'>
											<p className='mb-1 text-dark'>
												<strong>Topic:</strong>{" "}
												{session.topic || "Not specified"}
											</p>
											<p className='mb-1'>
												<strong>Time:</strong> {session.time || "Not specified"}
											</p>
											<p className='mb-1'>
												<strong>Date:</strong>{" "}
												{new Date(session.date).toDateString() ||
													"Not specified"}
											</p>
											<Button
												color='info'
												className='my-1'
												onClick={() => window.open(session.link, "_blank")}>
												Join
											</Button>
											<p className='text-dark fw-bold'>
												Note from Mentor:{" "}
												<span className='text-muted fw-light'>
													{session.comment}
												</span>
											</p>
										</div>
									</CardBody>
								</Card>
							</>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default UpcomingSessions;
