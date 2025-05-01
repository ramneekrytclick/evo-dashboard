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
			console.error("Error fetching learning paths:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container className='card'>
			{loading ? (
				<Container className='d-flex gap-2 text-primary justify-content-center align-items-center'>
					<Spinner size={30} />
				</Container>
			) : (
				<>
					<Row className='g-4'>
						{learningPaths.length === 0 ? (
							<Col xs={12}>
								<Image
									src={`/assets/images/knowledgebase/bg_1.jpg`}
									height={100}
									width={100}
									style={{
										objectFit: "cover",
										width: "100%",
										height: "100%",
									}}
									alt='bg_1'
								/>
								<Card className='text-center text-muted h6 h-100 py-5'>
									No learning paths available for your current enrollments.
									<Link href={`${mainURL}paths`}>Explore All Paths</Link>
								</Card>
							</Col>
						) : (
							<>
								<h4 className='mb-3 fw-bold'>
									🎓 Suggested Learning Paths Based on Your Enrollments
								</h4>
								<p className='text-muted mb-4'>
									These paths are personalized journeys based on your enrolled
									courses. Follow them to master topics in a structured way and
									achieve your goals faster.
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
