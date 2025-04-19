"use client";

import { getLessonsByCourseID, getMyCourseProgress } from "@/app/api/student";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Progress, Spinner } from "reactstrap";
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
			console.log(error);
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
		<div className='col-12 mb-4 position-relative bg-white card p-4 shadow-sm border-0 rounded-4'>
			{loading ? (
				<div
					className='d-flex justify-content-center align-items-center'
					style={{ height: "150px" }}>
					<Spinner color='primary' />
				</div>
			) : visibleCourses.length === 0 ? (
				<div className='text-center py-4'>
					<h5 className='mb-2 fw-semibold'>👋 Welcome to EVO!</h5>
					<p className='text-muted'>You haven’t enrolled in any courses yet.</p>
					<Link
						href='/courses'
						className='btn btn-primary mt-2'>
						Explore Courses
					</Link>
				</div>
			) : (
				<>
					<h4 className='fw-bold mb-4'>📚 Continue Your Learning</h4>

					{visibleCourses.length > 5 && (
						<>
							<button
								className='btn btn-outline-primary position-absolute top-50 start-0 translate-middle-y z-2'
								onClick={() => scroll(scrollRef1, "left")}
								style={{ borderRadius: "50%" }}>
								←
							</button>
							<button
								className='btn btn-outline-primary position-absolute top-50 end-0 translate-middle-y z-2'
								onClick={() => scroll(scrollRef1, "right")}
								style={{ borderRadius: "50%" }}>
								→
							</button>
						</>
					)}

					<div
						ref={scrollRef1}
						className='d-flex overflow-auto gap-3 pb-2'
						style={{ scrollSnapType: "x mandatory" }}>
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
									href={`/student/learning/course/${item.courseId}`}
									key={i}
									className='text-decoration-none'>
									<div
										className='card shadow-sm text-dark rounded-3 overflow-hidden'
										style={{
											width: "260px",
											minHeight: "280px",
											scrollSnapAlign: "start",
											border: "1px solid #eee",
										}}>
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
		</div>
	);
};

export default ContinueWatching;
