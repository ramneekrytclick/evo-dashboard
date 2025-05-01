"use client";

import { useState } from "react";
import { bookMentorSession } from "@/app/api/student";
import { useAuth } from "@/app/AuthProvider";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Modal,
	ModalHeader,
	ModalBody,
} from "reactstrap";
import { toast } from "react-toastify";
import Link from "next/link";

const BookSessionForm = ({
	mentorIdProp,
	toggle,
	modalOpen,
	allMentors,
}: {
	mentorIdProp?: string;
	allMentors?: any[];
	modalOpen: boolean;
	toggle: () => void;
}) => {
	const { user } = useAuth();
	const [date, setDate] = useState("");
	const [timeSlot, setTimeSlot] = useState("");
	const [message, setMessage] = useState("");
	const [selectedMentorId, setSelectedMentorId] = useState(mentorIdProp || "");

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
			if (mentorIdProp) {
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
			} else {
				const data = {
					studentId: user?.id || "",
					mentorId: selectedMentorId,
					date,
					timeSlot,
					message,
				};
				await bookMentorSession(data);
				toast.success(`Session booked with mentor on ${date} at ${timeSlot}!`);
				toggle();
			}
		} catch (error: any) {
			toast.error("Error booking session. Please try again.");
		}
	};

	return (
		<Modal
			isOpen={modalOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Book Mentor Session</ModalHeader>
			<ModalBody>
				<Form
					onSubmit={handleSubmit}
					className='p-3'>
					{!mentorIdProp &&
						allMentors &&
						(allMentors.length === 0 ? (
							<p>
								No mentors assigned to you.{" "}
								<Link
									href={`/student/courses`}
									className='me-1'>
									Enroll in a course
								</Link>
								to avail this feature.
							</p>
						) : (
							<FormGroup>
								<Label for='mentor'>Select Mentor</Label>
								<Input
									type='select'
									id='mentor'
									value={selectedMentorId}
									onChange={(e) => setSelectedMentorId(e.target.value)}
									required>
									<option value=''>Select a mentor</option>
									{allMentors?.map((mentor) => (
										<option
											key={mentor._id}
											value={mentor._id}>
											{mentor.name}({mentor.email})
										</option>
									))}
								</Input>
							</FormGroup>
						))}
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
							disabled={
								!date ||
								!timeSlot ||
								!message.trim() ||
								(allMentors && !selectedMentorId && allMentors.length === 0)
							}
							type='submit'>
							Book Session
						</Button>
					</div>
				</Form>
			</ModalBody>
		</Modal>
	);
};

export default BookSessionForm;
