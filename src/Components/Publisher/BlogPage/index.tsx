"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Badge } from "reactstrap";
import { getBlog } from "@/app/api/publisher/blogs/blog";
import { BlogProps } from "@/Types/Blogs.type";
import { toast } from "react-toastify";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";

const BlogPageContainer = ({ id }: { id: string }) => {
	const [blog, setBlog] = useState<BlogProps | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchBlog = async () => {
		try {
			const response = await getBlog(id);
			setBlog(response.blog);
		} catch (error) {
			toast.error("Error Fetching Blog!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlog();
	}, []);

	if (loading) {
		return (
			<Container>
				<div className="text-center mt-5">Loading Blog...</div>
			</Container>
		);
	}

	if (!blog) {
		return (
			<Container>
				<div className="text-center mt-5">Blog not found.</div>
			</Container>
		);
	}

	return (
		<Container className="blog-single mt-4 mb-5">
			<Card className="blog-box blog-details shadow-sm">
				{blog.image && (
					<RatioImage
						className="img-fluid w-100 rounded-top"
						src={`${ImagePath}/blog/${blog.image}`}
						alt={blog.title}
					/>
				)}
				<CardBody>
					<ul className="blog-social d-flex flex-wrap gap-3 list-unstyled mb-3">
						<li>
							<i className="icofont icofont-ui-calendar"></i>{" "}
							{new Date(blog.createdAt).toLocaleDateString()}
						</li>
						<li>
							{blog.tags.map((tag, idx) => (
								<Badge
									key={idx}
									color="primary"
									className="me-1 text-uppercase">
									{tag}
								</Badge>
							))}
						</li>
					</ul>

					<h3 className="mt-2">{blog.title}</h3>
					<div
						className="single-blog-content-top mt-3"
						dangerouslySetInnerHTML={{ __html: blog.content }}
					/>

					{blog.conclusion && (
						<>
							<h5 className="mt-4">Conclusion</h5>
							<p>{blog.conclusion}</p>
						</>
					)}
				</CardBody>
			</Card>
			{/* 
			<section className="comment-box mt-4">
				<h4 className="mb-3">User Comments</h4>
				<hr />
				<ul className="list-unstyled">
					<UserComment
						ImageSrc="comment.jpg"
						userReplay
						text="Great insights! Helped me reflect on my goals clearly."
					/>
					<UserComment
						ImageSrc="9.jpg"
						text="Very helpful read, especially the part about visualization!"
					/>
				</ul>
			</section> */}
		</Container>
	);
};

export default BlogPageContainer;
