"use client";

import { useState } from "react";
import { bookMentorSession } from "@/app/api/student";
import { useAuth } from "@/app/AuthProvider";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

const BookSessionForm = () => {
	const { user } = useAuth();
	const [mentorId, setMentorId] = useState("");
	const [date, setDate] = useState("");
	const [timeSlot, setTimeSlot] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!mentorId || !date || !timeSlot) {
			setErrorMessage("Please fill all fields.");
			return;
		}

		try {
			const data = {
				studentId: user?.id || "",
				mentorId,
				date,
				timeSlot,
			};

			const response = await bookMentorSession(data);
			setSuccessMessage("Session booked successfully!");
			setErrorMessage("");
			// Reset form
			setMentorId("");
			setDate("");
			setTimeSlot("");
		} catch (error: any) {
			setErrorMessage("Failed to book session.");
			setSuccessMessage("");
		}
	};

	return (
		<div className="p-4 max-w-lg mx-auto bg-white rounded shadow">
			<h2 className="text-xl font-semibold mb-4">Book Mentor Session</h2>

			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="mentorId">Mentor ID</Label>
					<Input
						type="text"
						id="mentorId"
						placeholder="Enter mentor ID"
						value={mentorId}
						onChange={(e) => setMentorId(e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label for="date">Date</Label>
					<Input
						type="date"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label for="timeSlot">Time Slot</Label>
					<Input
						type="time"
						id="timeSlot"
						value={timeSlot}
						onChange={(e) => setTimeSlot(e.target.value)}
					/>
				</FormGroup>

				<Button
					color="primary"
					type="submit">
					Book Session
				</Button>
			</Form>

			{successMessage && (
				<Alert
					color="success"
					className="mt-3">
					{successMessage}
				</Alert>
			)}
			{errorMessage && (
				<Alert
					color="danger"
					className="mt-3">
					{errorMessage}
				</Alert>
			)}
		</div>
	);
};

export default BookSessionForm;
