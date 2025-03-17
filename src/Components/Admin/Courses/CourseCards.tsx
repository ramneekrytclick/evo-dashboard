"use client";
import { getCourses } from "@/app/api/admin/course";
import { Rupees } from "@/Constant";
import { CourseProps } from "@/Types/Course.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Col, Row } from "reactstrap";
import CourseModal from "./CourseModal";
import ScrollBar from "react-perfect-scrollbar";
import { courseFakeData } from "@/FakeData/admin/course";

const CourseCards = () => {
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const fetchCourses = async () => {
		try {
			const response = await getCourses();
			console.log(response.courses);

			setCourses(response.courses);
			setCourses(courseFakeData);
		} catch (error) {
			console.error(error);
			toast.error("Error in fetching courses");
		}
	};
	useEffect(() => {
		fetchCourses();
	}, []);
	return (
		<>
			<ScrollBar
				style={{ width: "100%", height: "40em" }}
				className="vertical-scroll scroll-demo text-center">
				<Row>
					{courses?.map((data, index) => (
						<Col
							xl={4}
							key={index}>
							<Card className="bg-light b-t-primary text-dark">
								<Row className="blog-box blog-list px-4 py-2">
									<div className="blog-details">
										<div className="h6 ">
											<Link href={`/admin/lessons/${data._id}`}>
												<span className="text-primary h2">{data.name}</span>{" "}
											</Link>
											{/* {data._id} */}
											<h3>{data.duration}</h3>
										</div>
										<div className="blog-bottom-content">
											<ul className="blog-social">
												<li>Manager: {data.managerAssigned?.name}</li>
												<li>
													{Rupees} {data.price}
												</li>
											</ul>
											<hr />
											<p className="mt-0">{data.description}</p>
										</div>
									</div>
									<div className="mt-2 mb-1 text-center">
										<CourseModal
											values={data}
											fetchData={fetchCourses}
										/>
									</div>
								</Row>
							</Card>
						</Col>
					))}
				</Row>
			</ScrollBar>
		</>
	);
};

export default CourseCards;
