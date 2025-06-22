"use client";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
	getTransactions,
	confirmTransaction,
} from "@/app/api/admin/transactions";
import {
	Card,
	CardBody,
	Row,
	Col,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReusableDataTable from "@/CommonComponent/Table";

interface Transaction {
	_id: string;
	amount: number;
	course: {
		title: string;
	};
	user: {
		name: string;
		email: string;
	};
	createdAt: string;
	status: "Pending" | "Paid" | "Failed";
}

const TransactionsData = ({
	fetchData,
	data,
	setData,
	loading,
	setLoading,
}: {
	fetchData: any;
	data: any;
	setData: any;
	loading: boolean;
	setLoading: any;
}) => {
	const [error, setError] = useState<string | null>(null);
	const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
	const [modalOpen, setModalOpen] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [confirmingId, setConfirmingId] = useState<string | null>(null);

	useEffect(() => {
		fetchData();
	}, []);

	const handleRowClick = (row: any) => {
		setSelectedTransaction(row);
		setModalOpen(true);
	};

	const closeModal = () => {
		setSelectedTransaction(undefined);
		setModalOpen(false);
	};

	const openConfirmModal = (id: string) => {
		setConfirmingId(id);
		setConfirmModalOpen(true);
	};

	const closeConfirmModal = () => {
		setConfirmingId(null);
		setConfirmModalOpen(false);
		fetchData();
	};

	const handleConfirmPayment = async () => {
		if (!confirmingId) return;
		try {
			await confirmTransaction(confirmingId);
			toast.success("Payment confirmed successfully!");
		} catch (error) {
			toast.error("Error marking Paid");
		} finally {
			closeConfirmModal();
		}

		closeConfirmModal();
	};

	const columns = [
		{
			name: "User",
			selector: (row: any) => row.user?.name || "Guest User",
			sortable: true,
		},
		{
			name: "Course",
			center: true,
			selector: (row: any) => row.course?.title || row.path?.name || "N/A",
		},
		{
			name: "Amount (₹)",
			center: true,
			selector: (row: any) => `₹${row.amount}`,
			sortable: true,
		},
		{
			name: "Status",
			center: true,
			cell: (row: any) => (
				<Badge
					color={
						row.status === "Paid"
							? "success"
							: row.status === "Pending"
							? "warning"
							: "danger"
					}>
					{row.status}
				</Badge>
			),
		},
		{
			name: "Actions",
			right: true,
			cell: (row: any) => (
				<Button
					color='primary'
					size='sm'
					disabled={row.status === "Paid"}
					onClick={() => openConfirmModal(row._id)}>
					Confirm Payment
				</Button>
			),
		},
	];

	return (
		<>
			<Row>
				<Col sm={12}>
					<Card>
						<CardBody>
							{error ? (
								<p className='text-danger'>{error}</p>
							) : (
								<ReusableDataTable
									columns={columns}
									data={data}
									pagination
									striped
									highlightOnHover
									onRowClicked={handleRowClick}
									loading={loading}
									pointerOnHover
								/>
							)}
						</CardBody>
					</Card>
				</Col>
			</Row>

			{/* Transaction Detail Modal */}
			<Modal
				isOpen={modalOpen}
				toggle={closeModal}
				centered
				size='lg'>
				<ModalHeader toggle={closeModal}>Transaction Details</ModalHeader>
				<ModalBody>
					{selectedTransaction && (
						<>
							<p>
								<strong>User:</strong>{" "}
								{selectedTransaction.user?.name || "Guest"} (
								{selectedTransaction.user?.email || "N/A"})
							</p>
							<p>
								<strong>Course:</strong>{" "}
								{selectedTransaction.course?.title || "N/A"}
							</p>
							<p>
								<strong>Amount Paid:</strong> ₹{selectedTransaction.amount}
							</p>
							<p>
								<strong>Status:</strong>{" "}
								<Badge
									color={
										selectedTransaction.status === "Paid"
											? "success"
											: selectedTransaction.status === "Pending"
											? "warning"
											: "danger"
									}>
									{selectedTransaction.status}
								</Badge>
							</p>
							<p>
								<strong>Date:</strong>{" "}
								{new Date(selectedTransaction.createdAt).toLocaleString()}
							</p>
						</>
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={closeModal}>
						Close
					</Button>
				</ModalFooter>
			</Modal>

			{/* Confirmation Modal */}
			<Modal
				isOpen={confirmModalOpen}
				toggle={closeConfirmModal}
				centered>
				<ModalHeader toggle={closeConfirmModal}>Confirm Payment</ModalHeader>
				<ModalBody>
					Are you sure you want to mark this transaction as <b>Paid</b>?
				</ModalBody>
				<ModalFooter>
					<Button
						color='success'
						onClick={handleConfirmPayment}>
						Yes, Confirm
					</Button>
					<Button
						color='outline-danger'
						onClick={closeConfirmModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default TransactionsData;
