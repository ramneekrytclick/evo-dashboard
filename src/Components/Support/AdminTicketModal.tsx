import { respondToTicket } from "@/app/api/admin/support";
import { getImageURL } from "@/CommonComponent/imageURL";
import { SupportTicketProps } from "@/Types/Support.type";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
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
const AdminTicketModal = ({
	modalOpen,
	toggleModal,
	selectedRow,
	fetchTickets,
}: {
	modalOpen: boolean;
	toggleModal: () => void;
	selectedRow: SupportTicketProps;
	fetchTickets: () => void;
}) => {
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
	const [responseText, setResponseText] = useState("");
	const [status, setStatus] = useState("Open");
	return (
		<Modal
			isOpen={modalOpen}
			toggle={toggleModal}
			centered>
			<ModalHeader toggle={toggleModal}>
				Respond to Ticket #{selectedRow._id}
			</ModalHeader>
			<ModalBody>
				<div className='mb-4'>
					<h6 className='fw-bold mb-3'>Ticket Details</h6>
					<p>
						<strong>Subject:</strong> {selectedRow.subject}
					</p>
					<p>
						<strong>Message:</strong> {selectedRow.message}
					</p>
					<p>
						<strong>User:</strong>
						<Link
							className='fw-bold text-dark ms-1'
							href={`/admin/users/${selectedRow.user?._id}`}>
							{selectedRow.user?.name} ({selectedRow.user?._id})
						</Link>
					</p>
					<p>
						<strong>Created At:</strong>{" "}
						{new Date(selectedRow.createdAt).toLocaleString()}
					</p>
					<p>
						<strong>Attachment:</strong>{" "}
						{selectedRow.attachment ? (
							<a
								href={getImageURL(selectedRow.attachment.replace(/\\/g, "/"))}
								target='_blank'
								rel='noopener noreferrer'
								className='text-info'>
								View Attachment
							</a>
						) : (
							<span className='text-muted'>None</span>
						)}
					</p>
				</div>
				<hr />
				<h6 className='fw-bold mb-3'>Respond</h6>
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
					color='outline-primary'
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
	);
};

export default AdminTicketModal;
