"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardBody, Button, Badge } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";

import { getBatches } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import CreateBatchModal from "../CreateBatchModal";
import FilterComponent from "@/CommonComponent/FilterComponent";
import AssignStudentsModal from "./AssignStudents";
import AssignMentorModal from "./AssignMentor";
import BatchDetails from "./BatchDetails";
import Link from "next/link";

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

	const fetchBatches = async () => {
		try {
			const response = await getBatches();
			setBatches(response.batches || []);
		} catch (error) {
			console.error("Error fetching batches:", error);
		}
	};

	useEffect(() => {
		fetchBatches();
	}, []);

	const filteredItems = useMemo(() => {
		return batches.filter((item) =>
			Object.values(item).some((value) => {
				if (typeof value === "string") {
					return value.toLowerCase().includes(filterText.toLowerCase());
				}
				if (typeof value === "object" && value !== null) {
					return Object.values(value)
						.join(" ")
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
			selector: (row) => row.name,
		},
		{
			name: "Course",
			sortable: true,
			selector: (row) =>
				typeof row.course === "object" ? row.course.title : row.course || "-",
			cell: (row) =>
				row.course ? (
					<Link
						href={`/admin/lessons/${
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
			cell: (row) => {
				const now = new Date();
				const end = new Date(row.endDate);
				const isActive = end > now;
				return (
					<Badge color={isActive ? "success" : "secondary"}>
						{isActive ? "Ongoing" : "Completed"}
					</Badge>
				);
			},
		},
		{
			name: "Students",
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
			cell: (row) =>
				row.mentor ? (
					<Badge
						color="info"
						pill>
						{typeof row.mentor === "object" ? row.mentor.name : row.mentor}
					</Badge>
				) : (
					<Badge color="warning">Unassigned</Badge>
				),
		},
		{
			name: "Actions",
			cell: (row: BatchProps) => (
				<div
					className="d-flex flex-column gap-1"
					style={{ minWidth: 200 }}>
					<Button
						color="primary"
						size="sm"
						onClick={() => {
							setAssignStudentsModalOpen(row._id || "");
							setSelectedBatch(row);
						}}>
						Assign Students
					</Button>
					<Button
						color="success"
						size="sm"
						onClick={() => {
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
	];

	return (
		<div>
			<CreateBatchModal fetchData={fetchBatches} />
			<Card>
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
							columns={columns}
							striped
							pagination
							fixedHeader
							persistTableHead
							className="display"
							noDataComponent="No batches found."
							onRowClicked={(row) => setSelectedBatchForDetails(row)}
							highlightOnHover
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
							? selectedBatch.course._id || ""
							: selectedBatch.course || ""
					}
					isOpen={!!assignStudentsModalOpen}
					toggle={() => setAssignStudentsModalOpen(null)}
					fetchData={fetchBatches}
				/>
			)}

			{assignMentorModalOpen && selectedBatch && (
				<AssignMentorModal
					batchId={assignMentorModalOpen}
					batchCourseId={
						typeof selectedBatch.course === "object"
							? selectedBatch.course._id
							: selectedBatch.course
					}
					isOpen={!!assignMentorModalOpen}
					toggle={() => setAssignMentorModalOpen(null)}
					fetchData={fetchBatches}
				/>
			)}

			{selectedBatchForDetails && (
				<BatchDetails
					batch={selectedBatchForDetails}
					isOpen={!!selectedBatchForDetails}
					toggle={() => setSelectedBatchForDetails(null)}
				/>
			)}
		</div>
	);
};

export default BatchesList;
