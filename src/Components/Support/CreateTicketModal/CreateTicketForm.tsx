import { createTicket } from "@/app/api/support/support";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface SupportTicketProps {
  _id?: string;
  subject: string;
  message: string;
  status?: string;
}

const CreateTicketForm = ({ toggle,fetchData }: { toggle: () => void ,fetchData:()=>void}) => {
  const [ticketData, setTicketData] = useState<SupportTicketProps>({
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await createTicket(ticketData);
      console.log("Ticket created:", response);
      toast("Ticket created successfully!");
    } catch (error) {
      console.error("Failed to create ticket:", error);
      toast.error("Error creating ticket.");
    }
    finally{
      fetchData();
      toggle();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={12}>
          <Label htmlFor="subject">{"Subject"}</Label>
          <Input
            id="subject"
            type="text"
            placeholder="Enter Subject"
            required
            onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
          />
        </Col>
        <Col md={12}>
          <Label htmlFor="message">{"Message"}</Label>
          <Input
            id="message"
            type="textarea"
            placeholder="Enter Message"
            required
            onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
          />
        </Col>
        <Col md={12}>
          <Button color="primary" type="submit">
            {"Create Ticket"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateTicketForm;
