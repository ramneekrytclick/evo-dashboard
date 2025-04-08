"use client";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { BlogsApprovalTitle } from "@/Constant";
import { Badge, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { BlogProps } from "@/Types/Blogs.type";
import { getBlogs } from "@/app/api/admin/blogs/blog";
import BlogModal from "./BlogModal";

const BlogsTable = () => {
	const [filterText, setFilterText] = useState("");
	const [blogs, setBlogs] = useState<BlogProps[]>([]);
	const blogTableColumns: TableColumn<BlogProps>[] = [
		{
			name: "Title",
			selector: (row) => row["title"],
			sortable: true,
			center: false,
			cell: (row) => (
				<BlogModal
					fetchData={fetchBlogs}
					item={{
						id: row._id!,
						title: row.title,
						text: row.content,
						status: row.status!,
					}}
				/>
			),
		},
		{
			name: "Content",
			selector: (row) => row["content"],
			sortable: true,
			center: false,
			cell: (row) => `${row.content.substring(0, 100)}...`,
		},
		{
			name: "Creator",
			sortable: true,
			center: false,
			cell: (row) => row.creator,
		},
		{
			name: "Status",
			selector: (row) => row["status"]!,
			sortable: true,
			center: false,
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
			selector: (row) => new Date(row.createdAt!).toDateString(),
			sortable: true,
			center: false,
		},
	];
	const fetchBlogs = async () => {
		try {
			const response = await getBlogs();
			console.log(response?.blogs);
			setBlogs(response.blogs);
			return response;
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchBlogs();
	}, []);
	const filteredItems: BlogProps[] = blogs.filter((item: BlogProps) => {
		return Object.values(item).some(
			(value) =>
				value &&
				value.toString().toLowerCase().includes(filterText.toLowerCase())
		);
	});
	return (
		<Card>
			<CommonCardHeader
				headClass="pb-0 card-no-border"
				title={BlogsApprovalTitle}
			/>
			<CardBody>
				<FilterComponent
					onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFilterText(e.target.value)
					}
					filterText={filterText}
				/>
				<div className="table-responsive custom-scrollbar user-datatable mt-3">
					<DataTable
						data={filteredItems}
						columns={blogTableColumns}
						striped={true}
						fixedHeader
						fixedHeaderScrollHeight="40vh"
						className="display"
					/>
				</div>
			</CardBody>
		</Card>
	);
};

export default BlogsTable;
