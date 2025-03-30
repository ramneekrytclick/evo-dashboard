// BatchesList.tsx
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
	const [batches, setBatches] = useState<any[]>([]);
	const [filterText, setFilterText] = useState("");

	const [assignStudentsModalOpen, setAssignStudentsModalOpen] = useState<
		string | null
	>(null);
	const [assignMentorModalOpen, setAssignMentorModalOpen] = useState<
		string | null
	>(null);

	const [selectedBatch, setSelectedBatch] = useState<BatchProps | null>(null); // for modals
	const [selectedBatchForDetails, setSelectedBatchForDetails] =
		useState<BatchProps | null>(null); // for details modal

	const fetchBatches = async () => {
		try {
			const response = await getBatches();
			setBatches(response);
		} catch (error) {
			console.error("Error fetching batches:", error);
		}
	};

	useEffect(() => {
		fetchBatches();
	}, []);

	const filteredItems = useMemo(() => {
		return batches.filter((item) =>
			Object.values(item).some((value) =>
				value?.toString().toLowerCase().includes(filterText.toLowerCase())
			)
		);
	}, [batches, filterText]);

	const columns: TableColumn<BatchProps>[] = [
		{
			name: "Batch",
			sortable: true,
			cell: (row) => <>{row.name}</>,
		},
		{
			name: "Course",
			selector: (row) => row.course || "-",
			sortable: true,
			cell: (row) => (
				<Link href={`/admin/lessons/${row.course}`}>{row.course}</Link>
			),
		},
		{
			name: "Status",
			selector: () => "",
			sortable: false,
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
			selector: (row) => row.students?.length || 0,
			sortable: true,
			cell: (row) => <span>{row.students?.length || 0}</span>,
		},
		{
			name: "Mentor",
			selector: (row) => row.mentor || "Not Assigned",
			sortable: true,
			cell: (row) =>
				row.mentor ? (
					<Badge
						color="info"
						pill>
						{row.mentor}
					</Badge>
				) : (
					<Badge color="warning">Unassigned</Badge>
				),
		},
		{
			name: "Actions",
			cell: (row: BatchProps) => (
				<div style={{ minWidth: 200 }}>
					<Button
						color="primary"
						size="sm"
						className="mb-2 me-2"
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
			{assignStudentsModalOpen && selectedBatch?.course && (
				<AssignStudentsModal
					batchId={assignStudentsModalOpen}
					batchCourseId={selectedBatch?.course}
					isOpen={!!assignStudentsModalOpen}
					toggle={() => setAssignStudentsModalOpen(null)}
					fetchData={fetchBatches}
				/>
			)}

			{assignMentorModalOpen && selectedBatch && (
				<AssignMentorModal
					batchId={assignMentorModalOpen}
					batchCourseId={selectedBatch.course}
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
