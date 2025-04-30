"use client";

import { getBlogs } from "@/app/api/admin/blogs/blog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Badge, Spinner } from "reactstrap";
import Link from "next/link";
import { Clock } from "react-feather";

const PublisherCards = ({ profile }: { profile: any }) => {
	const [blogs, setBlogs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchBlogs = async () => {
		try {
			const response = await getBlogs();
			const filtered = response.blogs
				.reverse()
				.filter((blog: any) => blog.creator?._id === profile._id);
			setBlogs(filtered);
		} catch (error) {
			console.error("Failed to fetch blogs:", error);
			toast.error("Failed to fetch blogs");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	if (loading)
		return (
			<div className='text-center py-5'>
				<Spinner /> Loading blogs...
			</div>
		);

	return (
		<div className='my-3'>
			<h5 className='fw-bold mb-3'>Published Blogs</h5>
			{blogs.length === 0 ? (
				<p className='text-muted'>No blogs published by {profile.name} yet.</p>
			) : (
				<div className='d-flex overflow-auto gap-3'>
					{blogs.map((blog) => (
						<Link
							href={`/admin/blogs/${blog.slug}`}
							key={blog._id}>
							<Card
								className='shadow-sm'
								style={{ minWidth: "300px", flex: "0 0 auto" }}>
								<CardHeader className='fw-semibold text-dark'>
									{blog.title}
								</CardHeader>
								<CardBody>
									<p className='mb-2'>
										<Badge
											color={
												blog.status === "Approved"
													? "success"
													: blog.status === "Rejected"
													? "danger"
													: "warning"
											}>
											{blog.status}
										</Badge>
									</p>
									<p className='mb-1 text-muted d-flex align-items-center gap-1'>
										<Clock size={15} />
										{new Date(blog.createdAt).toLocaleDateString()}
									</p>
								</CardBody>
							</Card>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default PublisherCards;
