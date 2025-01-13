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
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {
	createCreatorTitle,
	Name,
	Password,
	EmailAddress,
	AddCreatorTitle,
} from "@/Constant";
import { AddCreatorFormProps } from "@/Types/Creator.type";
import { createNewCreator } from "@/app/api/admin/team/creator";
import { useRouter } from "next/navigation";

const AddCreatorForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<AddCreatorFormProps>({
		name: "",
		dob: "",
		username: "",
		email: "",
		contactNumber: "",
		photo: "",
		about: "",
		address: "",
		education: { degree: "", institute: "", year: 0 },
		skills: "",
		assignedCourses: [],
		assignedBatches: [],
		password: "",
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = await createNewCreator(formData);
			if (data) {
				alert("Creator Created!")				
			}
		}
		catch(error){
			console.log(error)
		}
		finally{
			router.push("/admin/team")
		}
	};

	return (
		<Col sm={12}>
			<Card>
				<CommonCardHeader
					headClass="pb-0"
					title={AddCreatorTitle}
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
										placeholder="Enter Your Name"
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
										placeholder="Enter Your Date of Birth"
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
										placeholder="Enter Your Username"
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
										placeholder="Enter Your Email"
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
										placeholder="Enter Your Contact Number"
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
										placeholder="Write something about yourself"
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
										placeholder="Enter Your Address"
										onChange={(e) =>
											setFormData({ ...formData, address: e.target.value })
										}
									/>
								</Col>
								<Col md={4}>
									<Label>Education Degree</Label>
									<Input
										name="degree"
										type="text"
										placeholder="Enter Degree (e.g., B.Tech)"
										onChange={(e) =>
											setFormData({
												...formData,
												education: {
													...formData.education,
													degree: e.target.value,
												},
											})
										}
									/>
								</Col>
								<Col md={4}>
									<Label>Institute</Label>
									<Input
										name="institute"
										type="text"
										placeholder="Enter Institute Name"
										onChange={(e) =>
											setFormData({
												...formData,
												education: {
													...formData.education,
													institute: e.target.value,
												},
											})
										}
									/>
								</Col>
								<Col md={4}>
									<Label>Year of Completion</Label>
									<Input
										name="year"
										type="number"
										placeholder="Enter Year of Completion"
										onChange={(e) =>
											setFormData({
												...formData,
												education: {
													...formData.education,
													year: Number(e.target.value),
												},
											})
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Skills</Label>
									<Input
										name="skills"
										type="textarea"
										placeholder="List Your Skills"
										onChange={(e) =>
											setFormData({ ...formData, skills: e.target.value })
										}
									/>
								</Col>
								<Col md={12}>
									<Label>{Password}</Label>
									<Input
										name="password"
										type="password"
										placeholder="Enter Your Password"
										onChange={(e) =>
											setFormData({ ...formData, password: e.target.value })
										}
									/>
								</Col>
								<Col xs={12}>
									<Button color="primary">{createCreatorTitle}</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default AddCreatorForm;
