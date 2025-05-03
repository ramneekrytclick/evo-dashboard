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
	Badge,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Spinner,
	Col,
	Row,
} from "reactstrap";
import { Trash2 } from "react-feather";
import { toast } from "react-toastify";

const ScheduledSessions = () => {
	const [sessions, setSessions] = useState<any[]>([]);
	const { user } = useAuth();
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedSession, setSelectedSession] = useState<any>(null);
	const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [sessionToDelete, setSessionToDelete] = useState<any>(null);
	const [updatedStatus, setUpdatedStatus] = useState("Pending");

	const fetchSessions = async () => {
		try {
			const response = await getBookedSessions(user?.id || "");
			setSessions(response.reverse());
		} catch (err) {
			toast.error("Failed to load sessions.");
		}
	};

	useEffect(() => {
		if (user?.id) fetchSessions();
	}, [user]);

	const updateStatus = async (session: any, status: string) => {
		try {
			setLoading((p) => ({ ...p, [session._id]: true }));
			await updateBookingStatus(session._id, status);
			toast.success("Status updated");
			await fetchSessions();
		} catch {
			toast.error("Update failed");
		} finally {
			setLoading((p) => ({ ...p, [session._id]: false }));
		}
	};

	const sendReply = async (session: any, message: string) => {
		try {
			setLoading((p) => ({ ...p, [session._id]: true }));
			await replyToSessionBooking(message, session._id);
			toast.success("Reply sent");
			await fetchSessions();
		} catch {
			toast.error("Reply failed");
		} finally {
			setLoading((p) => ({ ...p, [session._id]: false }));
		}
	};

	const handleDelete = async () => {
		try {
			setLoading((p) => ({ ...p, [sessionToDelete._id]: true }));
			await deleteBookedSession(sessionToDelete._id);
			toast.success("Deleted successfully");
			setDeleteModalOpen(false);
			await fetchSessions();
		} catch {
			toast.error("Delete failed");
		} finally {
			setLoading((p) => ({ ...p, [sessionToDelete._id]: false }));
		}
	};

	const getStatusStep = (status: "Pending" | "Confirmed" | "Cancelled") => {
		const steps = {
			Pending: {
				title: "Session Requested",
				detail: "Awaiting your confirmation.",
				color: "warning",
			},
			Confirmed: {
				title: "Session Confirmed",
				detail: "You have confirmed this session.",
				color: "success",
			},
			Cancelled: {
				title: "Session Cancelled",
				detail: "You rejected the session.",
				color: "danger",
			},
		};
		if (["Pending", "Confirmed", "Cancelled"].includes(status)) {
			return steps[status];
		}
		return steps.Pending;
	};

	return (
		<Row
			className='d-flex flex-wrap'
			style={{
				height: "200px",
			}}>
			{sessions.map((booking) => {
				const step = getStatusStep(booking.status);
				return (
					<Col
						key={booking._id}
						className='h-100 my-2'
						xl='3'
						md='6'
						sm='12'>
						<Card
							onClick={() => {
								setSelectedSession(booking);
								setModalOpen(true);
							}}
							className='flex-shrink-0 p-3 border shadow-sm rounded-4 bg-white text-dark text-center h-100'
							style={{
								scrollSnapAlign: "start",
								cursor: "pointer",
							}}>
							<CardBody className='p-0 d-flex flex-column h-100 justify-content-between align-items-center'>
								<div className='d-flex mb-3 text-start'>
									<div
										className={`flex-shrink-0 bg-${step.color} rounded-circle`}
										style={{ width: 30, height: 30 }}></div>
									<div className='flex-grow-1 ps-3'>
										<h6 className='fw-bold mb-1 fs-5'>{step.title}</h6>
										<p className='small text-muted mb-0 fs-6'>{step.detail}</p>
									</div>
								</div>

								<div className='mt-auto'>
									<p className='mb-1 small text-dark'>
										{booking.message || "—"}
									</p>
									<Badge
										pill
										color='light'
										className='text-dark d-flex justify-content-center gap-2 fs-6'>
										<span>{new Date(booking.date).toLocaleDateString()}</span>
										{booking.timeSlot}
									</Badge>
								</div>
							</CardBody>
						</Card>
					</Col>
				);
			})}

			{/* Modal */}
			<Modal
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}
				centered
				size='md'>
				<ModalHeader toggle={() => setModalOpen(false)}>
					<span className='fw-semibold'>
						Session with {selectedSession?.student.name}
					</span>
				</ModalHeader>
				<ModalBody className='text-center d-flex flex-column align-items-center justify-content-center gap-3'>
					<Badge
						pill
						color='light'
						className='text-dark fs-6'>
						{new Date(selectedSession?.date).toLocaleDateString()} —{" "}
						{selectedSession?.timeSlot}
					</Badge>
					<p>
						<strong>Email:</strong> {selectedSession?.student.email}
					</p>
					<p>
						<strong>Current Status:</strong> {selectedSession?.status}
					</p>
					<div className='w-100 d-flex flex-column gap-2 align-items-center'>
						<Input
							type='textarea'
							placeholder='Write reply...'
							value={selectedSession?.replyFromMentor || ""}
							onChange={(e) =>
								setSelectedSession({
									...selectedSession,
									replyFromMentor: e.target.value,
								})
							}
							rows={3}
						/>
						<Button
							color='success'
							onClick={() =>
								sendReply(selectedSession, selectedSession.replyFromMentor)
							}>
							Send Reply/Link
						</Button>
					</div>

					{/* Status Dropdown */}
					<div className='w-100 d-flex align-items-center'>
						<label className='fw-medium mb-2'>Status</label>
						<Input
							type='select'
							defaultValue={selectedSession?.status}
							onChange={(e) => setUpdatedStatus(e.target.value)}>
							<option value='Pending'>Pending</option>
							<option value='Confirmed'>Confirmed</option>
							<option value='Cancelled'>Cancelled</option>
						</Input>

						<Button
							color='primary'
							onClick={(e) => updateStatus(selectedSession, updatedStatus)}>
							Update
						</Button>
					</div>

					{/* Action Buttons */}
					<div className='d-flex gap-2 justify-content-center align-items-center mt-3'>
						<Button
							color='danger'
							onClick={() => {
								setSessionToDelete(selectedSession);
								setDeleteModalOpen(true);
							}}
							disabled={new Date(selectedSession?.date) > new Date()}>
							Delete Session
						</Button>
					</div>
				</ModalBody>
			</Modal>

			{/* Delete Modal */}
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
						onClick={handleDelete}>
						Delete
					</Button>
				</ModalFooter>
			</Modal>
		</Row>
	);
};

export default ScheduledSessions;
