"use client";

import { useEffect, useState } from "react";
import {
	getBookedSessions,
	updateBookingStatus,
	replyToSessionBooking,
	deleteBookedSession,
} from "@/app/api/mentor";
import { useAuth } from "@/app/AuthProvider";
import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	Row,
	Col,
	Button,
	Input,
	Spinner,
	FormGroup,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge,
} from "reactstrap";
import { toast } from "react-toastify";
import { Trash2 } from "react-feather";

const ScheduledSessions = () => {
	const [sessions, setSessions] = useState<any[]>([]);
	const { user } = useAuth();
	const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
	const [statusUpdates, setStatusUpdates] = useState<{ [key: string]: string }>(
		{}
	);
	const [replies, setReplies] = useState<{ [key: string]: string }>({});
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [sessionToDelete, setSessionToDelete] = useState<any>(null);

	const fetchSessions = async () => {
		try {
			const response = await getBookedSessions(user?.id || "");
			setSessions(response.reverse());
		} catch (error) {
			console.error(error);
			toast.error("Failed to load sessions.");
		}
	};

	const handleStatusChange = (bookingId: string, newStatus: string) => {
		setStatusUpdates((prev) => ({ ...prev, [bookingId]: newStatus }));
	};

	const handleReplyChange = (bookingId: string, reply: string) => {
		setReplies((prev) => ({ ...prev, [bookingId]: reply }));
	};

	const handleUpdateStatus = async (bookingId: string) => {
		try {
			setLoading((prev) => ({ ...prev, [bookingId]: true }));
			await updateBookingStatus(bookingId, statusUpdates[bookingId]);
			toast.success("Status updated successfully!");
			await fetchSessions();
		} catch (err) {
			console.error(err);
			toast.error("Failed to update status.");
		} finally {
			setLoading((prev) => ({ ...prev, [bookingId]: false }));
		}
	};

	const handleSendReply = async (bookingId: string) => {
		if (!replies[bookingId]) {
			toast.warning("Reply message cannot be empty.");
			return;
		}
		try {
			setLoading((prev) => ({ ...prev, [bookingId]: true }));
			await replyToSessionBooking(replies[bookingId], bookingId);
			toast.success("Reply sent successfully!");
			setReplies((prev) => ({ ...prev, [bookingId]: "" }));
		} catch (err) {
			console.error(err);
			toast.error("Failed to send reply.");
		} finally {
			setLoading((prev) => ({ ...prev, [bookingId]: false }));
		}
	};

	const confirmDeleteSession = async () => {
		if (!sessionToDelete) return;
		try {
			setLoading((prev) => ({ ...prev, [sessionToDelete._id]: true }));
			await deleteBookedSession(sessionToDelete._id);
			toast.success("Session deleted successfully");
			setDeleteModalOpen(false);
			setSessionToDelete(null);
			await fetchSessions();
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete session");
		} finally {
			setLoading((prev) => ({ ...prev, [sessionToDelete._id]: false }));
		}
	};

	useEffect(() => {
		if (user?.id) fetchSessions();
	}, [user]);

	if (sessions.length === 0) {
		return (
			<p className='text-center text-muted mt-4'>No sessions booked yet.</p>
		);
	}

	return (
		<div
			className='container'
			style={{ height: "76vh", overflowY: "scroll" }}>
			<Row>
				{sessions.map((session) => (
					<Col
						md='6'
						lg='4'
						className='mb-4'
						key={session._id}>
						<Card className='shadow-sm h-100'>
							<CardBody className='d-flex flex-column justify-content-between align-content-center'>
								<div className='w-100'>
									<CardTitle
										tag='h3'
										className='mb-3 text-primary fw-bold'>
										{session.message?.trim() || "No message"}
									</CardTitle>

									<CardText className='mb-3 fs-5'>
										<strong>Student:</strong> {session.student.name} <br />
										<strong>Email:</strong> {session.student.email} <br />
										<strong>Date:</strong>{" "}
										{new Date(session.date).toLocaleDateString()} <br />
										<strong>Time:</strong> {session.timeSlot} <br />
										<strong>Status:</strong>{" "}
										<Badge
											color='info'
											className='text-uppercase'>
											{session.status}
										</Badge>
									</CardText>
								</div>

								<hr />

								<FormGroup className='mb-3 w-100'>
									<Label className='fw-semibold'>Update Status</Label>
									<div className='d-flex gap-2 align-items-center'>
										<Input
											type='select'
											value={statusUpdates[session._id] || session.status}
											onChange={(e) =>
												handleStatusChange(session._id, e.target.value)
											}
											style={{ maxWidth: "160px" }}>
											<option value='Pending'>Pending</option>
											<option value='Confirmed'>Confirmed</option>
											<option value='Cancelled'>Cancelled</option>
										</Input>
										<Button
											color='primary'
											size='sm'
											disabled={
												loading[session._id] ||
												statusUpdates[session._id] === session.status
											}
											onClick={() => handleUpdateStatus(session._id)}>
											{loading[session._id] ? <Spinner size='sm' /> : "Update"}
										</Button>
									</div>
								</FormGroup>

								<FormGroup className='mb-2 w-100'>
									<Label className='fw-semibold fs-6'>
										Write Your Reply (Add Meeting Link)
									</Label>
									<Input
										type='textarea'
										rows={2}
										value={replies[session._id] || ""}
										onChange={(e) =>
											handleReplyChange(session._id, e.target.value)
										}
										placeholder='Type your message...'
									/>
								</FormGroup>

								<div className='d-flex justify-content-between mt-2 w-100'>
									<Button
										color='success'
										onClick={() => handleSendReply(session._id)}
										disabled={loading[session._id]}>
										{loading[session._id] ? (
											<Spinner size='sm' />
										) : (
											"Send Reply"
										)}
									</Button>

									<Button
										color='danger'
										onClick={() => {
											setSessionToDelete(session);
											setDeleteModalOpen(true);
										}}>
										<Trash2
											size={14}
											className='me-1'
										/>
										Delete
									</Button>
								</div>
							</CardBody>
						</Card>
					</Col>
				))}
			</Row>

			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={deleteModalOpen}
				toggle={() => setDeleteModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setDeleteModalOpen(false)}>
					Confirm Deletion
				</ModalHeader>
				<ModalBody>
					Are you sure you want to delete the session with message:
					<br />
					<strong>"{sessionToDelete?.message || "-"}"</strong>?
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
						onClick={() => setDeleteModalOpen(false)}>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={confirmDeleteSession}>
						Delete
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default ScheduledSessions;
