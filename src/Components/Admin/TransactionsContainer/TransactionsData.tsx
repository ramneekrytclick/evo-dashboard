"use client";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getTransactions } from "@/app/api/admin/transactions";
import {
	Card,
	CardBody,
	Row,
	Col,
	Badge,
	Spinner,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "reactstrap";

const columns = [
	{
		name: "#",
		cell: (_row: any, index: number) => index + 1,
		width: "60px",
	},
	{
		name: "User",
		selector: (row: any) => row.user?.name || "N/A",
		sortable: true,
	},
	{
		name: "Course / Path",
		selector: (row: any) => row.course?.name || row.path?.name || "N/A",
	},
	{
		name: "Amount (₹)",
		selector: (row: any) => `₹${row.amount}`,
		sortable: true,
	},
	{
		name: "Status",
		cell: (row: any) => (
			<Badge color={row.status === "Completed" ? "success" : "warning"}>
				{row.status}
			</Badge>
		),
	},
];

const TransactionsData = () => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const fetchData = async () => {
		try {
			const response = await getTransactions();
			setData(response);
		} catch (err) {
			setError("Failed to fetch transactions.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleRowClick = (row: any) => {
		setSelectedTransaction(row);
		setModalOpen(true);
	};

	const closeModal = () => {
		setSelectedTransaction(null);
		setModalOpen(false);
	};

	return (
		<>
			<Row>
				<Col sm={12}>
					<Card>
						<CardBody>
							<h5 className="mb-4 fw-bold">Transaction History</h5>

							{loading ? (
								<div className="text-center">
									<Spinner color="primary" />
								</div>
							) : error ? (
								<p className="text-danger">{error}</p>
							) : (
								<DataTable
									columns={columns}
									data={data}
									pagination
									striped
									highlightOnHover
									onRowClicked={handleRowClick}
									defaultSortFieldId={1}
								/>
							)}
						</CardBody>
					</Card>
				</Col>
			</Row>

			{/* ✅ Modal for Detailed View */}
			<Modal
				isOpen={modalOpen}
				toggle={closeModal}
				centered
				size="lg">
				<ModalHeader toggle={closeModal}>Transaction Details</ModalHeader>
				<ModalBody>
					{selectedTransaction && (
						<>
							<p>
								<strong>User:</strong> {selectedTransaction.user?.name} (
								{selectedTransaction.user?.email})
							</p>
							<p>
								<strong>Course:</strong>{" "}
								{selectedTransaction.course?.name ||
									selectedTransaction.path?.name ||
									"N/A"}
							</p>
							<p>
								<strong>Amount Paid:</strong> ₹{selectedTransaction.amount}
							</p>
							<p>
								<strong>Original Price:</strong> ₹
								{selectedTransaction.originalAmount}
							</p>
							<p>
								<strong>Discount Applied:</strong>{" "}
								{selectedTransaction.discountApplied}%
							</p>
							<p>
								<strong>Promo Code:</strong>{" "}
								{selectedTransaction.promoCode || "-"}
							</p>
							<p>
								<strong>Payment Method:</strong>{" "}
								{selectedTransaction.paymentMethod}
							</p>
							<p>
								<strong>Status:</strong>{" "}
								<Badge
									color={
										selectedTransaction.status === "Completed"
											? "success"
											: "warning"
									}>
									{selectedTransaction.status}
								</Badge>
							</p>
							<p>
								<strong>Date:</strong>{" "}
								{new Date(selectedTransaction.transactionDate).toLocaleString()}
							</p>
						</>
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						onClick={closeModal}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default TransactionsData;
