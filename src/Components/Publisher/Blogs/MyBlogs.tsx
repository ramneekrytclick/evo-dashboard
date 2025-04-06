"use client";
import { getMyBlogs } from "@/app/api/publisher/blogs/blog";
import { BlogProps } from "@/Types/Blogs.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Badge,
	Row,
	Col,
} from "reactstrap";

const statusColors: Record<string, string> = {
	Pending: "warning",
	Approved: "success",
	Rejected: "danger",
};

const MyBlogs = () => {
	const [blogs, setBlogs] = useState<BlogProps[]>([]);

	const fetchBlogs = async () => {
		try {
			const response = await getMyBlogs();
			setBlogs(response.blogs);
		} catch (error) {
			toast.error("Error Fetching Blogs!");
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<>
			<Row style={{ height: "75vh", overflowY: "scroll" }}>
				{blogs.map((blog) => (
					<Col
						md="4"
						sm="6"
						xs="12"
						key={blog._id}
						className="mb-4">
						<Card className="h-100 shadow-sm">
							{blog.image && (
								<CardImg
									top
									width="100%"
									src={`/uploads/${blog.image}`}
									alt={blog.title}
									style={{ objectFit: "cover", height: "180px" }}
								/>
							)}
							<CardBody>
								<div className="d-flex justify-content-between align-items-center mb-2">
									<CardTitle
										tag="h5"
										className="mb-0">
										{blog.title}
									</CardTitle>
									<Badge
										color={
											statusColors[blog.status as keyof typeof statusColors] ||
											"secondary"
										}>
										{blog.status}
									</Badge>
								</div>
								<CardText
									className="text-muted"
									style={{ fontSize: "0.9rem" }}>
									{blog.conclusion}
								</CardText>
								<div className="mt-2">
									{blog.tags?.map((tag, idx) => (
										<Badge
											color="primary"
											pill
											className="me-1"
											key={idx}>
											{tag}
										</Badge>
									))}
								</div>
							</CardBody>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};

export default MyBlogs;
