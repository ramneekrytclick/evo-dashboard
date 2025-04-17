"use client";

import { getLessonsByCourseID, getMyCourseProgress } from "@/app/api/student";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Progress } from "reactstrap";
import { getAllCourses } from "@/app/api/cc";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL;

const ContinueWatching = ({
	loading,
	setLoading,
}: {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const scrollRef1 = useRef<HTMLDivElement>(null);
	const [progressData, setProgressData] = useState<any[]>([]);
	const [lessonsMap, setLessonsMap] = useState<{ [courseId: string]: any[] }>(
		{}
	);
	const [allCourses, setAllCourses] = useState<any[]>([]);

	const scroll = (
		ref: React.RefObject<HTMLDivElement>,
		direction: "left" | "right"
	) => {
		if (ref.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	const fetchProgress = async () => {
		setLoading(true);
		try {
			const response = await getMyCourseProgress();
			setProgressData(response.progress.reverse() || []);
		} catch (error) {
			toast.error("Could not fetch progress data");
		} finally {
			setLoading(false);
		}
	};

	const fetchCourseLessons = async (courseId: string) => {
		try {
			const response = await getLessonsByCourseID(courseId);
			setLessonsMap((prev) => ({
				...prev,
				[courseId]: response.lessons || [],
			}));
		} catch (error) {
			toast.error("Could not fetch lessons");
		}
	};

	const fetchCourses = async () => {
		try {
			const response = await getAllCourses();
			setAllCourses(response.courses || []);
		} catch (error) {
			toast.error("Could not fetch courses");
		}
	};

	useEffect(() => {
		fetchProgress();
		fetchCourses();
	}, []);

	useEffect(() => {
		progressData.forEach((course: any) => {
			if (!lessonsMap[course.courseId]) fetchCourseLessons(course.courseId);
		});
	}, [progressData]);

	const getNextLesson = (courseId: string, completedLessons: any) => {
		const lessons = lessonsMap[courseId] || [];
		const completed = Array.isArray(completedLessons) ? completedLessons : [];
		return lessons.find((l: any) => !completed.includes(l._id));
	};

	const visibleCourses = progressData.filter((item) =>
		getNextLesson(item.courseId, item.completedLessons)
	);

	return (
		<div className='col-12 mb-4 position-relative'>
			<h4 className='mb-3 fw-bold'>Continue Your Learning</h4>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					{visibleCourses.length === 0 ? (
						<p className='text-muted'>No courses to continue.</p>
					) : (
						<>
							<div className='position-absolute top-0 end-0'>
								<button
									className='btn btn-sm btn-outline-secondary me-2'
									onClick={() => scroll(scrollRef1, "left")}>
									←
								</button>
								<button
									className='btn btn-sm btn-outline-secondary'
									onClick={() => scroll(scrollRef1, "right")}>
									→
								</button>
							</div>

							<div
								ref={scrollRef1}
								className='d-flex overflow-scroll gap-3 h-100'>
								{visibleCourses.map((item, i) => {
									const nextLesson = getNextLesson(
										item.courseId,
										item.completedLessons
									);
									if (!nextLesson) return null;
									const course = allCourses.find(
										(c) => c._id === item.courseId || c.id === item.courseId
									);

									return (
										<Link
											href={`/student/course/${item.courseId}`}
											key={i}
											className='text-decoration-none'>
											<div
												className='card shadow-sm rounded text-dark'
												style={{ minWidth: "260px", minHeight: "260px" }}>
												{course?.photo && (
													<img
														src={`${backendURL}/uploads/${course.photo}`}
														alt={course.title}
														style={{
															width: "100%",
															height: "120px",
															objectFit: "cover",
														}}
													/>
												)}
												<div className='card-body d-flex flex-column justify-content-between'>
													<h6 className='fw-bold text-truncate mb-1'>
														{course?.title || "Course Title"}
													</h6>
													<small className='text-muted text-truncate'>
														Lesson: {nextLesson?.title || "Untitled Lesson"}
													</small>
													<small className='text-muted mb-2 text-truncate'>
														{course?.description || "No description"}
													</small>
													<Progress
														value={item.progressPercent || 0}
														style={{ height: "6px" }}
													/>
													<small className='text-muted mt-1'>
														{item.progressPercent || 0}% Completed
													</small>
												</div>
											</div>
										</Link>
									);
								})}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default ContinueWatching;
