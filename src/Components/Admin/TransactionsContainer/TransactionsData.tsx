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
	Spinner,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
			name: "#",
			cell: (_row: any, index: number) => index + 1,
			width: "60px",
		},
		{
			name: "User",
			selector: (row: any) => row.user?.name || "Guest User",
			sortable: true,
		},
		{
			name: "Course / Path",
			selector: (row: any) => row.course?.title || row.path?.name || "N/A",
		},
		{
			name: "Amount (₹)",
			selector: (row: any) => `₹${row.amount}`,
			sortable: true,
		},
		{
			name: "Status",
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
			<ToastContainer position='top-right' />
			<Row>
				<Col sm={12}>
					<Card>
						<CardBody>
							<h5 className='mb-4 fw-bold'>Transaction History</h5>

							{loading ? (
								<div className='text-center'>
									<Spinner color='primary' />
								</div>
							) : error ? (
								<p className='text-danger'>{error}</p>
							) : (
								<DataTable
									columns={columns}
									data={data}
									pagination
									striped
									highlightOnHover
									onRowClicked={handleRowClick}
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
