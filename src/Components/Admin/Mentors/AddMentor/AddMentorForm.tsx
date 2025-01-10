"use client"
import { FormEvent, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	Col,
	Form,
	Input,
	Label,
	Row,
} from "reactstrap";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { Name, Password, EmailAddress, createMentorTitle, AddMentorTitle } from "@/Constant";
import { createNewMentor } from "@/app/api/admin/mentors";
import { AddMentorFormProps } from "@/Types/Mentor.type";

const AddMentorForm = () => {
	const [formData, setFormData] = useState<AddMentorFormProps>({
		name: "",
		dob: "",
		username: "",
		email: "",
		contactNumber: "",
		photo: "",
		about: "",
		address: "",
		education: "",
		assignedCourses: [],
        batchAssignments:[],
        timeAvailability:"",
		password: "",
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const data = createNewMentor(formData);
        console.log(data);

	};

	return (
		<Col sm={12}>
			<Card>
				<CommonCardHeader
					headClass="pb-0"
					title={AddMentorTitle}
				/>
				<CardBody>
					<div className="card-wrapper border rounded-3">
						<Form onSubmit={handleSubmit}>
							<Row className="g-3">
								<Col md={12}>
									<Label>{Name}</Label>
									<Input
										name="name"
										type="text"
										placeholder="Enter Name"
										onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>DOB</Label>
									<Input
										name="dob"
										type="date"
										placeholder="Enter Date of Birth"
										onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>Username</Label>
									<Input
										name="username"
										type="text"
										placeholder="Enter Username"
										onChange={(e) => setFormData({ ...formData, username: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>{EmailAddress}</Label>
									<Input
										name="email"
										type="email"
										placeholder="Enter Email"
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>Contact Number</Label>
									<Input
										name="contactNumber"
										type="text"
										placeholder="Enter Contact Number"
										onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>Photo</Label>
									<Input
										name="photo"
										type="file"
										accept="image/*"
										onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0]?.name || "" })}
									/>
								</Col>
								<Col md={12}>
									<Label>About</Label>
									<Input
										name="about"
										type="textarea"
										placeholder="About..."
										onChange={(e) => setFormData({ ...formData, about: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>Address</Label>
									<Input
										name="address"
										type="text"
										placeholder="Enter Address"
										onChange={(e) => setFormData({ ...formData, address: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>Education</Label>
									<Input
										name="education"
										type="textarea"
										placeholder="Enter Educational Background"
										onChange={(e) => setFormData({ ...formData, education: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>Time Availability</Label>
									<Input
										name="time"
										type="textarea"
										placeholder="List Time Availability"
										onChange={(e) => setFormData({ ...formData, timeAvailability: e.target.value })}
									/>
								</Col>
								<Col md={12}>
									<Label>{Password}</Label>
									<Input
										name="password"
										type="password"
										placeholder="Enter Password"
										onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									/>
								</Col>
								<Col xs={12}>
									<Button color="primary">{createMentorTitle}</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default AddMentorForm;