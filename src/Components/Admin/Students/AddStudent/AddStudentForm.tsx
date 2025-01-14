"use client";
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
import { useRouter } from "next/navigation";
import { StudentProps } from "@/Types/Student.type";
import { createStudent } from "@/app/api/admin/students";

const AddStudentForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<StudentProps>({
		_id: "",
		name: "",
		dob: "",
		email: "",
		contactNumber: "",
		photo: "",
		guardianName: "",
		address: "",
		education: "",
		coursesEnrolled: [],
		interests: [],
		languagesPreferred: [],
		wannaBe: "",
		experience: "",
		batch: "",
		roadmapEnrolled: "",
		password: "",
		resume: "",
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
            const response = await createStudent(formData);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Col sm={12}>
			<Card>
				<CardBody>
					<div className="card-wrapper border rounded-3">
						<Form onSubmit={handleSubmit}>
							<Row className="g-3">
								<Col md={12}>
									<Label>Name</Label>
									<Input
										type="text"
										placeholder="Enter Name"
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Date of Birth</Label>
									<Input
										type="date"
										placeholder="Enter Date of Birth"
										onChange={(e) =>
											setFormData({ ...formData, dob: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Email</Label>
									<Input
										type="email"
										placeholder="Enter Email"
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Contact Number</Label>
									<Input
										type="text"
										placeholder="Enter Contact Number"
										onChange={(e) =>
											setFormData({
												...formData,
												contactNumber: e.target.value,
											})
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Guardian Name</Label>
									<Input
										type="text"
										placeholder="Enter Guardian Name"
										onChange={(e) =>
											setFormData({
												...formData,
												guardianName: e.target.value,
											})
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Address</Label>
									<Input
										type="text"
										placeholder="Enter Address"
										onChange={(e) =>
											setFormData({
												...formData,
												address: e.target.value,
											})
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Wanna Be</Label>
									<Input
										type="text"
										placeholder="What does the student aspire to be?"
										onChange={(e) =>
											setFormData({
												...formData,
												wannaBe: e.target.value,
											})
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Password</Label>
									<Input
										type="password"
										placeholder="Enter Password"
										onChange={(e) =>
											setFormData({
												...formData,
												password: e.target.value,
											})
										}
									/>
								</Col>
								<Col xs={12}>
									<Button color="primary">Create Student</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default AddStudentForm;
