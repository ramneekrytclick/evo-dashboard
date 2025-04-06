"use client";
import { getAllTickets, getMyTickets } from "@/app/api/support/support";
import { SupportTicketProps } from "@/Types/Support.type";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
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

	const toggleModal = () => setModalOpen(!modalOpen);

	const openModal = (row: SupportTicketProps) => {
		setSelectedRow(row);
		setResponseText(row.adminResponse || "");
		setStatus(row.status || "Open");
		setModalOpen(true);
	};

	const fetchTickets = async () => {
		try {
			if (role === "Admin") {
				const response = await getAllTickets();
				setData(response);
			} else {
				const response = await getMyTickets(userId || "");
				setData(response);
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

	const adminSupportTableColumns = [
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
			sortable: true,
		},
		{
			name: "Subject",
			selector: (row: SupportTicketProps) => row.subject,
			sortable: true,
		},
		{
			name: "Message",
			cell: (row: SupportTicketProps) => (
				<span title={row.message}>
					{row.message.length > 50
						? `${row.message.slice(0, 50)}...`
						: row.message}
				</span>
			),
		},
		{
			name: "Admin Response",
			cell: (row: SupportTicketProps) => (
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
			cell: (row: SupportTicketProps) => (
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
			sortable: true,
			center: true,
		},
		{
			name: "Created At",
			selector: (row: SupportTicketProps) =>
				new Date(row.createdAt).toLocaleString(),
			sortable: true,
			center: true,
		},
	];

	const userSupportTableColumns = [
		{
			name: "Ticket ID",
			selector: (row: SupportTicketProps) => row._id || "N/A",
			sortable: true,
		},
		{
			name: "Subject",
			selector: (row: SupportTicketProps) => row.subject,
			sortable: true,
		},
		{
			name: "Message",
			cell: (row: SupportTicketProps) => (
				<span title={row.message}>
					{row.message.length > 50
						? `${row.message.slice(0, 50)}...`
						: row.message}
				</span>
			),
		},
		{
			name: "Response",
			cell: (row: SupportTicketProps) => (
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
			cell: (row: SupportTicketProps) => (
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
			sortable: true,
			center: true,
		},
		{
			name: "Created At",
			selector: (row: SupportTicketProps) =>
				new Date(row.createdAt).toLocaleString(),
			sortable: true,
			center: true,
		},
	];

	useEffect(() => {
		fetchTickets();
	}, []);

	return (
		<div className="table-responsive custom-scrollbar">
			<CreateTicketModal fetchData={fetchTickets} />
			<DataTable
				columns={
					role === "Admin" ? adminSupportTableColumns : userSupportTableColumns
				}
				data={data}
				striped
				pagination
			/>

			{/* Admin modal only */}
			{role === "Admin" && (
				<Modal
					isOpen={modalOpen}
					toggle={toggleModal}
					centered>
					<ModalHeader toggle={toggleModal}>
						Respond to Ticket #{selectedRow?._id}
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for="responseText">Admin Response</Label>
								<Input
									id="responseText"
									type="textarea"
									value={responseText}
									onChange={(e) => setResponseText(e.target.value)}
									placeholder="Write your response here..."
								/>
							</FormGroup>
							<FormGroup>
								<Label for="statusSelect">Ticket Status</Label>
								<Input
									type="select"
									id="statusSelect"
									value={status}
									onChange={(e) => setStatus(e.target.value)}>
									<option value="Open">Open</option>
									<option value="In Progress">In Progress</option>
									<option value="Resolved">Resolved</option>
								</Input>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button
							color="secondary"
							onClick={toggleModal}>
							Cancel
						</Button>
						<Button
							color="primary"
							onClick={handleAction}>
							Submit Response
						</Button>
					</ModalFooter>
				</Modal>
			)}
		</div>
	);
};

export default TicketTable;
