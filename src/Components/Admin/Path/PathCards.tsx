"use client";
import { getPaths } from "@/app/api/admin/path";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { PathProps } from "@/Types/Path.type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";

import DeletePathModal from "./DeletePathModal";
import Link from "next/link";

const PathCards = () => {
	const [paths, setPaths] = useState<PathProps[]>([]);
	const [filterText, setFilterText] = useState("");
	const fetchPaths = async () => {
		try {
			const response = await getPaths();
			setPaths(response.paths);
			console.log(response.paths);
		} catch (error) {
			toast.error("Error in fetching paths");
		}
	};
	const filteredItems: PathProps[] = paths.filter((item: PathProps) => {
		return Object.values(item).some(
			(value) =>
				value &&
				value.toString().toLowerCase().includes(filterText.toLowerCase())
		);
	});
	const pathTableColumns: TableColumn<PathProps>[] = [
		{
			name: "Title",
			selector: (row: PathProps) => row.title || "N/A",
			sortable: true,
			wrap: true,
			cell: (row: PathProps) => (
				<Link href={`/admin/paths/${row._id}`}>{row.title}</Link>
			),
		},
		{
			name: "Description",
			selector: (row: PathProps) => row.description || "N/A",
			sortable: true,
			wrap: true,
			grow: 2,
		},
		{
			name: "Timing",
			selector: (row: PathProps) => row.timing || "-",
			sortable: true,
		},
		{
			name: "Price (₹)",
			selector: (row: PathProps) => row.price.toFixed(2),
			sortable: true,
			cell: (row: PathProps) => (
				<span className='badge bg-secondary'>₹{row.price?.toFixed(2)}</span>
			),
		},
		{
			name: "Courses Count",
			selector: (row: PathProps) => row.courses.length || 0,
			sortable: true,
			cell: (row: PathProps) => (
				<span className='badge bg-primary'>
					{row.courses.length} {row.courses.length === 1 ? "Course" : "Courses"}
				</span>
			),
		},
		{
			name: "Action",
			sortable: false,
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
			cell: (row) => (
				<ul className='action'>
					{/* <UpdatePathModal
						values={row}
						fetchData={fetchPaths}
					/> */}
					<DeletePathModal
						id={row._id!}
						fetchData={fetchPaths}
					/>
				</ul>
			),
		},
	];
	useEffect(() => {
		fetchPaths();
	}, []);
	return (
		<>
			<Card>
				<CardBody>
					<FilterComponent
						onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
							setFilterText(e.target.value)
						}
						filterText={filterText}
					/>
					<div className='table-responsive custom-scrollbar user-datatable mt-3'>
						<DataTable
							data={filteredItems}
							columns={pathTableColumns}
							striped={true}
							fixedHeader
							fixedHeaderScrollHeight='40vh'
							className='display'
						/>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default PathCards;
