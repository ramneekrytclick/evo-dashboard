"use client";
import {
	getAllTickets,
	getMyTickets,
	deleteTicket,
} from "@/app/api/support/support";
import { SupportTicketProps } from "@/Types/Support.type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import CreateTicketModal from "./CreateTicketModal";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Badge,
	Container,
	Spinner,
} from "reactstrap";
import Link from "next/link";
import { useAuth } from "@/app/AuthProvider";
import { toast } from "react-toastify";
import { getImageURL } from "@/CommonComponent/imageURL";
import { Trash } from "react-feather";
import AdminTicketModal from "./AdminTicketModal";

const TicketTable = () => {
	const auth = useAuth();
	const userId = auth.user?.id;
	const role = auth.user?.role;
	const [data, setData] = useState<SupportTicketProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<SupportTicketProps | null>(
		null
	);
	const [modalOpen, setModalOpen] = useState(false);

	const [loading, setLoading] = useState(true);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [ticketToDelete, setTicketToDelete] =
		useState<SupportTicketProps | null>(null);
	const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
	const toggleModal = () => setModalOpen(!modalOpen);
	const openModal = (row: SupportTicketProps) => {
		setSelectedRow(row);
		setModalOpen(true);
	};
	const handleDelete = async () => {
		if (!ticketToDelete?._id) return;
		try {
			await deleteTicket(ticketToDelete._id);
			toast.success("Ticket deleted successfully");
			toggleDeleteModal();
			fetchTickets();
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete ticket");
		}
	};
	const fetchTickets = async () => {
		setLoading(true);
		try {
			if (role === "Admin") {
				const response = await getAllTickets();
				setData(response.reverse());
			} else {
				const response = await getMyTickets(userId || "");
				setData(response.reverse());
			}
		} catch (error) {
			toast.error("Error fetching tickets!");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const attachmentCell = (row: SupportTicketProps) =>
		row.attachment ? (
			<a
				href={getImageURL(row.attachment.replace(/\\/g, "/"))}
				target='_blank'
				rel='noopener noreferrer'
				className='btn btn-sm btn-outline-info'>
				View
			</a>
		) : (
			<span className='text-muted'>—</span>
		);

	const adminSupportTableColumns: TableColumn<SupportTicketProps>[] = [
		{
			name: "Ticket ID",
			selector: (row: SupportTicketProps) => row._id || "N/A",
			sortable: true,
			cell: (row: SupportTicketProps) => (
				<Link
					onClick={() => openModal(row)}
					href={"#"}>
					{row._id}
				</Link>
			),
		},
		{
			name: "User",
			selector: (row: SupportTicketProps) =>
				row.user?.name + " (" + row.user?._id + ")",
		},
		{ name: "Subject", selector: (row) => row.subject },
		{
			name: "Message",
			cell: (row) => (
				<span title={row.message}>
					{row.message.length > 50
						? row.message.slice(0, 50) + "..."
						: row.message}
				</span>
			),
		},
		{
			name: "Attachment",
			cell: attachmentCell,
			center: true,
		},
		{
			name: "Admin Response",
			cell: (row) => (
				<span title={row.adminResponse}>
					{row.adminResponse
						? row.adminResponse.length > 50
							? `${row.adminResponse.slice(0, 50)}...`
							: row.adminResponse
						: "—"}
				</span>
			),
		},
		{
			name: "Status",
			cell: (row) => (
				<span
					style={{
						color:
							row.status === "Open"
								? "green"
								: row.status === "Resolved"
								? "orange"
								: "gray",
					}}>
					{row.status}
				</span>
			),
			center: true,
		},
		{
			name: "Created At",
			selector: (row) => new Date(row.createdAt).toLocaleString(),
			center: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<Button
					color='danger'
					size='sm'
					className=' p-2 d-flex  align-items-center justify-content-center'
					style={{ width: "35px", height: "35px" }}
					onClick={() => {
						setTicketToDelete(row);
						toggleDeleteModal();
					}}>
					<Trash size={16} />
				</Button>
			),
			ignoreRowClick: true,
			center: true,
		},
	];

	const userSupportTableColumns: TableColumn<SupportTicketProps>[] = [
		{ name: "Ticket ID", selector: (row) => row._id || "N/A" },
		{ name: "Subject", selector: (row) => row.subject },
		{
			name: "Message",
			cell: (row) => (
				<span title={row.message}>
					{row.message.length > 50
						? row.message.slice(0, 50) + "..."
						: row.message}
				</span>
			),
		},
		{
			name: "Attachment",
			cell: attachmentCell,
			center: true,
		},
		{
			name: "Response",
			cell: (row) => (
				<span title={row.adminResponse}>
					{row.adminResponse
						? row.adminResponse.length > 50
							? `${row.adminResponse.slice(0, 50)}...`
							: row.adminResponse
						: "Pending"}
				</span>
			),
		},
		{
			name: "Status",
			cell: (row) => (
				<Badge
					color={
						row.status === "Open"
							? "warning"
							: row.status === "Resolved"
							? "success"
							: "danger"
					}>
					{row.status}
				</Badge>
			),
			center: true,
		},
		{
			name: "Created At",
			selector: (row) => new Date(row.createdAt).toLocaleString(),
			center: true,
		},
	];

	useEffect(() => {
		fetchTickets();
	}, []);
	if (loading) {
		return (
			<>
				<Container className='d-flex gap-2 text-primary justify-content-center align-items-center'>
					<Spinner size={30} />
				</Container>
			</>
		);
	}
	return (
		<div
			className='table-responsive custom-scrollbar'
			style={{ cursor: "pointer" }}>
			{role !== "Admin" && <CreateTicketModal fetchData={fetchTickets} />}
			<DataTable
				columns={
					role === "Admin" ? adminSupportTableColumns : userSupportTableColumns
				}
				data={data}
				striped
				pagination
				onRowClicked={(row) => {
					setSelectedRow(row);
					toggleModal();
				}}
			/>

			{role === "Admin" && selectedRow && (
				<AdminTicketModal
					modalOpen={modalOpen}
					toggleModal={toggleModal}
					selectedRow={selectedRow}
					fetchTickets={fetchTickets}
				/>
			)}
			{deleteModalOpen && ticketToDelete && (
				<Modal
					isOpen={deleteModalOpen}
					toggle={toggleDeleteModal}
					centered>
					<ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
					<ModalBody>
						Are you sure you want to delete ticket{" "}
						<strong>{ticketToDelete._id}</strong>?
					</ModalBody>
					<ModalFooter>
						<Button
							color='outline-danger'
							onClick={toggleDeleteModal}>
							Cancel
						</Button>
						<Button
							color='danger'
							onClick={handleDelete}>
							Delete
						</Button>
					</ModalFooter>
				</Modal>
			)}
		</div>
	);
};

export default TicketTable;
