import { formattedDataProps, updateAnnouncement } from "@/app/api/admin/announcements";
import CommonModal from "@/CommonComponent/CommonModal";
import { IAnnouncement } from "@/Types/Announcement.type";
import { FormEvent, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

interface UpdateAnnouncementFormProps {
	toggle: () => void;
	values: IAnnouncement;
}
interface formDataProps {
	title: string;
	message: string;
	media: string;
	targetRoles: string[];
	visibilityStart: Date ;
	visibilityEnd: Date ;
}
const UpdateAnnouncementForm = ({
	toggle,
	values,
}: UpdateAnnouncementFormProps) => {
	const [formData, setFormData] = useState<formDataProps>({
        title:values.title,
        message: values.message,
        media: values.media||"",
        targetRoles: values.targetRoles,
        visibilityStart: values.visibilityStart,
        visibilityEnd: values.visibilityEnd,
    });
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
		const { title, message, media, targetRoles, visibilityStart, visibilityEnd } = formData
		const formattedData:formattedDataProps={
			title:title,
			message:message,
			media:media,
			targetRoles:targetRoles,
			visibilityStart:visibilityStart,
			visibilityEnd:visibilityEnd,
		}
		try {
			const response = await updateAnnouncement(formattedData,values._id);
			alert(response.message);
		}
		catch (error) {
			console.error(error);
			alert("Error Updating")
		}
    }
    const handleCheckboxChange = (role: string) => {
		setFormData((prevState) => {
			const updatedAudience = prevState.targetRoles.includes(role)
				? prevState.targetRoles.filter((r) => r !== role)
				: [...prevState.targetRoles, role];
			return { ...prevState, targetRoles: updatedAudience };
		});
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files);
		// if (e.target.files && e.target.files[0]) {
		// 	setFormData({ ...formData, media: e.target.files[0] });
		// }
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
                        value={formData.title}
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
                        value={formData.message}
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
                                        checked={formData.targetRoles.includes(item)}
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
									visibilityStart: e.target.valueAsDate||new Date(),
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
									visibilityEnd: e.target.valueAsDate||new Date(),
								});
							}}
						/>
					</Col>
				</Col>
				<Col md={12}>
					<Button color="primary">{"Update"}</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default UpdateAnnouncementForm;
