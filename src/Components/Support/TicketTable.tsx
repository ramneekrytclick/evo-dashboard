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
	Form,
	FormGroup,
	Input,
	Label,
} from "reactstrap";
import Link from "next/link";
import { respondToTicket } from "@/app/api/admin/support";
import { useAuth } from "@/app/AuthProvider";
import { toast } from "react-toastify";
import { getImageURL } from "@/CommonComponent/imageURL";

const TicketTable = () => {
	const auth = useAuth();
	const userId = auth.user?.id;
	const role = auth.user?.role;
	const [data, setData] = useState<SupportTicketProps[]>([]);
	const [selectedRow, setSelectedRow] = useState<SupportTicketProps | null>(
		null
	);
	const [modalOpen, setModalOpen] = useState(false);
	const [responseText, setResponseText] = useState("");
	const [status, setStatus] = useState("Open");

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [ticketToDelete, setTicketToDelete] =
		useState<SupportTicketProps | null>(null);

	const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
	const toggleModal = () => setModalOpen(!modalOpen);
	const openModal = (row: SupportTicketProps) => {
		setSelectedRow(row);
		setResponseText(row.adminResponse || "");
		setStatus(row.status || "Open");
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
		}
	};

	const handleAction = async () => {
		if (!selectedRow) return;
		try {
			await respondToTicket(selectedRow._id || "", status, responseText);
			toggleModal();
			toast.success("Ticket responded successfully!");
			fetchTickets();
		} catch (error) {
			console.error("Error responding to ticket:", error);
			toast.error("Error responding to ticket!");
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
					onClick={() => {
						setTicketToDelete(row);
						toggleDeleteModal();
					}}>
					Delete
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
	];

	useEffect(() => {
		fetchTickets();
	}, []);

	return (
		<div className='table-responsive custom-scrollbar'>
			{role !== "Admin" && <CreateTicketModal fetchData={fetchTickets} />}
			<DataTable
				columns={
					role === "Admin" ? adminSupportTableColumns : userSupportTableColumns
				}
				data={data}
				striped
				pagination
			/>

			{role === "Admin" && selectedRow && (
				<Modal
					isOpen={modalOpen}
					toggle={toggleModal}
					centered>
					<ModalHeader toggle={toggleModal}>
						Respond to Ticket #{selectedRow._id}
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for='responseText'>Admin Response</Label>
								<Input
									id='responseText'
									type='textarea'
									value={responseText}
									onChange={(e) => setResponseText(e.target.value)}
									placeholder='Write your response here...'
								/>
							</FormGroup>
							<FormGroup>
								<Label for='statusSelect'>Ticket Status</Label>
								<Input
									type='select'
									id='statusSelect'
									value={status}
									onChange={(e) => setStatus(e.target.value)}>
									<option value='Open'>Open</option>
									<option value='In Progress'>In Progress</option>
									<option value='Resolved'>Resolved</option>
								</Input>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button
							color='secondary'
							onClick={toggleModal}>
							Cancel
						</Button>
						<Button
							color='primary'
							onClick={handleAction}>
							Submit Response
						</Button>
					</ModalFooter>
				</Modal>
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
							color='secondary'
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
