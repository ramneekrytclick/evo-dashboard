"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, CoursesTitle } from "@/Constant";

import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";
import CourseCards from "./CourseCards";
import CourseHeader from "./CourseHeader";
import { getAllReviews } from "@/app/api/admin/course";
import { useEffect, useState } from "react";
import { Review } from "./ReviewModal";
import { toast } from "react-toastify";

const CoursesPageContainer = () => {
	const [allReviews, setAllReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchReviews = async () => {
		try {
			setLoading(true);
			const response = await getAllReviews();
			setAllReviews(response.reviews);
		} catch (error) {
			toast.error("Error fetching reviews");
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchReviews();
		setLoading(false);
	}, []);
	if (loading) {
		return <Spinner />;
	}
	return (
		<>
			<Breadcrumbs
				mainTitle={CoursesTitle}
				parent={AdminTitle}
				title={CoursesTitle}
			/>
			<Container fluid>
				<Row>
					<Col className='box-col-8'>
						<CourseHeader />
						<div style={{ height: "75vh", overflowY: "scroll" }}>
							<CourseCards
								reviews={allReviews}
								fetchReviews={fetchReviews}
							/>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CoursesPageContainer;
