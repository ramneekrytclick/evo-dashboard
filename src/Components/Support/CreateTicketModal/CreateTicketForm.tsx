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
	const [ticketData, setTicketData] = useState({
		subject: "",
		message: "",
		userId: user?.id,
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createTicket(ticketData);
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
			<Row className="g-3">
				<Col md={12}>
					<Label htmlFor="subject">Subject</Label>
					<Input
						id="subject"
						type="text"
						placeholder="Enter Subject"
						required
						value={ticketData.subject}
						onChange={(e) =>
							setTicketData({ ...ticketData, subject: e.target.value })
						}
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="message">Message</Label>
					<Input
						id="message"
						type="textarea"
						placeholder="Enter Message"
						required
						value={ticketData.message}
						onChange={(e) =>
							setTicketData({ ...ticketData, message: e.target.value })
						}
					/>
				</Col>
				<Col md={12}>
					<Button
						color="primary"
						type="submit">
						Create Ticket
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateTicketForm;
