"use client";
import { getCourses } from "@/app/api/student";
import { ImagePath } from "@/Constant";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Badge, Button, Card, CardBody, Col, Row } from "reactstrap";
import { sampleData } from "./sampleData";
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
	category: string;
	subcategory: string;
	photo?: string | null;
	mentorAssigned?: { name: string; id: string; email: string };
	tags?: string[];
}

const AvailableCourses = () => {
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const dispatch = useAppDispatch();
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	const fetchCourses = async () => {
		try {
			const response = await getCourses();
			setCourses(response);
		} catch (error) {
			toast.error("Error Fetching Courses from API");
			setCourses(sampleData);
		}
	};

	const isCourseInCart = (courseId: string) =>
		courseCartData.some((c) => c._id === courseId);

	useEffect(() => {
		fetchCourses();
	}, []);

	return (
		<Row className="gy-4">
			{courses?.map((course) => (
				<Col
					xl={6}
					key={course._id}>
					<Card className="shadow-sm border-0 h-100">
						<CardBody>
							<div className="d-flex mb-3">
								<Image
									width={80}
									height={80}
									className="rounded img-fluid me-3 object-fit-cover"
									src={
										course.photo
											? `/${course.photo}`
											: `${ImagePath}/job-search/placeholder.jpg`
									}
									alt={course.title}
								/>
								<div className="flex-grow-1">
									<h5 className="mb-1 fw-bold text-truncate">{course.title}</h5>
									<Badge
										color="info"
										className="me-2">
										{course.category.slice(0, 12)}...
									</Badge>
									<Badge color="secondary">
										{course.subcategory.slice(0, 12)}...
									</Badge>
									<p className="mb-1 text-muted small mt-2">
										Timing: {course.timing}
									</p>
									{course.mentorAssigned?.name && (
										<p className="text-muted small mb-0">
											Mentor: <strong>{course.mentorAssigned.name}</strong>
										</p>
									)}
								</div>
							</div>

							<p className="text-muted small">{course.description}</p>

							{/* Tags */}
							{course.tags?.length && (
								<div className="mb-3">
									{course.tags.map((tag, i) => (
										<Badge
											key={i}
											color="light"
											className="me-2 border text-dark">
											#{tag}
										</Badge>
									))}
								</div>
							)}

							{/* Price + Cart */}
							<div className="d-flex justify-content-between align-items-center mt-3">
								<div>
									<h6 className="mb-0 text-success fw-bold">
										₹{course.discountedPrice}
									</h6>
									<small className="text-muted text-decoration-line-through">
										₹{course.realPrice}
									</small>
								</div>

								{isCourseInCart(course._id!) ? (
									<Button
										color="danger"
										size="sm"
										onClick={() => dispatch(removeFromCourseCart(course._id!))}>
										Remove from Cart
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
			))}
		</Row>
	);
};

export default AvailableCourses;
