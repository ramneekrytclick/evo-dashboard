"use client";

import { useEffect, useState } from "react";
import { getMentorBatches } from "@/app/api/mentor";
import { BatchProps } from "@/Types/Course.type";
import Link from "next/link";
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

	const fetchBatches = async () => {
		try {
			const response = await getMentorBatches();
			setBatches(response.batches);
		} catch (error) {
			toast.error("Error fetching batches");
		}
	};

	useEffect(() => {
		fetchBatches();
	}, []);

	return (
		<Row
			className='g-4'
			style={{ height: "76vh", overflowY: "scroll" }}>
			{batches.length === 0 && <h5>No Batches Found</h5>}
			{batches.map((batch) => (
				<Col
					xl={4}
					md={6}
					key={batch._id}>
					<Card className='border-0 shadow rounded-4 h-100 '>
						<CardBody className='d-flex flex-column'>
							{/* Course title + Batch chat link */}
							<Link href={`/mentor/batches/${batch._id}`}>
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
			))}
		</Row>
	);
};

export default BatchCards;
