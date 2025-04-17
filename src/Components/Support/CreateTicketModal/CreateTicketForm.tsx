"use client";
import { createTicket } from "@/app/api/support/support";
import { useAuth } from "@/app/AuthProvider";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface CreateTicketFormProps {
	toggle: () => void;
	fetchData: () => void;
}

const CreateTicketForm = ({ toggle, fetchData }: CreateTicketFormProps) => {
	const { user } = useAuth();
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [attachment, setAttachment] = useState<File | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!user?.id) {
			toast.error("User not authenticated");
			return;
		}

		const formData = new FormData();
		formData.append("userId", user.id);
		formData.append("subject", subject);
		formData.append("message", message);
		if (attachment) {
			formData.append("file", attachment);
		}

		try {
			await createTicket(formData);
			toast.success("Ticket created successfully!");
			fetchData();
			toggle();
		} catch (error) {
			console.error("Failed to create ticket:", error);
			toast.error("Error creating ticket.");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className='g-3'>
				<Col md={12}>
					<Label htmlFor='subject'>Subject</Label>
					<Input
						id='subject'
						type='text'
						placeholder='Enter Subject'
						required
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor='message'>Message</Label>
					<Input
						id='message'
						type='textarea'
						placeholder='Enter Message'
						required
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor='file'>Attachment (optional)</Label>
					<Input
						id='file'
						type='file'
						onChange={(e) => setAttachment(e.target.files?.[0] || null)}
					/>
				</Col>
				<Col md={12}>
					<Button
						color='primary'
						type='submit'>
						Create Ticket
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateTicketForm;
