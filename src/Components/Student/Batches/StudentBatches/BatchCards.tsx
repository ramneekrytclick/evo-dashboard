"use client";
import { getMyBatches } from "@/app/api/student";
import BatchCard from "@/Components/Mentor/Batches/BatchCard";
import { BatchProps } from "@/Types/Course.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Col, Row, Spinner } from "reactstrap";

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
		<Row
			className='g-4'
			style={{ height: "35vh", overflowY: "scroll" }}>
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
								<BatchCard batch={batch} />
							</Col>
						))
					) : (
						<>
							<Card
								className='text-center text-white h6 h-50 py-5 rounded-full position-relative overflow-hidden'
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
		</Row>
	);
};

export default BatchCards;
