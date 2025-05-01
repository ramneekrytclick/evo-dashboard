"use client";
import { getMyBatches } from "@/app/api/student";
import { getCourseName } from "@/CommonComponent/imageURL";
import { BatchProps } from "@/Types/Course.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Badge,
	Card,
	CardBody,
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
	Spinner,
} from "reactstrap";

const BatchCards = () => {
	const [batches, setBatches] = useState<BatchProps[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchCourses = async () => {
		setLoading(true);
		try {
			const response = await getMyBatches();
			setBatches(response.batches);
		} catch (error) {
			toast.error("Error fetching batches");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);
	return (
		<Container>
			{loading ? (
				<div className='d-flex justify-content-center align-items-center h-100 text-primary gap-3 fs-4'>
					Loading
					<Spinner />
				</div>
			) : (
				<>
					{batches.length > 0 ? (
						batches.map((batch) => (
							<Col
								xl={4}
								md={6}
								sm={12}
								key={batch._id}>
								<Card className='border-0 shadow rounded-4 h-100 '>
									<CardBody className='d-flex flex-column justify-content-between align-items-center'>
										{/* Course title + Batch chat link */}
										<Link href={`/student/batches/${batch._id}`}>
											<CardTitle
												tag='h5'
												className='fw-bold text-dark mb-2'>
												{batch.name || "N/A"}
											</CardTitle>
										</Link>
										<p className='fs-6'>
											<strong>Course: </strong>
											{getCourseName(batch.course || "")}
										</p>
										{/* Batch schedule info */}
										<div className='mb-2'>
											<Badge
												color='info'
												className='me-2'>
												{batch.batchWeekType}
											</Badge>
											<Badge color='warning'>{batch.time}</Badge>
										</div>

										{/* Description */}
										<CardText className='text-muted small mb-2'>
											{batch.description || "No description provided."}
										</CardText>

										{/* Dates */}
										<CardText className='text-muted small mb-1'>
											<strong>Duration:</strong>{" "}
											{new Date(
												batch.startDate || new Date()
											).toLocaleDateString("en-IN", {
												day: "numeric",
												month: "short",
												year: "numeric",
											})}
											-
											{new Date(batch.endDate || new Date()).toLocaleDateString(
												"en-IN",
												{
													day: "numeric",
													month: "short",
													year: "numeric",
												}
											)}
										</CardText>

										{/* Students Count */}
										<CardText className='text-muted small mt-auto'>
											<strong>Students Enrolled:</strong>{" "}
											{batch.students?.length || 0}
										</CardText>
									</CardBody>
								</Card>
							</Col>
						))
					) : (
						<>
							<Card
								className='text-center text-white h6 h-100 py-5 rounded-full position-relative overflow-hidden'
								style={{
									backgroundImage: "url(/assets/images/knowledgebase/bg_2.jpg)",
									backgroundSize: "cover",
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									minHeight: "300px",
								}}>
								<div
									className='position-absolute top-0 start-0 w-100 h-100'
									style={{
										backgroundColor: "rgba(0, 0, 0, 0.5)",
										zIndex: 1,
									}}></div>

								<div
									className='position-relative d-flex flex-column justify-content-center align-items-center gap-3'
									style={{ zIndex: 2 }}>
									No Batches assigned to you.
									<Link
										href={`/student/my-courses`}
										className='btn btn-primary px-2 py-1'>
										Enroll in a course
									</Link>
									OR
									<Link
										href={`/student/support/tickets`}
										className='btn btn-primary px-2 py-1'>
										Contact the Admin
									</Link>
								</div>
							</Card>
						</>
					)}
				</>
			)}
		</Container>
	);
};

export default BatchCards;
