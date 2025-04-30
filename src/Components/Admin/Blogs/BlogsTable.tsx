"use client";

import { useEffect, useState, useMemo } from "react";
import { Badge, Button, Card, CardBody } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { getBlogs, approveBlog } from "@/app/api/admin/blogs/blog";
import { BlogProps } from "@/Types/Blogs.type";
import { toast } from "react-toastify";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { customTableStyles } from "../Batches/BatchesList";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogsTable = () => {
	const [filterText, setFilterText] = useState("");
	const [blogs, setBlogs] = useState<BlogProps[]>([]);
	const navigation = useRouter();

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

	const blogTableColumns: TableColumn<BlogProps>[] = [
		{
			name: "Title",
			selector: (row) => row.title,
			sortable: true,
			wrap: true,
			cell: (row) => (
				<span
					className='p-0 text-primary fw-medium'
					style={{ cursor: "pointer" }}
					onClick={() => navigation.push(`/admin/blogs/${row.slug}`)}>
					{row.title}
				</span>
			),
		},
		{
			name: "Publisher",
			selector: (row) => row.creator?.name || "-",
			sortable: true,
			center: true,
			cell: (row) => (
				<Link
					href={`/admin/users/${row.creator?._id}`}
					className='text-dark fw-medium'>
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
			name: "Published At",
			center: true,
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
					className='display'
					noDataComponent='No blogs found.'
					customStyles={customTableStyles}
				/>
			</CardBody>
		</Card>
	);
};

export default BlogsTable;
