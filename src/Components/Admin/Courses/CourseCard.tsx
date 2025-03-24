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
		<Col xl={4}>
			<Card className="bg-light b-t-primary text-dark">
				<Row className="blog-box blog-list px-4 py-2">
					<div className="blog-details text-start">
						<div className="h6 mb-2">
							<Link href={`/admin/lessons/${data._id}`}>
								<span className="text-primary h5">{data.name}</span>
							</Link>
						</div>

						<div className="blog-bottom-content">
							<ul className="list-unstyled small">
								<li>Category ID: {JSON.stringify(data.category)}</li>
								<li>Subcategory ID: {JSON.stringify(data.subcategory)}</li>
								<li>
									WannaBe Interests:
									<ul>
										{data.wannaBeInterest?.map((id: string, i: number) => (
											<li key={i}>{id}</li>
										))}
									</ul>
								</li>
								<li>
									Created: {new Date(data.createdAt!).toLocaleDateString()}
								</li>
							</ul>
							<hr />
							<p className="mt-0">{data.description}</p>
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
