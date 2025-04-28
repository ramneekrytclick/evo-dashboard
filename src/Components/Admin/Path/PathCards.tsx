"use client";
import { getPaths } from "@/app/api/admin/path";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { PathProps } from "@/Types/Path.type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, CardBody } from "reactstrap";

import DeletePathModal from "./DeletePathModal";
import Link from "next/link";
import { customTableStyles } from "../Batches/BatchesList";
import { Edit2, Trash } from "react-feather";
import UpdatePathModal from "./UpdatePathModal";
const PathCards = () => {
	const [paths, setPaths] = useState<PathProps[]>([]);
	const [filterText, setFilterText] = useState("");
	const [deleteModal, setDeleteModal] = useState(false);
	const toggleDeleteModal = () => {
		setDeleteModal(!deleteModal);
	};
	const [updateModal, setUpdateModal] = useState(false);
	const [selectedBlogForDelete, setSelectedBlogForDelete] = useState("");
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
					<ButtonGroup>
						<Button
							color='success'
							size='sm'
							className=' p-2 d-flex  align-items-center justify-content-center'
							style={{ width: "35px", height: "35px" }}
							onClick={(e) => {
								e.stopPropagation();
								setSelectedBlogForDelete(row._id || "");
								setUpdateModal(true);
							}}>
							<Edit2 size={16} />
						</Button>
						<Button
							color='danger'
							className=' p-2 d-flex  align-items-center justify-content-center'
							style={{ width: "35px", height: "35px" }}
							onClick={() => {
								setDeleteModal(true);
								setSelectedBlogForDelete(row._id || "");
							}}>
							<Trash size={18} />
						</Button>
					</ButtonGroup>
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
					<div className='d-flex justify-content-between align-items-center'>
						<FilterComponent
							onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
								setFilterText(e.target.value)
							}
							filterText={filterText}
						/>
						<Link
							className='btn btn-primary'
							href={"/admin/paths/create-path"}>
							<i className='fa fa-plus me-2 py-1' /> {"Add Path"}
						</Link>
					</div>
					<div className='table-responsive custom-scrollbar user-datatable mt-3'>
						<DataTable
							data={filteredItems}
							columns={pathTableColumns}
							striped={true}
							fixedHeader
							pagination
							className='display'
							customStyles={customTableStyles}
						/>
					</div>
				</CardBody>
			</Card>
			{selectedBlogForDelete && deleteModal && (
				<DeletePathModal
					id={selectedBlogForDelete}
					fetchData={fetchPaths}
					modal={deleteModal}
					toggle={toggleDeleteModal}
				/>
			)}
			{updateModal && (
				<UpdatePathModal
					id={selectedBlogForDelete}
					fetchData={fetchPaths}
					modal={updateModal}
					toggle={() => setUpdateModal(!updateModal)}
				/>
			)}
		</>
	);
};

export default PathCards;
