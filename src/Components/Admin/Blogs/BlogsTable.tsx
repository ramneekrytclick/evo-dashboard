"use client";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { BlogsApprovalTitle } from "@/Constant";
import { Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { BlogProps } from "@/Types/Blogs.type";
import { blogTableColumns } from "@/Data/Admin/Blogs/Blog";
import { getBlogs } from "@/app/api/admin/blogs/blog";

const BlogsTable = () => {
	const [filterText, setFilterText] = useState("");
	const [blogs, setBlogs] = useState<BlogProps[]>([]);
	const fetchBlogs = async () => {
		const response = await getBlogs();
		console.log(response.blogs);

		setBlogs(response.blogs);
		return response;
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
