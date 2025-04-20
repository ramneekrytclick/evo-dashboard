"use client";
import { getMyBatches } from "@/app/api/student";
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
	Row,
} from "reactstrap";

const BatchCards = () => {
	const [batches, setBatches] = useState<BatchProps[]>([]);

	const fetchCourses = async () => {
		try {
			const response = await getMyBatches();
			setBatches(response.batches);
		} catch (error) {
			toast.error("Error fetching batches");
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	return (
		<Row className='gap-2 '>
			{batches.length > 0 ? (
				batches.map((batch) => (
					<Col
						xl={5}
						md={6}
						sm={12}
						key={batch._id}>
						<Card className='border-0 shadow rounded-4 h-100 '>
							<CardBody className='d-flex flex-column'>
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
									{batch.course?.title || "N/A"}
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
									{new Date(batch.startDate || new Date()).toLocaleDateString(
										"en-IN",
										{
											day: "numeric",
											month: "short",
											year: "numeric",
										}
									)}
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
					<p className='text-center text-muted h6'>
						Not assigned batches yet. Enroll in a course and Contact the Admin
						if still not assigned.
					</p>
				</>
			)}
		</Row>
	);
};

export default BatchCards;
