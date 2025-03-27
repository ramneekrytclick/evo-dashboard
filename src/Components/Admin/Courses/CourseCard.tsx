"use client";
import Link from "next/link";
import { Card, Col, Row } from "reactstrap";
import { CourseProps } from "@/Types/Course.type";
import CourseModal from "./CourseModal";

interface CourseCardProps {
	data: CourseProps;
	fetchData: () => void;
}

const CourseCard = ({ data, fetchData }: CourseCardProps) => {
	return (
		<Col
			xl={4}
			className="mb-3">
			<Card className="bg-light b-t-primary text-dark h-100">
				<Row className="blog-box blog-list px-4 py-2">
					<div className="blog-details text-start">
						<div className="h6 mb-2">
							<Link href={`/admin/lessons/${data._id}`}>
								<span className="text-primary h5">{data.title}</span>
							</Link>
						</div>

						<div className="blog-bottom-content">
							<ul className="list-unstyled small">
								<li>
									<strong>Category:</strong> {data.category}
								</li>
								<li>
									<strong>Subcategory:</strong> {data.subcategory}
								</li>
								<li>
									<strong>WannaBe Interests:</strong>
									<ul>
										{data.wannaBeInterest.map((id, i) => (
											<li key={i}>{id}</li>
										))}
									</ul>
								</li>
								<li>
									<strong>Duration:</strong> {data.timing}
								</li>
								<li>
									<strong>Price:</strong> ₹{data.discountedPrice}{" "}
									<del className="text-danger">₹{data.realPrice}</del>
								</li>
								<li>
									<strong>Created:</strong>{" "}
									{new Date(data.createdAt || "").toLocaleDateString()}
								</li>
							</ul>
							<hr />
							<p>
								<strong>Description:</strong> {data.description}
							</p>
							<p>
								<strong>What You’ll Learn:</strong> {data.whatYouWillLearn}
							</p>
						</div>
					</div>

					<div className="mt-2 mb-1 text-center">
						<CourseModal
							values={data}
							fetchData={fetchData}
						/>
					</div>
				</Row>
			</Card>
		</Col>
	);
};

export default CourseCard;
