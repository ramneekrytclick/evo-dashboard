"use client";

import { getBatchBySlug } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Badge, Row, Col } from "reactstrap";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";

const BatchDetailsSlug = ({ id }: { id: string }) => {
	const [batch, setBatch] = useState<BatchProps | null>(null);

	const fetchBatch = async () => {
		const response = await getBatchBySlug(id);
		setBatch(response);
	};

	useEffect(() => {
		fetchBatch();
	}, []);

	if (!batch) return <div>Loading batch details...</div>;

	return (
		<div className='py-5'>
			<Card className='p-4'>
				<CardTitle
					tag='h3'
					className='mb-4'>
					{batch.name}
				</CardTitle>

				<Row className='mb-3'>
					<Col md={6}>
						<strong>Batch Slug:</strong> {batch.slug}
					</Col>
					<Col md={6}>
						<strong>Week Type:</strong>{" "}
						<Badge color='info'>{batch.batchWeekType}</Badge>
					</Col>
				</Row>

				<Row className='mb-3'>
					<Col md={6}>
						<strong>Start Date:</strong>{" "}
						{new Date(batch.startDate || new Date()).toLocaleDateString()}
					</Col>
					<Col md={6}>
						<strong>End Date:</strong>{" "}
						{new Date(batch.endDate || new Date()).toLocaleDateString()}
					</Col>
				</Row>

				<Row className='mb-3'>
					<Col md={6}>
						<strong>Batch Time:</strong> {batch.time}
					</Col>
					<Col md={6}>
						<strong>Course:</strong>{" "}
						{batch.course?.title && (
							<>
								<Badge color='primary'>{batch.course.title}</Badge>
							</>
						)}
					</Col>
				</Row>

				<div className='mb-4'>
					<strong>Description:</strong>
					<p className='mt-1'>{batch.description}</p>
				</div>

				<div className='mb-4'>
					<strong>Mentor:</strong>
					<div className='d-flex align-items-center mt-2'>
						{batch.mentor?.photo && (
							<Image
								src={getImageURL(batch.mentor.photo)}
								alt={batch.mentor.name}
								width={40}
								height={40}
								className='rounded-circle me-2'
							/>
						)}
						<div>
							{batch.mentor?.name} ({batch.mentor?.email})
						</div>
					</div>
				</div>

				<div className='mb-4'>
					<strong>Students:</strong>
					<Row className='mt-2'>
						{batch.students?.map((student) => (
							<Col
								md={4}
								key={student._id}
								className='d-flex align-items-center mb-2'>
								{student.photo && (
									<Image
										src={getImageURL(student.photo)}
										alt={student.name}
										width={30}
										height={30}
										className='rounded-circle me-2'
									/>
								)}
								<div>{student.name}</div>
							</Col>
						))}
					</Row>
				</div>

				<div className='mb-4'>
					<strong>Scheduled Sessions:</strong>
					{batch.scheduledSessions && (
						<>
							{batch.scheduledSessions?.length > 0 ? (
								batch.scheduledSessions.map((session, idx) => (
									<Card
										key={idx}
										className='p-3 mb-3'>
										<Row>
											<Col md={6}>
												<strong>Topic:</strong> {session.topic}
											</Col>
											<Col md={6}>
												<strong>Date:</strong>{" "}
												{new Date(session.date).toLocaleDateString()}
											</Col>
										</Row>
										<Row className='mt-2'>
											<Col md={6}>
												<strong>Time:</strong> {session.time}
											</Col>
											<Col md={6}>
												<strong>Meeting Link:</strong>{" "}
												<a
													href={session.link}
													target='_blank'
													rel='noopener noreferrer'>
													Join
												</a>
											</Col>
										</Row>
										<div className='mt-2'>
											<strong>Comment:</strong> {session.comment}
										</div>
									</Card>
								))
							) : (
								<p>No sessions scheduled.</p>
							)}
						</>
					)}
				</div>
			</Card>
		</div>
	);
};

export default BatchDetailsSlug;
