"use client";
import {
	AnnouncementFormInput,
	createAnnouncement,
} from "@/app/api/admin/announcements";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import Select from "react-select";

const roleOptions = [
	{ value: "Student", label: "Student" },
	{ value: "Mentor", label: "Mentor" },
	{ value: "Manager", label: "Manager" },
	{ value: "Employer", label: "Employer" },
	{ value: "Course Creator", label: "Course Creator" },
	{ value: "Publisher", label: "Publisher" },
];

const CreateAnnouncementForm = ({ toggle }: { toggle: () => void }) => {
	const [formData, setFormData] = useState<AnnouncementFormInput>({
		title: "",
		description: "",
		roles: [],
		image: null,
	});

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
			<Row className='g-3'>
				<Col md={12}>
					<Label>Title</Label>
					<Input
						type='text'
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
						type='textarea'
						value={formData.description}
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
						required
					/>
				</Col>

				<Col md={12}>
					<Label>Roles</Label>
					<Select
						isMulti
						name='roles'
						options={roleOptions}
						value={roleOptions.filter((r) => formData.roles.includes(r.value))}
						onChange={(selected) =>
							setFormData({
								...formData,
								roles: selected.map((s) => s.value),
							})
						}
						className='basic-multi-select'
						classNamePrefix='select'
					/>
				</Col>

				<Col md={12}>
					<Label>Image (optional)</Label>
					<Input
						type='file'
						accept='image/*'
						onChange={(e) =>
							setFormData({ ...formData, image: e.target.files?.[0] || null })
						}
					/>
				</Col>

				<Col
					md={12}
					className='text-end'>
					<Button
						color='primary'
						type='submit'>
						Create
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateAnnouncementForm;
