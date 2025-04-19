"use client";

import { useEffect, useState, useMemo } from "react";
import {
	Card,
	CardBody,
	Button,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";

import { deleteBatch, getBatches } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import CreateBatchModal from "../CreateBatchModal";
import FilterComponent from "@/CommonComponent/FilterComponent";
import AssignStudentsModal from "./AssignStudents";
import AssignMentorModal from "./AssignMentor";
import BatchDetails from "./BatchDetails";
import Link from "next/link";
import { FontSizeTitle } from "@/Constant";
import { toast } from "react-toastify";
import { Trash, Trash2 } from "react-feather";

const BatchesList = () => {
	const [batches, setBatches] = useState<BatchProps[]>([]);
	const [filterText, setFilterText] = useState("");

	const [assignStudentsModalOpen, setAssignStudentsModalOpen] = useState<
		string | null
	>(null);
	const [assignMentorModalOpen, setAssignMentorModalOpen] = useState<
		string | null
	>(null);
	const [selectedBatch, setSelectedBatch] = useState<BatchProps | null>(null);
	const [selectedBatchForDetails, setSelectedBatchForDetails] =
		useState<BatchProps | null>(null);
	const [deleteBatchModalOpen, setDeleteBatchModalOpen] = useState(false);
	const [batchToDelete, setBatchToDelete] = useState<BatchProps | null>(null);
	const [confirmBatchName, setConfirmBatchName] = useState("");
	const fetchBatches = async () => {
		try {
			const response = await getBatches();
			setBatches(response.batches.reverse() || []);
		} catch (error) {
			console.error("Error fetching batches:", error);
		}
	};

	useEffect(() => {
		fetchBatches();
	}, []);
	const customTableStyles = {
		rows: { style: { fontSize: "1rem" } },
		headCells: { style: { fontSize: "1.05rem", fontWeight: "600" } },
		cells: { style: { fontSize: "1rem" } },
	};
	const filteredItems = useMemo(() => {
		return batches.filter((item) =>
			Object.values(item).some((value) => {
				if (typeof value === "string") {
					return value.toLowerCase().includes(filterText.toLowerCase());
				}
				if (typeof value === "object" && value !== null) {
					return JSON.stringify(value)
						.toLowerCase()
						.includes(filterText.toLowerCase());
				}
				return false;
			})
		);
	}, [batches, filterText]);
	const columns: TableColumn<BatchProps>[] = [
		{
			name: "Batch",
			sortable: true,
			selector: (row) => row.name || "",
		},
		{
			name: "Course",
			center: true,
			sortable: true,
			selector: (row) =>
				typeof row.course === "object" ? row.course?.title : row.course || "-",
			cell: (row) =>
				row.course ? (
					<Link
						className='text-center'
						href={`/admin/course/${
							typeof row.course === "object" ? row.course._id : row.course
						}`}>
						{typeof row.course === "object" ? row.course.title : row.course}
					</Link>
				) : (
					<span>—</span>
				),
		},
		{
			name: "Status",
			selector: () => "",
			center: true,
			cell: (row) => {
				const now = new Date();
				const end = new Date(row.endDate || 0);
				const isActive = end > now;
				return (
					<Badge color={isActive ? "warning" : "success"}>
						{isActive ? "Ongoing" : "Completed"}
					</Badge>
				);
			},
		},
		{
			name: "Students",
			center: true,
			sortable: true,
			selector: (row) => row.students?.length || 0,
			cell: (row) => <span>{row.students?.length || 0}</span>,
		},
		{
			name: "Mentor",
			sortable: true,
			selector: (row) =>
				typeof row.mentor === "object"
					? row.mentor.name
					: row.mentor || "Unassigned",
			center: true,
			cell: (row) =>
				row.mentor ? (
					<span
						style={{
							fontSize: "13px",
							fontWeight: 500,
							color: "ActiveBorder",
						}}>
						{typeof row.mentor === "object" ? row.mentor.name : row.mentor}
					</span>
				) : (
					<Badge color='warning'>Unassigned</Badge>
				),
		},
		{
			name: "Actions",
			center: true,
			width: "15%",
			cell: (row: BatchProps) => (
				<div
					className='d-flex flex-column gap-1 align-items-center justify-content-center'
					style={{ minWidth: 200 }}>
					<Button
						color='primary'
						onClick={(e) => {
							e.stopPropagation(); // Prevent row click
							setAssignStudentsModalOpen(row._id || "");
							setSelectedBatch(row);
						}}>
						Assign Students
					</Button>
					<Button
						color='success'
						onClick={(e) => {
							e.stopPropagation(); // Prevent row click
							setAssignMentorModalOpen(row._id || "");
							setSelectedBatch(row);
						}}>
						Assign Mentor
					</Button>
				</div>
			),
			ignoreRowClick: true,
			button: true,
		},
		{
			name: "Delete",
			center: true,
			cell: (row: BatchProps) => {
				const now = new Date();
				const end = new Date(row.endDate || 0);
				const isActive = end > now;

				return (
					<div className='d-flex flex-column align-items-center'>
						<Button
							color='danger'
							size='sm'
							id={`delete-btn-${row._id}`}
							disabled={isActive}
							onClick={(e) => {
								e.stopPropagation();
								setBatchToDelete(row);
								setDeleteBatchModalOpen(true);
								setConfirmBatchName("");
							}}>
							<Trash2 size={16} />
						</Button>
						{isActive && (
							<Badge
								color='light'
								className='text-danger mt-1'
								style={{ fontSize: "11px" }}>
								Ongoing
							</Badge>
						)}
					</div>
				);
			},
			ignoreRowClick: true,
			button: true,
		},
	];

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
						<CreateBatchModal fetchData={fetchBatches} />
					</div>
					<div className='table-responsive custom-scrollbar user-datatable mt-3'>
						<DataTable
							data={filteredItems}
							columns={columns}
							striped
							pagination
							fixedHeader
							persistTableHead
							className='display'
							noDataComponent='No batches found.'
							onRowClicked={(row, e) => {
								if ((e.target as HTMLElement).closest("button")) return; // block modal if button clicked
								setSelectedBatchForDetails(row);
							}}
							highlightOnHover
							customStyles={customTableStyles}
							pointerOnHover
						/>
					</div>
				</CardBody>
			</Card>

			{/* Modals */}
			{assignStudentsModalOpen && selectedBatch && (
				<AssignStudentsModal
					batchId={assignStudentsModalOpen}
					batchCourseId={
						typeof selectedBatch.course === "object"
							? selectedBatch.course?._id ?? ""
							: selectedBatch.course ?? ""
					}
					isOpen={!!assignStudentsModalOpen}
					toggle={() => setAssignStudentsModalOpen(null)}
					fetchData={fetchBatches}
					currentStudents={
						Array.isArray(selectedBatch.students) ? selectedBatch.students : []
					}
				/>
			)}

			{assignMentorModalOpen && selectedBatch && (
				<AssignMentorModal
					batchId={assignMentorModalOpen}
					batchCourseId={
						typeof selectedBatch.course === "object"
							? selectedBatch.course?._id ?? ""
							: selectedBatch.course ?? ""
					}
					isOpen={!!assignMentorModalOpen}
					toggle={() => setAssignMentorModalOpen(null)}
					fetchData={fetchBatches}
					currentMentor={
						typeof selectedBatch.mentor === "object"
							? selectedBatch.mentor?._id ?? ""
							: selectedBatch.mentor ?? ""
					}
				/>
			)}

			{selectedBatchForDetails && (
				<BatchDetails
					batch={selectedBatchForDetails}
					isOpen={!!selectedBatchForDetails}
					toggle={() => setSelectedBatchForDetails(null)}
				/>
			)}

			<Modal
				isOpen={deleteBatchModalOpen}
				toggle={() => setDeleteBatchModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setDeleteBatchModalOpen(false)}>
					Confirm Delete Batch
				</ModalHeader>
				<ModalBody>
					<p>
						To confirm deletion of batch <strong>{batchToDelete?.name}</strong>,
						please type its name below:
					</p>
					<input
						type='text'
						className='form-control mt-2'
						placeholder='Enter batch name'
						value={confirmBatchName}
						onChange={(e) => setConfirmBatchName(e.target.value)}
					/>
					<p className='text-danger mt-3 mb-0'>
						This will delete the batch, its student links, and mentor
						assignments.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary'
						onClick={() => setDeleteBatchModalOpen(false)}>
						Cancel
					</Button>
					<Button
						color='danger'
						disabled={confirmBatchName !== batchToDelete?.name}
						onClick={async () => {
							try {
								await deleteBatch(batchToDelete?._id || "");
								toast.success("Batch deleted successfully");
								setDeleteBatchModalOpen(false);
								setBatchToDelete(null);
								fetchBatches();
							} catch (err) {
								toast.error("Failed to delete batch");
							}
						}}>
						Delete
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default BatchesList;
