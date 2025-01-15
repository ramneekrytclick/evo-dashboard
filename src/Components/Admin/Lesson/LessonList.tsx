"use client";
import { getLessons } from "@/app/api/admin/lessons/lesson";
import { LessonFormProps } from "@/Types/Lesson.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Col } from "reactstrap";
import UpdateLessonModal from "./UpdateLessonModal";

const LessonList = ({ id }: { id: string }) => {
	const [lessons, setLessons] = useState<LessonFormProps[]>([]);
	const fetchLessons = async () => {
		try {
			const response = await getLessons(id);
			console.log(response.course.lessons);
			setLessons(response.course.lessons);
		} catch (error) {
			toast.error("Error Fetching Lessons");
		}
	};
	useEffect(() => {
		fetchLessons();
	}, []);
	return (
		<div>
			{lessons.map((data, index) => (
				<Col
					xl={4}
					sm={6}
					className="xl-50 box-col-6"
					key={index}>
					<Card>
						<div className="blog-box blog-grid text-center product-box">
							<div className="blog-details-main">
								<ul className="blog-social">
									<li>{data.title}</li>
									<li>by: {data.title}</li>
									{/* <li>0 Hits</li> */}
								</ul>
								<hr />
								<h6 className="blog-bottom-details">{JSON.stringify(data.description)}</h6>
							</div>
							<div className="absolute product-img py-4">
								<div className="product-hover">
									<UpdateLessonModal fetchData={fetchLessons} values={data} courseId={id}/>
								</div>
                                </div>
						</div>
					</Card>
				</Col>
			))}
		</div>
	);
};

export default LessonList;
