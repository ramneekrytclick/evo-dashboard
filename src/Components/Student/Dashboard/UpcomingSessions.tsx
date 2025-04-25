"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardTitle, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { getMyUpcomingSessions } from "@/app/api/student";
import Link from "next/link";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";

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
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const yesterday = new Date(today);
			yesterday.setDate(today.getDate() - 1);

			const filteredSessions = res.upcomingSessions.filter((session: any) => {
				const sessionDate = new Date(session.date);
				sessionDate.setHours(0, 0, 0, 0);
				return sessionDate >= yesterday;
			});

			setSessions(filteredSessions || []);
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
			className='position-relative card p-4 shadow-sm border-0 bg-light-subtle rounded-4'
			style={{ height: "350px" }}>
			<h4 className='fw-bold mb-4 d-flex align-items-center gap-2 text-muted'>
				Upcoming Batch Classes
			</h4>
			{loading ? (
				<div
					className='d-flex justify-content-center align-items-center'
					style={{ height: "150px" }}>
					<Spinner color='primary' />
				</div>
			) : sessions.length === 0 ? (
				<div className='text-center py-5'>
					<h5 className='mb-2 fw-semibold'>No Upcoming Classes</h5>
					<p className='text-muted'>
						You don’t have any batch classes scheduled yet.
					</p>
					<Link
						href={`/student/batches`}
						className='btn btn-primary mt-2'>
						Go to Batches
					</Link>
				</div>
			) : (
				<>
					{sessions.length > 2 && (
						<>
							<button
								className='btn btn-outline-primary position-absolute top-50 mt-4 mx-1 start-0 translate-middle-y z-2 
								'
								onClick={() => scroll(scrollRef, "left")}
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
								onClick={() => scroll(scrollRef, "right")}
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

					<div
						ref={scrollRef}
						className='d-flex gap-3'
						style={{
							height: "240px",
							width: "100%",
							overflow: "scroll",
							scrollSnapType: "x mandatory",
						}}>
						{sessions.map((session, i) => (
							<>
								<Card
									className='bg-white text-dark text-center flex-shrink-0 shadow-sm border'
									style={{
										height: "230px",
										width: "200px",
										overflow: "hidden",
										scrollSnapAlign: "start",
									}}>
									<CardBody>
										<Link href={`/student/batches/${session.batchId}`}>
											<CardTitle tag='h6'>
												{session.topic || "Not specified"}
											</CardTitle>
										</Link>
										<div className='text-dark fs-4'>
											<p className='mb-1 text-dark'>
												<strong>Batch:</strong> {session.batchName}
											</p>
											<p className='mb-1'>
												<strong>Time:</strong> {session.time || "Not specified"}
											</p>
											<p className='mb-1'>
												<strong>Date:</strong>{" "}
												{new Date(session.date)
													.toLocaleString()
													.split(",")[0] || "Not specified"}
											</p>
											<Button
												color='primary'
												className='my-1 px-3 py-1'
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
