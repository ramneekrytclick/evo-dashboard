"use client";

import { getEnrolledPaths } from "@/app/api/student";
import { Href, ImagePath } from "@/Constant";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	Badge,
	Card,
	CardBody,
	CardFooter,
	CardTitle,
	Col,
	Container,
	Row,
} from "reactstrap";
import { toast } from "react-toastify";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

export interface PathProps {
	_id?: string;
	title: string;
	description: string;
	courses: { _id: string; title: string }[];
	roadmapSuggestions?: string[];
	photo?: string | null;
}

const MyLearningPaths = () => {
	const [learningPaths, setPaths] = useState<PathProps[]>([]);

	const fetchData = async () => {
		try {
			const response = await getEnrolledPaths();
			setPaths(response);
		} catch (error) {
			toast.error("Error fetching your learning paths.");
			console.error("Error fetching learning paths:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container className='py-4'>
			<h4 className='mb-3 fw-bold'>
				🎓 Suggested Learning Paths Based on Your Enrollments
			</h4>
			<p className='text-muted mb-4'>
				These paths are personalized journeys based on your enrolled courses.
				Follow them to master topics in a structured way and achieve your goals
				faster.
			</p>
			<Row className='g-4'>
				{learningPaths.length === 0 ? (
					<Col xs={12}>
						<p className='text-center text-muted'>
							No learning paths available for your current enrollments.
						</p>
					</Col>
				) : (
					learningPaths.map((path) => {
						const resolvedPhoto = path.photo?.replace(/\\/g, "/") || "";
						const imageUrl = path.photo
							? `${backendURL}/uploads/${resolvedPhoto}`
							: `${ImagePath}/job-search/default-path.png`;

						return (
							<Col
								xl={6}
								md={12}
								key={path._id}>
								<Link
									href={`/student/paths/${path._id}`}
									className='text-decoration-none text-dark'>
									<Card className='shadow-sm path-card h-100 hover-shadow'>
										<CardBody>
											<div className='d-flex align-items-center mb-3'>
												<Image
													width={60}
													height={60}
													className='rounded me-3'
													style={{ objectFit: "cover" }}
													src={imageUrl}
													alt={path.title}
												/>
												<div className='flex-grow-1'>
													<CardTitle
														tag='h5'
														className='mb-1'>
														{path.title}
													</CardTitle>
												</div>
											</div>

											<p
												className='text-muted mb-0'
												style={{ minHeight: 50 }}>
												{path.description}
											</p>
										</CardBody>
										<CardFooter className='text-end'>
											<small className='text-primary'>View Full Path ➜</small>
										</CardFooter>
									</Card>
								</Link>
							</Col>
						);
					})
				)}
			</Row>
		</Container>
	);
};

export default MyLearningPaths;
