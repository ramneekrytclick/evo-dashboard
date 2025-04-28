"use client";

import { useEffect, useState, useMemo } from "react";
import { Badge, Button, Card, CardBody } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { getBlogs, approveBlog } from "@/app/api/admin/blogs/blog";
import { BlogProps } from "@/Types/Blogs.type";
import { toast } from "react-toastify";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { customTableStyles } from "../Batches/BatchesList";
import { getImageURL } from "@/CommonComponent/imageURL"; // Assuming you have it
import Image from "next/image";
import Link from "next/link";

const BlogsTable = () => {
	const [filterText, setFilterText] = useState("");
	const [blogs, setBlogs] = useState<BlogProps[]>([]);
	const [selectedBlog, setSelectedBlog] = useState<BlogProps | null>(null);

	const fetchBlogs = async () => {
		try {
			const response = await getBlogs();
			setBlogs(response.blogs.reverse());
		} catch (error) {
			console.error(error);
			toast.error("Failed to fetch blogs");
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	const filteredItems = useMemo(() => {
		return blogs.filter((item) => {
			return (
				item.title.toLowerCase().includes(filterText.toLowerCase()) ||
				item.content.toLowerCase().includes(filterText.toLowerCase()) ||
				item.creator?.name?.toLowerCase().includes(filterText.toLowerCase())
			);
		});
	}, [blogs, filterText]);

	const handleApproval = async (
		id: string,
		status: "Approved" | "Rejected"
	) => {
		try {
			await approveBlog(id, status);
			toast.success(`Blog ${status.toLowerCase()} successfully`);
			await fetchBlogs();
			setSelectedBlog(null);
		} catch (error) {
			console.error(error);
			toast.error(`Failed to ${status.toLowerCase()} blog`);
		}
	};

	const blogTableColumns: TableColumn<BlogProps>[] = [
		{
			name: "Title",
			selector: (row) => row.title,
			sortable: true,
			cell: (row) => (
				<span
					className='p-0 text-primary'
					style={{ cursor: "pointer" }}
					onClick={() => setSelectedBlog(row)}>
					{row.title}
				</span>
			),
		},
		{
			name: "Creator",
			selector: (row) => row.creator?.name || "-",
			sortable: true,
			center: true,
			cell: (row) => (
				<Link href={`/admin/users/${row.creator?._id}`}>
					{row.creator?.name || "Unknown"}
				</Link>
			),
		},
		{
			name: "Status",
			selector: (row) => row.status,
			sortable: true,
			center: true,
			cell: (row) => (
				<Badge
					color=''
					style={{ fontSize: "12px" }}
					className={`badge-${
						row.status === "Approved"
							? "success"
							: row.status === "Pending"
							? "warning"
							: "danger"
					}`}>
					{row.status}
				</Badge>
			),
		},
		{
			name: "Created At",
			center: true,
			selector: (row) => new Date(row.createdAt).toDateString(),
			sortable: true,
		},
	];

	return (
		<Card>
			<CardBody>
				{selectedBlog ? (
					// Detailed Blog View
					<div className='p-4'>
						<Button
							color='outline-success'
							className='mb-3'
							onClick={() => setSelectedBlog(null)}>
							← Back to Blogs
						</Button>

						<h2 className='text-primary'>{selectedBlog.title}</h2>

						{selectedBlog.image && (
							<div className='my-4 text-center'>
								<Image
									src={getImageURL(selectedBlog.image, "blogs")}
									alt={selectedBlog.title}
									width={800}
									height={400}
									style={{
										width: "500px",
										height: "250px",
										objectFit: "cover",
										borderRadius: "8px",
									}}
								/>
							</div>
						)}

						<div
							style={{
								lineHeight: "1.8",
								fontSize: "1.1rem",
								color: "#333",
								wordBreak: "break-word",
							}}
							dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
						/>

						{selectedBlog.conclusion && (
							<>
								<hr />
								<h5>Conclusion</h5>
								<p>{selectedBlog.conclusion}</p>
							</>
						)}

						<div className='d-flex gap-2 mt-4'>
							{selectedBlog.status !== "Approved" && (
								<Button
									color='success'
									onClick={() => handleApproval(selectedBlog._id, "Approved")}>
									Approve
								</Button>
							)}
							{selectedBlog.status !== "Rejected" && (
								<Button
									color='danger'
									onClick={() => handleApproval(selectedBlog._id, "Rejected")}>
									Reject
								</Button>
							)}
						</div>
					</div>
				) : (
					// Blog Table View
					<>
						<FilterComponent
							onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
								setFilterText(e.target.value)
							}
							filterText={filterText}
						/>
						<DataTable
							data={filteredItems}
							columns={blogTableColumns}
							striped
							pagination
							fixedHeader
							className='display'
							noDataComponent='No blogs found.'
							customStyles={customTableStyles}
						/>
					</>
				)}
			</CardBody>
		</Card>
	);
};

export default BlogsTable;
