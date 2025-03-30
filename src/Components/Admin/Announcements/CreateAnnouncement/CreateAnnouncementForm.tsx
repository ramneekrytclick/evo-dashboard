import {
	AnnouncementFormInput,
	createAnnouncement,
} from "@/app/api/admin/announcements";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

const CreateAnnouncementForm = ({ toggle }: { toggle: () => void }) => {
	const [formData, setFormData] = useState<AnnouncementFormInput>({
		title: "",
		description: "",
		roles: [],
		image: null,
	});

	const handleCheckboxChange = (role: string) => {
		setFormData((prev) => {
			const roles = prev.roles.includes(role)
				? prev.roles.filter((r) => r !== role)
				: [...prev.roles, role];
			return { ...prev, roles };
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createAnnouncement(formData);
			toast.success("Announcement created!");
			toggle();
			setFormData({ title: "", description: "", roles: [], image: null });
		} catch (error) {
			console.error(error);
			toast.error("Error creating announcement");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label>Title</Label>
					<Input
						type="text"
						value={formData.title}
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
						required
					/>
				</Col>
				<Col md={12}>
					<Label>Description</Label>
					<Input
						type="textarea"
						value={formData.description}
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
						required
					/>
				</Col>
				<Col md={12}>
					<Label>Roles</Label>
					{[
						"Student",
						"Mentor",
						"Manager",
						"Employer",
						"Course Creator",
						"Publisher",
					].map((role) => (
						<div key={role}>
							<Input
								type="checkbox"
								id={role}
								checked={formData.roles.includes(role)}
								onChange={() => handleCheckboxChange(role)}
							/>
							<Label
								check
								htmlFor={role}>
								{role}
							</Label>
						</div>
					))}
				</Col>
				<Col md={12}>
					<Label>Image (optional)</Label>
					<Input
						type="file"
						accept="image/*"
						onChange={(e) =>
							setFormData({ ...formData, image: e.target.files?.[0] || null })
						}
					/>
				</Col>
				<Col md={12}>
					<Button
						color="primary"
						type="submit">
						Create
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateAnnouncementForm;
