"use client";
import { getMyBlogs } from "@/app/api/publisher/blogs/blog";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Button,
	Spinner,
} from "reactstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PublisherDashboardContainer = () => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const fetchData = async () => {
		try {
			const response = await getMyBlogs();
			setData(response.blogs);
		} catch (error) {
			toast.error("Something went wrong while fetching blogs");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const stats = [
		{ title: "Total Blogs", value: data.length },
		{
			title: "Approved",
			value: data.filter((b) => b.status === "Approved").length,
		},
		{
			title: "Pending",
			value: data.filter((b) => b.status === "Pending").length,
		},
		{
			title: "Rejected",
			value: data.filter((b) => b.status === "Rejected").length,
		},
	];

	return (
		<>
			<Breadcrumbs
				mainTitle={"Publisher Dashboard"}
				parent={"Publisher"}
				title={"Dashboard"}
			/>

			<Container
				fluid
				className='admin-dashboard'>
				{loading ? (
					<div className='text-center py-5'>
						<Spinner color='primary' />
						<p className='mt-3'>Loading blog stats...</p>
					</div>
				) : (
					<>
						{/* Stats */}
						<Row className='mb-4'>
							{stats.map((item, index) => (
								<Col
									xs={6}
									md={3}
									key={index}>
									<Link href={`/publisher/my-blogs`}>
										<Card className='text-center shadow-sm border-0 p-3'>
											<h2
												className='text-dark mb-1'
												style={{ fontSize: "2rem" }}>
												{item.value}
											</h2>
											<p className='text-muted mb-0'>{item.title}</p>
										</Card>
									</Link>
								</Col>
							))}
						</Row>

						{/* Action Bar */}
						<Row className='mb-4 bg-white p-4 rounded shadow-sm'>
							<Col className='mb-2 fw-bold'>Action Bar</Col>
							<Col xs={12}>
								<div className='d-flex flex-wrap gap-3 w-100'>
									<Button
										color='primary'
										onClick={() => router.push("/publisher/create-blog")}>
										<i className='fa fa-plus me-2 py-1' /> Create Blog
									</Button>
								</div>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</>
	);
};

export default PublisherDashboardContainer;
