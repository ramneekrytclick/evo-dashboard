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
import {
	Name,
	Password,
	EmailAddress,
	createMentorTitle,
	AddMentorTitle,
} from "@/Constant";
import { createNewMentor } from "@/app/api/admin/mentors";
import { AddMentorFormProps } from "@/Types/Mentor.type";
import { useRouter } from "next/navigation";

const AddMentorForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<AddMentorFormProps>({
		name: "",
		dob: "",
		username: "",
		email: "",
		contactNumber: "",
		photo: "",
		about: "",
		address: "",
		education: [{ degree: "", institute: "", year: 0 }],
		assignedCourses: [],
		batchAssignments: [],
		timeAvailability: "",
		password: "",
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = await createNewMentor(formData);
			if (data) {
				alert("Manager Created!");
			}
		} catch (error) {
			console.log(error);
		} finally {
			router.push("/admin/mentors");
		}
	};
	const handleEducationChange = (
		index: number,
		field: string,
		value: string | number
	) => {
		const updatedEducation = [...formData.education];
		updatedEducation[index] = { ...updatedEducation[index], [field]: value };
		setFormData({ ...formData, education: updatedEducation });
	};

	const addEducationEntry = () => {
		setFormData({
			...formData,
			education: [
				...formData.education,
				{ degree: "", institute: "", year: 0 },
			],
		});
	};

	const removeEducationEntry = (index: number) => {
		const updatedEducation = formData.education.filter((_, i) => i !== index);
		setFormData({ ...formData, education: updatedEducation });
	};

	return (
		<Col sm={12}>
			<Card>
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
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>DOB</Label>
									<Input
										name="dob"
										type="date"
										placeholder="Enter Date of Birth"
										onChange={(e) =>
											setFormData({ ...formData, dob: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Username</Label>
									<Input
										name="username"
										type="text"
										placeholder="Enter Username"
										onChange={(e) =>
											setFormData({ ...formData, username: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>{EmailAddress}</Label>
									<Input
										name="email"
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
										name="contactNumber"
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
									<Label>Photo</Label>
									<Input
										name="photo"
										type="file"
										accept="image/*"
										onChange={(e) =>
											setFormData({
												...formData,
												photo: e.target.files?.[0]?.name || "",
											})
										}
									/>
								</Col>
								<Col md={12}>
									<Label>About</Label>
									<Input
										name="about"
										type="textarea"
										placeholder="About..."
										onChange={(e) =>
											setFormData({ ...formData, about: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Address</Label>
									<Input
										name="address"
										type="text"
										placeholder="Enter Address"
										onChange={(e) =>
											setFormData({ ...formData, address: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Education</Label>
									{formData.education.map((edu, index) => (
										<div
											key={index}
											style={{ marginBottom: "0.5rem" }}>
											<Row>
												<Col md={4}>
													<Input
														type="text"
														placeholder="Degree"
														value={edu.degree}
														onChange={(e) =>
															handleEducationChange(
																index,
																"degree",
																e.target.value
															)
														}
													/>
												</Col>
												<Col md={4}>
													<Input
														type="text"
														placeholder="Institute"
														value={edu.institute}
														onChange={(e) =>
															handleEducationChange(
																index,
																"institute",
																e.target.value
															)
														}
													/>
												</Col>
												<Col md={2}>
													<Input
														type="number"
														placeholder="Year"
														onChange={(e) =>
															handleEducationChange(
																index,
																"year",
																parseInt(e.target.value)
															)
														}
													/>
												</Col>
												<Col md={2}>
													<Button
														color="danger"
														size="sm"
														onClick={() => removeEducationEntry(index)}>
														Remove
													</Button>
												</Col>
											</Row>
										</div>
									))}
									<Button
										color="primary"
										size="sm"
										onClick={addEducationEntry}
										style={{ marginTop: "1rem" }}>
										Add Education
									</Button>
								</Col>
								<Col md={12}>
									<Label>Time Availability</Label>
									<Input
										name="time"
										type="textarea"
										placeholder="List Time Availability"
										onChange={(e) =>
											setFormData({
												...formData,
												timeAvailability: e.target.value,
											})
										}
									/>
								</Col>
								<Col md={12}>
									<Label>{Password}</Label>
									<Input
										name="password"
										type="password"
										placeholder="Enter Password"
										onChange={(e) =>
											setFormData({ ...formData, password: e.target.value })
										}
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
