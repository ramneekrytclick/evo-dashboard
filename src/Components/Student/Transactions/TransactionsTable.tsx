"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getStudentTransactions } from "@/app/api/student";
import { useAuth } from "@/app/AuthProvider";
import { toast } from "react-toastify";
import { Badge, Spinner } from "reactstrap";
import { customTableStyles } from "@/Components/Admin/Batches/BatchesList";

// Custom status badge
const renderStatus = (status: string) => {
	const color =
		status === "Paid"
			? "success"
			: status === "Pending"
			? "warning"
			: "secondary";
	return <Badge color={color}>{status}</Badge>;
};

const TransactionsTable = () => {
	const [transactions, setTransactions] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	const fetchData = async () => {
		try {
			if (user?.id) {
				const response = await getStudentTransactions(user?.id);
				setTransactions(response.transactions || []);
			}
		} catch (error) {
			toast.error("Error fetching transactions");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const columns = [
		{
			name: "Course Title",
			selector: (row: any) => row.course?.title || "—",
			wrap: true,
			sortable: true,
			center: true,
		},
		{
			name: "Amount Paid",
			selector: (row: any) => `₹${row.amount}`,
			sortable: true,
			center: true,
		},
		{
			name: "Status",
			cell: (row: any) => renderStatus(row.status),
			sortable: true,
			center: true,
		},
		{
			name: "Date",
			selector: (row: any) =>
				new Date(row.createdAt).toLocaleDateString("en-IN"),
			sortable: true,
			center: true,
		},
	];

	return (
		<>
			{loading ? (
				<div className='text-center py-5 fw-bold text-primary d-flex align-items-center justify-content-center gap-2'>
					Loading
					<Spinner color='primary' />
				</div>
			) : (
				<DataTable
					columns={columns}
					data={transactions}
					pagination
					striped
					highlightOnHover
					responsive
					customStyles={customTableStyles}
				/>
			)}
		</>
	);
};

export default TransactionsTable;
