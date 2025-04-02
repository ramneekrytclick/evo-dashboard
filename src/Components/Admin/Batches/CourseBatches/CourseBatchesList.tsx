"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Badge, Card, CardBody } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";

import { getBatchesByCourse } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import FilterComponent from "@/CommonComponent/FilterComponent";
import AssignStudentsModal from "../BatchesList/AssignStudents";
import AssignMentorModal from "../BatchesList/AssignMentor";
import BatchDetails from "../BatchesList/BatchDetails";

const formatDate = (date: string) =>
	new Date(date).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

const CourseBatchesList = ({ id }: { id: string }) => {
	const [batches, setBatches] = useState<BatchProps[]>([]);
	const [filterText, setFilterText] = useState("");

	const [selectedBatchForDetails, setSelectedBatchForDetails] =
		useState<BatchProps | null>(null);

	const [assignStudentsModalOpen, setAssignStudentsModalOpen] = useState<
		string | null
	>(null);
	const [assignMentorModalOpen, setAssignMentorModalOpen] = useState<
		string | null
	>(null);
	const [selectedBatch, setSelectedBatch] = useState<BatchProps | null>(null);

	const fetchBatches = async () => {
		try {
			const response = await getBatchesByCourse(id);
			setBatches(response?.batches || []);
		} catch (error) {
			console.error("Error fetching course batches:", error);
		}
	};

	useEffect(() => {
		fetchBatches();
	}, [id]);

	const filteredItems = useMemo(() => {
		return batches.filter((item) =>
			Object.values(item).some(
				(value) =>
					typeof value === "string" &&
					value.toLowerCase().includes(filterText.toLowerCase())
			)
		);
	}, [batches, filterText]);

	const columns: TableColumn<BatchProps>[] = [
		{
			name: "Batch",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Course",
			selector: (row) =>
				typeof row.course === "object" && row.course?.title
					? row.course.title
					: "-",
			sortable: true,
			cell: (row) => (
				<Link
					href={`/admin/lessons/${
						typeof row.course === "object" ? row.course._id : ""
					}`}>
					{typeof row.course === "object" && row.course?.title
						? row.course.title
						: "-"}
				</Link>
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
		},
		{
			name: "Mentor",
			sortable: true,
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
			cell: (row) => (
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
			allowOverflow: true,
			button: true,
		},
	];

	return (
		<div>
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
							highlightOnHover
							pointerOnHover
							onRowClicked={(row) => setSelectedBatchForDetails(row)}
						/>
					</div>
				</CardBody>
			</Card>

			{/* Modals */}
			{assignStudentsModalOpen && selectedBatch?.course && (
				<AssignStudentsModal
					batchId={assignStudentsModalOpen}
					batchCourseId={
						typeof selectedBatch.course === "object"
							? selectedBatch.course._id
							: selectedBatch.course
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

export default CourseBatchesList;
