import CommonModal from "@/CommonComponent/CommonModal";
import BlogModal from "@/Components/Admin/Blogs/BlogModal";
import { ExtraLargeModal } from "@/Constant";
import { BlogProps } from "@/Types/Blogs.type";
import Link from "next/link";
import { Fragment, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { ChevronsRight } from "react-feather";
import { Badge, Button, CardLink } from "reactstrap";

export const blogFilterOptions = [
	{
		name: "Category",
		options: ["Technology", "Health", "Education", "Business", "Lifestyle"],
	},
	{
		name: "Status",
		options: ["Pending", "Approved", "Rejected"],
	},
	{
		name: "Tags",
		options: [
			"React",
			"Node.js",
			"Web Development",
			"Machine Learning",
			"AI",
			"Productivity",
		],
	},
	{
		name: "Date Range",
		options: ["Last 7 Days", "Last 30 Days", "This Month", "Last Year"],
	},
	{
		name: "Author",
		options: ["John Doe", "Jane Smith", "Alice Brown", "Michael Lee"],
	},
];

export const blogTableColumns: TableColumn<BlogProps>[] = [
	{
		name: "Title",
		selector: (row) => row["title"],
		sortable: true,
		center: false,
		cell: (row) => <BlogModal item={{ title: row.title, text: row.content,status:row.status! }} />,
	},
	{
		name: "Content",
		selector: (row) => row["content"],
		sortable: true,
		center: false,
		cell: (row) => `${row.content.substring(0, 100)}...`, // Show the first 100 characters
	},
	{
		name:"Creator",
		selector: (row) => row["creatorId"]!,
		sortable: true,
		center: false,
		cell: (row) => row.creatorId,
	},
	// {
	// 	name: "Category",
	// 	selector: (row) => `${row.category}`,
	// 	sortable: true,
	// 	center: false,
	// },
	// {
	//     name: "Tags",
	//     selector: (row) => `${row.tags.join(', ')}`, // Show tags as a comma-separated list
	//     sortable: true,
	//     center: false,
	// },
	{
		name: "Status",
		selector: (row) => row["status"]!,
		sortable: true,
		center: false,
		cell: (row) => (
			<Badge
				color=""
				style={{fontSize:"12px"}}
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
	// {
	// 	name: "Created At",
	// 	selector: (row) => new Date(row.createdAt).toLocaleDateString(),
	// 	sortable: true,
	// 	center: false,
	// },
	// {
	// 	name: "Action",
	// 	sortable: true,
	// 	center: false,
	// 	cell: (row) => (
	// 		<ul className="action">
	// 			<li className="edit">
	// 				<a href={`/blogs/edit/${row.id}`}>
	// 					<i className="icon-pencil-alt" />
	// 				</a>
	// 			</li>
	// 			<li className="delete">
	// 				<a href={`/blogs/delete/${row.id}`}>
	// 					<i className="icon-trash" />
	// 				</a>
	// 			</li>
	// 		</ul>
	// 	),
	// },
];
