"use client";

import { useEffect, useState, useRef } from "react";
import { getMyMentorBookings, getStudentProfile } from "@/app/api/student";
import { toast } from "react-toastify";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const StudentDashboardContainer = () => {
	const [evoScore, setEvoScore] = useState<number>(0);
	const [mentorBookings, setMentorBookings] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const scrollRef1 = useRef<HTMLDivElement>(null);
	const scrollRef2 = useRef<HTMLDivElement>(null);

	const evoColor = getEvoColor(evoScore);
	const evoComment = getEvoComment(evoScore);

	const scroll = (
		ref: React.RefObject<HTMLDivElement>,
		direction: "left" | "right"
	) => {
		if (ref.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	const fetchEvoScore = async () => {
		try {
			const response = await getStudentProfile();
			const score =
				typeof response?.evoScore === "number" ? response.evoScore : 0;
			setEvoScore(score);
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to load EvoScore");
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
		fetchEvoScore();
		fetchMentorBookings();
	}, []);

	const chartOptions: ApexOptions = {
		chart: { type: "radialBar", height: 350 },
		plotOptions: {
			radialBar: {
				hollow: { size: "70%" },
				dataLabels: {
					name: { show: true, fontSize: "22px" },
					value: {
						show: true,
						fontSize: "16px",
						formatter: (val) => `${val}%`,
					},
				},
			},
		},
		labels: ["Evo Score"],
		colors: [evoColor],
	};

	return (
		<div className='container py-4'>
			<div className='row'>
				{/* Continue Learning */}
				<div className='col-12 mb-4 position-relative'>
					<h4 className='mb-3 fw-bold'>Continue Your Learning</h4>
					{loading ? (
						<p>Loading videos...</p>
					) : (
						<>
							<div className='position-absolute top-0 end-0'>
								<button
									className='btn btn-sm btn-outline-secondary me-2'
									onClick={() => scroll(scrollRef1, "left")}
									disabled={10 <= 3}>
									←
								</button>
								<button
									className='btn btn-sm btn-outline-secondary'
									onClick={() => scroll(scrollRef1, "right")}
									disabled={10 <= 3}>
									→
								</button>
							</div>
							<div
								ref={scrollRef1}
								className='d-flex overflow-auto gap-3'>
								{10 > 0 ? (
									new Array(10).fill("j").map((_, i) => (
										<div
											key={i}
											className='card shadow-sm rounded'
											style={{ minWidth: "200px", height: "160px" }}>
											<div className='card-body d-flex justify-content-center align-items-center text-muted'>
												Video Placeholder
											</div>
										</div>
									))
								) : (
									<p className='text-muted'>
										No continue watching videos found.
									</p>
								)}
							</div>
						</>
					)}
				</div>

				{/* Mentor Bookings */}
				<div className='col-lg-9 mb-4 position-relative'>
					<div className='card shadow-sm h-100'>
						<div className='card-body'>
							<h5 className='fw-bold mb-3'>Your Mentor Bookings</h5>
							{loading ? (
								<p>Loading bookings...</p>
							) : mentorBookings.length === 0 ? (
								<p className='text-muted'>No bookings yet.</p>
							) : (
								<>
									<div className='position-absolute top-0 end-0'>
										<button
											className='btn btn-sm btn-outline-primary me-2'
											onClick={() => scroll(scrollRef2, "left")}
											disabled={mentorBookings.length <= 2}>
											←
										</button>
										<button
											className='btn btn-sm btn-outline-primary'
											onClick={() => scroll(scrollRef2, "right")}
											disabled={mentorBookings.length <= 2}>
											→
										</button>
									</div>
									<div
										ref={scrollRef2}
										className='d-flex overflow-auto gap-3 pb-1'>
										{mentorBookings.map((booking) => (
											<div
												key={booking._id}
												className='border rounded shadow-sm p-3 d-flex flex-column justify-content-between'
												style={{ minWidth: "300px", minHeight: "220px" }}>
												<h6 className='mb-1 text-primary'>
													Mentor: {booking.mentor.name}
												</h6>
												<p className='mb-1 small'>
													<b>Date:</b>{" "}
													{new Date(booking.date).toLocaleDateString()}
													<br />
													<b>Time:</b> {booking.timeSlot}
													<br />
													<b>Status:</b>{" "}
													<span
														className={`badge bg-${
															booking.status === "Confirmed"
																? "success"
																: "warning"
														}`}>
														{booking.status}
													</span>
												</p>
												<p className='mb-1 small'>
													<b>Your Message:</b> {booking.message || "-"}
												</p>
												<div className='alert alert-primary p-2 mt-2 mb-0'>
													<b>Mentor Reply:</b>{" "}
													{booking.replyFromMentor || "No reply yet."}
												</div>
											</div>
										))}
									</div>
								</>
							)}
						</div>
					</div>
				</div>

				{/* EVO Score */}
				<div className='col-lg-3 mb-4'>
					<div className='card shadow-sm p-3'>
						<h6 className='fw-bold'>EVO Score</h6>
						<ReactApexChart
							options={chartOptions}
							series={[evoScore]}
							type='radialBar'
							height={250}
						/>
						<p className='mt-3 fw-semibold text-center small text-muted'>
							{evoComment}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentDashboardContainer;
const getEvoComment = (score: number) => {
	const comments = {
		"0-25": [
			"Let's put in some more effort. Every expert was once a beginner!",
			"Low scores aren't failures, just feedback. Keep pushing!",
			"You have great potential. Let's tap into it with consistent learning.",
			"Consider revisiting core concepts to strengthen your foundation.",
			"Don't be disheartened. Every step forward counts!",
			"Try completing one extra lesson every day. You'll see the difference.",
			"Ask mentors questions—that’s what they’re here for!",
			"Great journeys begin with tough starts. Stay committed.",
			"Let’s aim to improve this score by 10% next week.",
			"Stay consistent. Progress is a process!",
		],
		"26-50": [
			"You're building momentum. Keep it going!",
			"You're halfway to mastery. Stay focused!",
			"Nice start! Now double down on your practice.",
			"Explore assignments or quizzes to level up faster.",
			"Let’s aim for a 10% jump this month—set daily goals!",
			"You’ve got the basics—now aim for breakthroughs.",
			"Consider joining a study group for deeper insights.",
			"Great effort! Let’s now turn that into mastery.",
			"You're progressing well. Stay on track!",
			"Just a bit more effort can take you to the next level.",
		],
		"51-75": [
			"Impressive progress! You're doing well.",
			"You're beyond average—strive for excellence now!",
			"Strong performance. Keep up the consistency.",
			"Your learning habits are showing results!",
			"Mentors are noticing your growth—amazing!",
			"Well done! Push through to the expert tier!",
			"Keep challenging yourself. You’re almost there.",
			"Your dedication is inspiring. Stay focused.",
			"Continue solving real-world problems to improve further.",
			"Just one step from mastery—go for it!",
		],
		"76-90": [
			"Outstanding performance! You're leading the way.",
			"This dedication is what success looks like!",
			"You're on fire! Keep the momentum up.",
			"Your hard work is clearly visible—brilliant job!",
			"Exceptional progress. Keep aiming higher.",
			"Others look up to your pace—be the inspiration.",
			"You're nearly at the top. Keep climbing!",
			"This is elite territory—own it!",
			"Stay consistent and aim to teach others too.",
			"Your learning discipline is top-notch!",
		],
		"91-100": [
			"You're a role model! Keep setting the benchmark.",
			"Legendary work! Stay sharp and keep evolving.",
			"You're in the top percentile—well deserved!",
			"Elite performer! Don’t forget to help others too.",
			"Your mastery is impressive—consider mentoring next!",
			"Wow! EVO Score like yours inspires the whole community.",
			"You’re crushing it! Maintain this incredible streak.",
			"Nothing beats consistency—and you're proof!",
			"Outstanding! Showcase your skills in projects now.",
			"All-stars like you light the path for others.",
		],
	};

	const getBucket = (s: number) =>
		s <= 25
			? "0-25"
			: s <= 50
			? "26-50"
			: s <= 75
			? "51-75"
			: s <= 90
			? "76-90"
			: "91-100";

	const options = comments[getBucket(score)];
	return options[Math.floor(Math.random() * options.length)];
};

const getEvoColor = (score: number) => {
	if (score <= 25) return "#FF4D4F";
	if (score <= 50) return "#FAAD14";
	if (score <= 75) return "#52C41A";
	if (score <= 90) return "#1890FF";
	return "#722ED1";
};
