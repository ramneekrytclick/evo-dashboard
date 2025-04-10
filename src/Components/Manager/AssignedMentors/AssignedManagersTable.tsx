"use client";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getMentorStats, getMyMentors } from "@/app/api/managers";
import { Card, Input, Spinner, Alert } from "reactstrap";

const AssignedManagersTable = () => {
	const [managers, setManagers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState("");

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await getMyMentors();
			setManagers(response.assignedMentors);
			setLoading(false);
		} catch (error: any) {
			setError("Failed to fetch mentors.");
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const columns = [
		{
			name: "Photo",
			selector: (row: any) => row.photo,
			cell: (row: any) => (
				<img
					src={`/${row.photo}`}
					alt={row.name}
					style={{ width: "40px", height: "40px", borderRadius: "50%" }}
				/>
			),
			width: "80px",
		},
		{
			name: "Name",
			selector: (row: any) => row.name,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row: any) => row.email,
		},
		{
			name: "Expertise",
			selector: (row: any) => row.expertise || "N/A",
		},
		{
			name: "Working Mode",
			selector: (row: any) => row.workingMode || "N/A",
		},
		{
			name: "Status",
			selector: (row: any) => row.status,
			cell: (row: any) => (
				<span
					className={`badge bg-${
						row.status === "Active" ? "success" : "secondary"
					}`}>
					{row.status}
				</span>
			),
		},
		{
			name: "Approved",
			selector: (row: any) => row.isApproved,
			cell: (row: any) => (
				<span className={`badge bg-${row.isApproved ? "primary" : "danger"}`}>
					{row.isApproved ? "Yes" : "No"}
				</span>
			),
		},
	];

	// Filtered data
	const filteredData = managers.filter(
		(mentor: any) =>
			mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			mentor.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<Card className="p-3">
			<h5 className="mb-3">Assigned Mentors</h5>

			<Input
				type="text"
				placeholder="Search by name or email..."
				className="mb-3"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>

			{error && <Alert color="danger">{error}</Alert>}

			{loading ? (
				<div className="text-center">
					<Spinner />
				</div>
			) : (
				<DataTable
					columns={columns}
					data={filteredData}
					pagination
					responsive
					highlightOnHover
					noDataComponent="No mentors found"
				/>
			)}
		</Card>
	);
};

export default AssignedManagersTable;
