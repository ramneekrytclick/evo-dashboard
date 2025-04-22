"use client";

import { getLessonsByCourseID, getMyCourseProgress } from "@/app/api/student";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Progress,
	Spinner,
} from "reactstrap";
import { getAllCourses } from "@/app/api/cc";
import { getImageURL } from "@/CommonComponent/imageURL";
import Image from "next/image";

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
		<div
			className='col-12  position-relative bg-white card p-3 shadow-sm border-0 rounded-4'
			style={{ height: "350px" }}>
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
						href={`${process.env.NEXT_PUBLIC_MAIN_URL}/courses`}
						className='btn btn-primary mt-2'>
						Explore Courses
					</Link>
				</div>
			) : (
				<>
					<h4 className='fw-bold mb-4'>Continue Your Learning</h4>

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
									<Card
										color='light'
										className='shadow-sm text-dark overflow-hidden'
										style={{
											height: "250px",
										}}>
										<Image
											src={getImageURL(course?.photo)}
											alt={course?.title || "Course Image"}
											width={200}
											height={200}
											className='img-fluid'
										/>
										<CardBody>
											<CardTitle className='fs-5 fw-bold'>
												{course?.title || "Course Title"}
											</CardTitle>
											<CardText className='text-muted mb-2'>
												<strong>Lesson: </strong>{" "}
												{nextLesson?.title || "Untitled Lesson"}
											</CardText>
											<Progress
												value={parseInt(item.progressPercent || 0)}
												color='success'
												animated
											/>
											<CardText className='text-muted mt-1'>
												{item.progressPercent || 0}% Completed
											</CardText>
										</CardBody>
									</Card>
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
