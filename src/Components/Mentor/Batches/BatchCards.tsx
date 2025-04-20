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
									{batch.course?.title || "Untitled Course"}
								</CardTitle>
							</Link>

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
								<strong>Start:</strong>{" "}
								{/* {new Date(batch.startDate).toLocaleDateString()} */}
								{JSON.stringify(batch.startDate)}
							</CardText>
							<CardText className='text-muted small mb-2'>
								<strong>End:</strong> {JSON.stringify(batch.endDate)}
								{/* {new Date(batch.endDate).toLocaleDateString()} */}
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
