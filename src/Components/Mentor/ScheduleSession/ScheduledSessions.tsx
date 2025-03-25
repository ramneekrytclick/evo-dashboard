"use client";

import { useEffect, useState } from "react";
import { getBookedSessions, updateBookingStatus } from "@/app/api/mentor";
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
} from "reactstrap";
import { toast } from "react-toastify";

const ScheduledSessions = () => {
	const [sessions, setSessions] = useState<any[]>([]);
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [statusUpdates, setStatusUpdates] = useState<{ [key: string]: string }>(
		{}
	);

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

	const handleUpdateStatus = async (bookingId: string) => {
		try {
			setLoading(true);
			await updateBookingStatus(bookingId, statusUpdates[bookingId]);
			toast.success("Status updated successfully!");
			await fetchSessions();
		} catch (err) {
			console.error(err);
			toast.error("Failed to update status.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user?.id) fetchSessions();
	}, [user]);

	if (sessions.length === 0) {
		return (
			<p className="text-center text-muted mt-4">No sessions booked yet.</p>
		);
	}

	return (
		<div className="container mt-4 bg-light">
			{sessions.map((session) => (
				<Col
					md="6"
					className="mb-4"
					key={session._id}>
					<Card>
						<CardBody>
							<CardTitle tag="h5">Student: {session.student.name}</CardTitle>
							<CardText>
								<strong>Email:</strong> {session.student.email} <br />
								<strong>Date:</strong>{" "}
								{new Date(session.date).toLocaleDateString()} <br />
								<strong>Time:</strong> {session.timeSlot} <br />
								<strong>Current Status:</strong>{" "}
								<span className="text-primary">{session.status}</span>
							</CardText>
							<div className="d-flex gap-2 align-items-center">
								<Input
									type="select"
									value={statusUpdates[session._id] || session.status}
									onChange={(e) =>
										handleStatusChange(session._id, e.target.value)
									}
									style={{ maxWidth: "150px" }}>
									<option value="Pending">Pending</option>
									<option value="Confirmed">Confirmed</option>
									<option value="Cancelled">Cancelled</option>
								</Input>
								<Button
									color="primary"
									size="sm"
									disabled={
										loading || statusUpdates[session._id] === session.status
									}
									onClick={() => handleUpdateStatus(session._id)}>
									{loading ? <Spinner size="sm" /> : "Update Status"}
								</Button>
							</div>
						</CardBody>
					</Card>
				</Col>
			))}
		</div>
	);
};

export default ScheduledSessions;
