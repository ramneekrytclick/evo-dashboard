"use client";

import { useEffect, useRef, useState } from "react";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { getMyUpcomingSessions } from "@/app/api/student";
import { Info } from "react-feather";
import { format } from "date-fns";
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
		<div className='position-relative card p-4 shadow-sm border-0 bg-white rounded-4'>
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
						<Info size={18} />
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
							<div
								key={i}
								className='card bg-light shadow-sm rounded-3 overflow-hidden text-dark'
								style={{
									width: "260px",
									minHeight: "220px",
									scrollSnapAlign: "start",
									border: "1px solid #eee",
								}}>
								<div className='card-body d-flex flex-column justify-content-between'>
									<Link href={`/student/batches/${session.batchId}`}>
										<h6 className='fw-bold text-truncate mb-2'>
											{session.batchName || "BatchName"}
										</h6>
									</Link>
									<p className='text-muted mb-1'>
										{format(new Date(session.date), "dd MMM yyyy")} at{" "}
										<strong>{session.time}</strong>
									</p>
									<p className='text-dark mb-1'>
										<strong>Topic:</strong> {session.topic || "Not specified"}
									</p>
									<p className='text-muted mb-2'>{session.comment}</p>
									<a
										href={session.link}
										target='_blank'
										rel='noopener noreferrer'
										className='btn btn-sm btn-primary mt-auto'>
										Class Link
									</a>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default UpcomingSessions;
