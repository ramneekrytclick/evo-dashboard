"use client";
import { getCourses, getEnrolledCourses } from "@/app/api/student";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Progress,
	Row,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {
	addToCourseCart,
	removeFromCourseCart,
} from "@/Redux/Reducers/Courses/CourseCartSlice";

export interface CourseProps {
	_id?: string;
	title: string;
	description: string;
	timing: string;
	discountedPrice: number;
	realPrice: number;
	category?: { _id: string; title: string } | string | null;
	subcategory?: { _id: string; title: string } | string | null;
	photo?: string | null;
	mentorAssigned?: { name: string; id: string; email: string };
	tags?: string[];
	wannaBeInterest?: { title: string }[];
}

const AvailableCourses = () => {
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [enrolledCourses, setEnrolledCourses] = useState<
		{ course: CourseProps; completedLessons: any[] }[]
	>([]);
	const dispatch = useAppDispatch();
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	const fetchCourses = async () => {
		try {
			const response = await getCourses();
			setCourses(response.courses);
		} catch (error) {
			toast.error("Error fetching courses.");
		}
	};

	const fetchEnrolledCourses = async () => {
		try {
			const response = await getEnrolledCourses();
			setEnrolledCourses(response.enrolledCourses);
		} catch (error) {
			toast.error("Error fetching enrolled courses.");
		}
	};

	useEffect(() => {
		fetchCourses();
		fetchEnrolledCourses();
	}, []);

	const isCourseInCart = (id: string) =>
		courseCartData.some((c) => c._id === id);

	const isCourseEnrolled = (id: string) =>
		enrolledCourses.some((ec) => ec.course._id === id);

	return (
		<Row className="gy-4">
			{courses?.map((course) => {
				const category =
					typeof course.category === "object"
						? course.category?.title
						: course.category;
				const subcategory =
					typeof course.subcategory === "object"
						? course.subcategory?.title
						: course.subcategory;
				const discount = course.realPrice
					? Math.round(
							((course.realPrice - course.discountedPrice) / course.realPrice) *
								100
					  )
					: 0;

				const enrolled = isCourseEnrolled(course._id!);
				const enrolledData = enrolledCourses.find(
					(ec) => ec.course._id === course._id
				);
				const completedLessons = enrolledData?.completedLessons || [];
				const totalLessons = 10; // Replace this with dynamic lesson count
				const progress = Math.round(
					(completedLessons.length / totalLessons) * 100
				);

				if (enrolled) {
					return (
						<Col
							xl={4}
							className="mb-4"
							key={course._id}>
							<Card className="border-0 shadow-md rounded-4 overflow-hidden h-100">
								<div className="position-relative">
									<CardImg
										top
										width="100%"
										height="200px"
										src={`/uploads/${course.photo}`}
										alt={course.title}
										className="object-fit-cover"
									/>
								</div>

								<CardBody className="text-start p-4 d-flex flex-column">
									<CardTitle
										tag="h5"
										className="fw-bold text-dark mb-2">
										<a
											className="fw-bold text-dark"
											href={`/student/course/${course._id}`}>
											{course.title || "Untitled Course"}
										</a>
									</CardTitle>

									<div className="mb-2">
										{category && (
											<Badge
												color="primary"
												className="me-2">
												{category}
											</Badge>
										)}
										{subcategory && (
											<Badge color="success">{subcategory}</Badge>
										)}
									</div>

									<CardText className="text-muted small mb-3 flex-grow-1">
										{course.description?.slice(0, 100) ||
											"No description provided."}
									</CardText>

									{/* Progress */}
									<div className="mb-3">
										<small className="text-muted">Progress</small>
										<Progress
											value={progress}
											className="my-1"
										/>
										<small>{progress}% Completed</small>
									</div>

									<a
										href={`/student/course/${course._id}`}
										className="btn btn-sm btn-outline-primary w-100 mt-auto">
										Continue Learning
									</a>
								</CardBody>
							</Card>
						</Col>
					);
				}

				// Not Enrolled
				return (
					<Col
						xl={4}
						md={6}
						key={course._id}>
						<Card className="border-0 shadow-md rounded-4 overflow-hidden h-100">
							<div className="position-relative">
								<CardImg
									top
									width="100%"
									height="200px"
									src={course.photo ? `/${course.photo}` : "/placeholder.jpg"}
									alt={course.title}
									className="object-fit-cover"
								/>
								{discount > 0 && (
									<Badge
										color="danger"
										pill
										className="position-absolute top-0 end-0 m-3 fs-6">
										-{discount}% Off
									</Badge>
								)}
							</div>

							<CardBody className="text-start p-4 d-flex flex-column">
								<CardTitle
									tag="h5"
									className="fw-bold text-dark mb-2">
									{course.title}
								</CardTitle>

								{/* Category/Subcategory */}
								<div className="mb-2">
									{category && (
										<Badge
											color="primary"
											className="me-2">
											{category}
										</Badge>
									)}
									{subcategory && <Badge color="success">{subcategory}</Badge>}
								</div>

								{/* Tags */}
								{(course.tags ?? []).length > 0 && (
									<div className="mb-3">
										{course.tags?.map((tag, i) => (
											<Badge
												key={i}
												color="light"
												className="me-2 text-dark border">
												#{tag}
											</Badge>
										))}
									</div>
								)}

								{/* Mentor & Timing */}
								<div className="text-muted small mb-2">
									{course.mentorAssigned?.name && (
										<p className="mb-1">
											<strong>Mentor:</strong> {course.mentorAssigned.name}
										</p>
									)}
									<p className="mb-1">
										<strong>Timing:</strong> {course.timing || "Self-paced"}
									</p>
								</div>

								<CardText className="text-muted small mb-3 flex-grow-1">
									{course.description?.slice(0, 120) ||
										"No description provided."}
								</CardText>

								{/* Price + Add/Remove Cart */}
								<div className="d-flex justify-content-between align-items-center mt-auto">
									<div className="fs-5 fw-semibold text-success">
										₹{course.discountedPrice}
										{course.realPrice && (
											<del className="text-muted ms-2 fs-6">
												₹{course.realPrice}
											</del>
										)}
									</div>
									{isCourseInCart(course._id!) ? (
										<Button
											color="danger"
											size="sm"
											onClick={() =>
												dispatch(removeFromCourseCart(course._id!))
											}>
											Remove
										</Button>
									) : (
										<Button
											color="primary"
											size="sm"
											onClick={() =>
												dispatch(
													addToCourseCart({
														_id: course._id!,
														title: course.title,
														discountedPrice: course.discountedPrice,
														photo: course.photo,
														realPrice: course.realPrice,
													})
												)
											}>
											Add to Cart
										</Button>
									)}
								</div>
							</CardBody>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
};

export default AvailableCourses;
