"use client";

import { getJobs } from "@/app/api/student";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Badge, Card, CardBody, Button } from "reactstrap";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import { ImagePath, Href } from "@/Constant";

const JobsCardView = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getJobs();
			setJobs(response.jobs || []);
		} catch (error) {
			console.error(error);
			toast.error("Error fetching jobs!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	if (loading) {
		return <Card>Loading...</Card>;
	}
	return (
		<>
			{jobs.map((item: any) => (
				<Card
					key={item._id}
					className="job-search">
					<CardBody>
						<div className="d-flex">
							<Image
								priority
								width={40}
								height={40}
								className="img-40 img-fluid m-r-20"
								src={`${ImagePath}/job-search/1.jpg`} // Use dynamic image if available
								alt="job logo"
							/>
							<div className="flex-grow-1">
								<h6 className="f-w-600">
									<Link href={Href}>{item.title}</Link>
									{/* <Badge
										color="primary"
										className="pull-right">
										{item.status}
									</Badge> */}
								</h6>
								<p className="text-muted mb-1">
									Remote, India
									<Rating
										className="ms-1"
										fillColor="#FFAE1A"
										initialValue={4 + Math.random()}
										size={14}
										readonly
									/>
								</p>
							</div>
						</div>
						<p className="mt-2 mb-2">{item.description}</p>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								Openings: <strong>{item.openings}</strong>
							</span>
							<Button
								color="primary"
								size="sm">
								Apply
							</Button>
						</div>
					</CardBody>
				</Card>
			))}
		</>
	);
};

export default JobsCardView;
