"use client";
import { getMyBlogs } from "@/app/api/creator/blogs/blog";
import { BlogProps } from "@/Types/Blogs.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Col, Row } from "reactstrap";

const MyBlogs = () => {
	const [blogs, setBlogs] = useState<BlogProps[]>([]);
	const fetchBlogs = async () => {
		try {
			const response = await getMyBlogs();
			console.log(response);
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
			{/* {JSON.stringify(blogs)} */}
			{blogs.map((data, index) => (
				<Col
				xl={4}
				key={index}>
				<Card className={`bg-light b-t-primary text-dark`}>
					<Row className="blog-box blog-list px-4 py-2">
						<div className="blog-details">
							<div className="h6 ">
								<span className={`text-${data.status=="Pending"?"secondary":data.status=="Approved"?"success":"danger"} h2`}>{data.title}</span>{" "}
								{/* {data._id} */}
							<h3>{new Date(data.createdAt!).toDateString()}</h3>
							</div>
							<div className="blog-bottom-content">
								{/* <ul className="blog-social">
									<li>Manager: {data.managerAssigned?.name}</li>
									<li>
										{Rupees} {data.price}
									</li>
								</ul> */}
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
