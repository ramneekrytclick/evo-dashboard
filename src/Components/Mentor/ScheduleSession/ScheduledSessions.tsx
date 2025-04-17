"use client";

import { useEffect, useState } from "react";
import {
	getBookedSessions,
	updateBookingStatus,
	replyToSessionBooking,
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
} from "reactstrap";
import { toast } from "react-toastify";

const ScheduledSessions = () => {
	const [sessions, setSessions] = useState<any[]>([]);
	const { user } = useAuth();
	const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
	const [statusUpdates, setStatusUpdates] = useState<{ [key: string]: string }>(
		{}
	);
	const [replies, setReplies] = useState<{ [key: string]: string }>({});

	const fetchSessions = async () => {
		try {
			const response = await getBookedSessions(user?.id || "");
			setSessions(response);
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

	useEffect(() => {
		if (user?.id) fetchSessions();
	}, [user]);

	if (sessions.length === 0) {
		return (
			<p className='text-center text-muted mt-4'>No sessions booked yet.</p>
		);
	}

	return (
		<div className='container'>
			<Row>
				{sessions.map((session) => (
					<Col
						md='4'
						className='mb-4'
						key={session._id}>
						<Card>
							<CardBody>
								<CardTitle tag='h5'>
									{session.message?.trim() ? session.message : "-"}
								</CardTitle>
								<CardText>
									<strong>Student: {session.student.name}</strong>
									<br />
									<strong>Email:</strong> {session.student.email} <br />
									<strong>Date:</strong>{" "}
									{new Date(session.date).toLocaleDateString()} <br />
									<strong>Time:</strong> {session.timeSlot} <br />
									<strong>Status:</strong>{" "}
									<span className='text-primary'>{session.status}</span> <br />
								</CardText>

								<FormGroup className='d-flex gap-2 align-items-center mb-3'>
									<Label
										for='statusSelect'
										className='me-2 mb-0'>
										Update Status:
									</Label>
									<Input
										id='statusSelect'
										type='select'
										value={statusUpdates[session._id] || session.status}
										onChange={(e) =>
											handleStatusChange(session._id, e.target.value)
										}
										style={{ maxWidth: "150px" }}>
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
								</FormGroup>

								<FormGroup>
									<Label for='replyMessage'>Reply to Student:</Label>
									<Input
										id='replyMessage'
										type='textarea'
										value={replies[session._id] || ""}
										onChange={(e) =>
											handleReplyChange(session._id, e.target.value)
										}
										placeholder='Type your reply here...'
									/>
									<Button
										color='success'
										size='sm'
										className='mt-2'
										onClick={() => handleSendReply(session._id)}
										disabled={loading[session._id]}>
										{loading[session._id] ? (
											<Spinner size='sm' />
										) : (
											"Send Reply"
										)}
									</Button>
								</FormGroup>
							</CardBody>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default ScheduledSessions;
