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
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import WelcomeCard from "./Welcome";

const ContinueWatching = ({
	loading,
	setLoading,
}: {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const scrollRef1 = useRef<HTMLDivElement>(null);
	const [progressData, setProgressData] = useState<any[]>([]);
	const [loadingLessons, setLoadingLessons] = useState(true);
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
		setLoadingLessons(true);
		try {
			const response = await getMyCourseProgress();
			setProgressData(response.progress.reverse() || []);
		} catch (error) {
			toast.error("Could not fetch progress data");
			console.log(error);
		} finally {
			setLoadingLessons(false);
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
	return (
		<div style={{ height: "350px" }}>
			{loading && loadingLessons ? (
				<div
					className='d-flex justify-content-center align-items-center col-12  position-relative bg-white card p-3 shadow-sm border-0 rounded-4'
					style={{ height: "150px" }}>
					<Spinner color='primary' />
				</div>
			) : progressData.length === 0 ? (
				<WelcomeCard content='Welcome to the EVO! Begin your EVOlution journey with a bang!' />
			) : (
				<div className='col-12  position-relative bg-white card p-3 shadow-sm border-0 rounded-4'>
					<h4 className='fw-bold mb-4 text-muted'>Continue Your Learning</h4>

					{progressData.length > 2 && (
						<>
							<button
								className='btn btn-outline-primary position-absolute top-50 mt-4 mx-1 start-0 translate-middle-y z-2 
								'
								onClick={() => scroll(scrollRef1, "left")}
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
								onClick={() => scroll(scrollRef1, "right")}
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
						ref={scrollRef1}
						className='d-flex  gap-3'
						style={{
							scrollSnapType: "x mandatory",
							height: "250px",
							overflowX: "scroll",
							overflowY: "hidden",
						}}>
						{progressData.map((item, i) => {
							const course = allCourses.find(
								(c) => c._id === item.courseId || c.id === item.courseId
							);
							return (
								<Link
									href={`/student/learning/course/${item.courseId}`}
									key={i}
									className='text-decoration-none'>
									<Card
										color='white'
										className='shadow-sm border text-dark overflow-hidden flex-shrink-0'
										style={{
											width: "200px",
											padding: "0.35rem",
											scrollSnapAlign: "start",
											borderRadius: "12px",
										}}>
										<div
											style={{
												height: "120px",
												width: "100%",
												overflow: "hidden",
												borderRadius: "12px",
											}}>
											<Image
												src={getImageURL(course?.photo)}
												alt={course?.title || "Course Image"}
												style={{
													objectFit: "cover",
													width: "100%",
													height: "100%",
													borderTopLeftRadius: "12px",
													borderTopRightRadius: "12px",
												}}
												width={200}
												height={120}
											/>
										</div>
										<CardBody>
											<CardTitle
												className='fs-5 fw-bold'
												style={{
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "ellipsis",
												}}>
												{course?.title || "Course Title"}
											</CardTitle>
											<Progress
												value={parseInt(item.progressPercent || 0)}
												color='success'
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
				</div>
			)}
		</div>
	);
};

export default ContinueWatching;
