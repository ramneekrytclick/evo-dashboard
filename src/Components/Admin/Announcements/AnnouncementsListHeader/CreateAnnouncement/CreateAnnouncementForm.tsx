import {
	announcementAPIProps,
	createAnnouncement,
} from "@/app/api/admin/announcements";
import { FormEvent, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

interface formDataProps {
	title: string;
	message: string;
	media: {} | Blob;
	targetRoles: string[];
	visibilityStart: Date | null;
	visibilityEnd: Date | null;
}
const CreateAnnouncementForm = ({ toggle }: { toggle: () => void }) => {
	const [formData, setFormData] = useState<formDataProps>({
		title: "",
		message: "",
		media: {},
		targetRoles: [],
		visibilityStart: new Date(),
		visibilityEnd: new Date(),
	});

	const handleCheckboxChange = (role: string) => {
		setFormData((prevState) => {
			const updatedAudience = prevState.targetRoles.includes(role)
				? prevState.targetRoles.filter((r) => r !== role)
				: [...prevState.targetRoles, role];
			return { ...prevState, targetRoles: updatedAudience };
		});
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(e.target.files);

		if (e.target.files && e.target.files[0]) {
			setFormData({ ...formData, media: e.target.files[0] });
		}
	};
	
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		// Create FormData for the media file (if any)
		let mediaUrl = "";
		// if (formData.media) {
		// 	const mediaData = new FormData();
		// 	mediaData.append("file", formData.media);
		// 	// Example: Upload the file and get the URL
		// 	const response = await fetch("/upload", {
		// 		method: "POST",
		// 		body: mediaData,
		// 	});
		// 	const data = await response.json();
		// 	mediaUrl = data.url; // Assume response includes uploaded URL
		// }

		const formattedData: announcementAPIProps = {
			title: formData.title,
			message: formData.message,
			media: mediaUrl || "",
			targetRoles: formData.targetRoles,
			visibilityStart: new Date(),
			visibilityEnd: new Date(),
		};

		try {
			const response = await createAnnouncement(formattedData);
			// console.log("Function response:", response);
			alert("Announcement created successfully!");
			toggle();
		} catch (error) {
			console.error("Failed to create announcement:", error);
			alert("Error creating announcement.");
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label htmlFor="title">{"Title"}</Label>
					<Input
						id="title"
						type="text"
						placeholder="Enter Title"
						onChange={(e) => {
							setFormData({ ...formData, title: e.target.value });
						}}
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="message">{"Message"}</Label>
					<Input
						id="message"
						type="text"
						placeholder="Enter Message"
						onChange={(e) => {
							setFormData({ ...formData, message: e.target.value });
						}}
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="media">{"Media"}</Label>
					<Input
						id="media"
						type="file"
						onChange={(e) => {
							handleFileChange(e);
						}}
					/>
				</Col>
				<Col xs={12}>
					<Label htmlFor="Target">{"Target Audience"}</Label>
					<FormGroup check>
						{["Manager", "Mentor", "Creator", "Student", "Employer"].map(
							(item, index) => (
								<>
									<Input
										id={item}
										type="checkbox"
										onChange={() => {
											handleCheckboxChange(item.toLowerCase());
										}}
									/>
									<Label
										htmlFor={item}
										className="d-block mb-0"
										check>
										{item}
									</Label>
								</>
							)
						)}
					</FormGroup>
				</Col>
				<Col xs={12}>
					<Col sm={3}>
						<Label>{"Start Date"}</Label>
					</Col>
					<Col sm={9}>
						<Input
							className="digits"
							type="date"
							defaultValue={formData.visibilityStart?.toDateString()}
							onChange={(e) => {
								setFormData({
									...formData,
									visibilityStart: e.target.valueAsDate,
								});
							}}
						/>
					</Col>
				</Col>
				<Col xs={12}>
					<Col sm={3}>
						<Label>{"End Date"}</Label>
					</Col>
					<Col sm={9}>
						<Input
							className="digits"
							type="date"
							defaultValue={formData.visibilityEnd?.toDateString()}
							onChange={(e) => {
								setFormData({
									...formData,
									visibilityEnd: e.target.valueAsDate,
								});
							}}
						/>
					</Col>
				</Col>
				<Col md={12}>
					<Button color="primary">{"Create"}</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateAnnouncementForm;
