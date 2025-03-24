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
