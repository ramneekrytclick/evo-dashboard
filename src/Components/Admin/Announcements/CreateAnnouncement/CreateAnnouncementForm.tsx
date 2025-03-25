import {
	announcementAPIProps,
	createAnnouncement,
} from "@/app/api/admin/announcements";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

interface formDataProps {
	title: string;
	message: string;
	roles: string[];
}

const CreateAnnouncementForm = ({ toggle }: { toggle: () => void }) => {
	const [formData, setFormData] = useState<formDataProps>({
		title: "",
		message: "",
		roles: [],
	});

	const handleCheckboxChange = (role: string) => {
		setFormData((prevState) => {
			const updatedRoles = prevState.roles.includes(role)
				? prevState.roles.filter((r) => r !== role)
				: [...prevState.roles, role];
			return { ...prevState, roles: updatedRoles };
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const formattedData: announcementAPIProps = {
			title: formData.title,
			message: formData.message,
			roles: formData.roles,
		};

		try {
			await createAnnouncement(formattedData);
			toast.success("Announcement created successfully!");
			toggle();
		} catch (error) {
			console.error("Failed to create announcement:", error);
			toast.error("Error creating announcement.");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						type="text"
						placeholder="Enter Title"
						value={formData.title}
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="message">Message</Label>
					<Input
						id="message"
						type="textarea"
						placeholder="Enter Message"
						value={formData.message}
						onChange={(e) =>
							setFormData({ ...formData, message: e.target.value })
						}
					/>
				</Col>
				<Col xs={12}>
					<Label>Target Audience</Label>
					<FormGroup check>
						{["Student", "Mentor", "Manager", "Employer", "Course Creator"].map(
							(role) => (
								<div key={role}>
									<Input
										id={role}
										type="checkbox"
										checked={formData.roles.includes(role)}
										onChange={() => handleCheckboxChange(role)}
									/>
									<Label
										htmlFor={role}
										className="d-block mb-1"
										check>
										{role}
									</Label>
								</div>
							)
						)}
					</FormGroup>
				</Col>
				<Col md={12}>
					<Button color="primary">Create</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateAnnouncementForm;
