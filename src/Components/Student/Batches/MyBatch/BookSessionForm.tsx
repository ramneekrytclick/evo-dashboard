"use client";

import { useState } from "react";
import { bookMentorSession } from "@/app/api/student";
import { useAuth } from "@/app/AuthProvider";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { toast } from "react-toastify";

const BookSessionForm = ({
	mentorIdProp,
	toggle,
}: {
	mentorIdProp: string;
	toggle: () => void;
}) => {
	const { user } = useAuth();
	const [date, setDate] = useState("");
	const [timeSlot, setTimeSlot] = useState("");
	const [message, setMessage] = useState("");

	const today = new Date().toISOString().split("T")[0];

	const getCurrentTime = () => {
		const now = new Date();
		return now.toTimeString().split(":").slice(0, 2).join(":");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!date || !timeSlot || !message.trim()) {
			toast.error("Please fill all fields.");
			return;
		}

		// Validation: prevent past time if booking for today
		if (date === today && timeSlot < getCurrentTime()) {
			toast.error("Cannot book a session in the past.");
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
			toast.success(`Session booked with mentor on ${date} at ${timeSlot}!`);
			toggle();
		} catch (error: any) {
			toast.error("Error booking session. Please try again.");
		}
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className='p-3'>
			<h5 className='mb-3'>📅 Book a Mentorship Session</h5>

			<FormGroup>
				<Label for='date'>Select Date</Label>
				<Input
					type='date'
					id='date'
					min={today}
					value={date}
					onChange={(e) => {
						setDate(e.target.value);
						if (e.target.value !== today) setTimeSlot("");
					}}
					required
				/>
			</FormGroup>

			<FormGroup>
				<Label for='timeSlot'>Preferred Time</Label>
				<Input
					type='time'
					id='timeSlot'
					value={timeSlot}
					min={date === today ? getCurrentTime() : undefined}
					onChange={(e) => setTimeSlot(e.target.value)}
					required
				/>
				<FormText>
					Mentor availability may vary. Select a time you're available.
				</FormText>
			</FormGroup>

			<FormGroup>
				<Label for='message'>Discussion Topic</Label>
				<Input
					type='textarea'
					id='message'
					rows={3}
					placeholder='What would you like to discuss in the session?'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				/>
				<FormText>
					Give your mentor a brief about your goal for this session.
				</FormText>
			</FormGroup>

			<div className='text-end'>
				<Button
					color='primary'
					type='submit'>
					🚀 Book Session
				</Button>
			</div>
		</Form>
	);
};

export default BookSessionForm;
