"use client";

import { useState } from "react";
import { bookMentorSession } from "@/app/api/student";
import { useAuth } from "@/app/AuthProvider";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";

const BookSessionForm = ({
	mentorIdProp,
	toggle,
}: {
	mentorIdProp: string;
	toggle: () => void;
}) => {
	const { user } = useAuth();
	const [mentorId, setMentorId] = useState(mentorIdProp);
	const [date, setDate] = useState("");
	const [timeSlot, setTimeSlot] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!mentorId || !date || !timeSlot || !message.trim()) {
			toast.error("Please fill all fields.");
			return;
		}

		try {
			const data = {
				studentId: user?.id || "",
				mentorId: mentorIdProp,
				date,
				timeSlot,
				message,
			};

			await bookMentorSession(data);
			toast.success(
				`Session booked successfully with mentor on ${date} at ${timeSlot}!`
			);
			toggle();
		} catch (error: any) {
			toast.error("Error booking session");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
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

			<FormGroup>
				<Label for="message">Discussion Topic / Message</Label>
				<Input
					type="textarea"
					id="message"
					placeholder="What would you like to discuss in the session?"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</FormGroup>

			<Button
				color="primary"
				type="submit">
				Book Session
			</Button>
		</Form>
	);
};

export default BookSessionForm;
