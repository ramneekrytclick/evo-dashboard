"use client";

import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { BlogsApprovalTitle } from "@/Constant";
import { Badge, Card, CardBody } from "reactstrap";
import { useEffect, useState, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { getBlogs } from "@/app/api/admin/blogs/blog";
import BlogModal from "./BlogModal";
import { BlogProps } from "@/Types/Blogs.type";
import { toast } from "react-toastify";

const BlogsTable = () => {
	const [filterText, setFilterText] = useState("");
	const [blogs, setBlogs] = useState<BlogProps[]>([]);

	const fetchBlogs = async () => {
		try {
			const response = await getBlogs();
			setBlogs(response.blogs);
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

	const blogTableColumns: TableColumn<BlogProps>[] = [
		{
			name: "Title",
			selector: (row) => row.title,
			sortable: true,
			cell: (row) => (
				<BlogModal
					fetchData={fetchBlogs}
					item={{
						id: row._id,
						title: row.title,
						text: row.content,
						status: row.status,
					}}
				/>
			),
		},
		{
			name: "Content",
			selector: (row) => row.content,
			sortable: true,
			cell: (row) => `${row.content.substring(0, 100)}...`,
		},
		{
			name: "Creator",
			selector: (row) => row.creator.name,
			sortable: true,
		},
		{
			name: "Status",
			selector: (row) => row.status,
			sortable: true,
			cell: (row) => (
				<Badge
					color=""
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
			selector: (row) => new Date(row.createdAt).toDateString(),
			sortable: true,
		},
	];

	return (
		<Card>
			<CardBody>
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
					className="display"
					noDataComponent="No blogs found."
				/>
			</CardBody>
		</Card>
	);
};

export default BlogsTable;
