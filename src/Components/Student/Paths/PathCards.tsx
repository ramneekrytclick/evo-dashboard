"use client";

import { getEnrolledPaths } from "@/app/api/student";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	CardTitle,
	Col,
	Container,
	Row,
	Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import { getImageURL } from "@/CommonComponent/imageURL";
const mainURL = process.env.NEXT_PUBLIC_MAIN_URL;
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
	const [loading, setLoading] = useState(false);
	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getEnrolledPaths();
			setPaths(response);
		} catch (error) {
			toast.error("Error fetching your learning paths.");
			console.log("Error fetching learning paths:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container>
			{loading ? (
				<Container className='d-flex gap-2 text-primary justify-content-center align-items-center'>
					<Spinner size={30} />
				</Container>
			) : (
				<>
					<Row className='g-4 mb-5'>
						{learningPaths.length === 0 ? (
							<Col xs={12}>
								<Card
									className='text-center text-white h6 h-100 py-5 rounded-full position-relative overflow-hidden'
									style={{
										backgroundImage:
											"url(/assets/images/knowledgebase/bg_1.jpg)",
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
										className='position-relative'
										style={{ zIndex: 2 }}>
										<p className='mb-3 fs-5 fw-semibold'>
											No learning paths available for your current enrollments.
										</p>
										<Link
											className='btn btn-primary'
											href={`${mainURL}paths`}>
											Explore All Paths
										</Link>
									</div>
								</Card>
							</Col>
						) : (
							<>
								<h4 className='mb-3 fw-bold'>
									🎓 Personalized Learning Paths Tailored to Your Courses &
									Interests
								</h4>
								<p className='text-muted mb-4'>
									Explore curated learning journeys based on your enrolled
									courses and selected interests. These paths help you build
									deep expertise step by step and reach your goals with focus
									and confidence.
								</p>
								{learningPaths.map((path) => {
									return (
										<Col
											xl={3}
											sm={12}
											key={path._id}>
											<Link
												href={`/student/paths/${path._id}`}
												className='text-decoration-none text-dark'>
												<Card className='shadow-sm h-100 hover-shadow'>
													<CardBody className='d-flex flex-column justify-content-between h-100 align-items-center'>
														<Image
															width={200}
															height={200}
															className='rounded w-100'
															style={{ objectFit: "cover" }}
															src={getImageURL(path.photo || "")}
															alt={path.title}
														/>
														<CardTitle
															tag='h3'
															className='fw-bold'>
															{path.title}
														</CardTitle>

														<span
															className='text-muted mb-0 fs-6'
															style={{ minHeight: 50 }}>
															{path.description}
														</span>
													</CardBody>
												</Card>
											</Link>
										</Col>
									);
								})}
							</>
						)}
					</Row>
				</>
			)}
		</Container>
	);
};

export default MyLearningPaths;
