"use client";
import { getMyBlogs } from "@/app/api/creator/blogs/blog";
import { blogFakeData } from "@/FakeData/admin/blog";
import { BlogProps } from "@/Types/Blogs.type";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { toast } from "react-toastify";
import { Card, Col, Row } from "reactstrap";

const MyBlogs = () => {
	const [blogs, setBlogs] = useState<BlogProps[]>([]);
	const fetchBlogs = async () => {
		// try {
		// 	const response = await getMyBlogs();
		// 	console.log(response);
		// 	setBlogs(response.blogs);
		// } catch (error) {
		// 	toast.error("Error Fetching Blogs!");
		// }
		setBlogs(blogFakeData);
	};
	useEffect(() => {
		fetchBlogs();
	}, []);
	return (
		<>
			{/* {JSON.stringify(blogs)} */}
			{blogs?.map((data, index) => (
				<Col
					xl={4}
					md={6}
					sm={12}
					key={index}>
					<Card className={`bg-light b-t-primary text-dark`}>
						<Row className="blog-box blog-list px-4 py-2">
							<div className="blog-details">
								<Row>
									<Col
										className="h6 "
										sm={11}>
										<span
											className={`text-${
												data.status == "Pending"
													? "secondary"
													: data.status == "Approved"
													? "success"
													: "danger"
											} h2`}>
											{data.title}
										</span>{" "}
										<h3>{new Date(data.createdAt!).toDateString()}</h3>
									</Col>
									<Col sm={1}>
										<span
											className={`${
												data.status === "Pending"
													? "text-secondary"
													: "text-success"
											} h6`}>
											{data.status === "Pending" ? <Eye /> : <EyeOff />}
										</span>
									</Col>
								</Row>
								<div className="blog-bottom-content">
									<hr />
									<p className="mt-0">{data.content}</p>
								</div>
							</div>
						</Row>
					</Card>
				</Col>
			))}
		</>
	);
};

export default MyBlogs;
