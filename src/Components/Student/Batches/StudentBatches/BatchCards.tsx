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
		<Row>
			{batches.length > 0 ? (
				batches.map((batch) => (
					<Col
						xl={4}
						md={6}
						key={batch._id}>
						<Card className='border-0 shadow rounded-4'>
							<CardBody className='d-flex flex-column'>
								<Link href={`/student/batches/${batch._id}`}>
									<CardTitle
										tag='h5'
										className='fw-bold text-dark mb-2'>
										{batch.course?.title || "Untitled Course"}
									</CardTitle>
								</Link>

								<div className='mb-2'>
									<Badge
										color='info'
										className='me-2'>
										{batch.batchWeekType}
									</Badge>
									<Badge color='warning'>{batch.time}</Badge>
								</div>

								<CardText className='text-muted small mb-3'>
									{batch.description || "No description provided."}
								</CardText>

								<div className='mt-auto'>
									<p className='small text-muted mb-1'>
										<strong>Mentor:</strong> {batch.mentor?.name || "N/A"}
									</p>
									<p className='small text-muted'>
										<strong>Email:</strong> {batch.mentor?.email || "N/A"}
									</p>
								</div>
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
