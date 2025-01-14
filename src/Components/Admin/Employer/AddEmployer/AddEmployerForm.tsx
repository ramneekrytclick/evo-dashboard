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
import { EmployerProps } from "@/Types/Employer.type";
import { createEmployer } from "@/app/api/admin/employers";

const AddEmployerForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<EmployerProps>({
		_id: "",
		name: "",
		email: "",
		password: "",
		contactNumber: "",
		photo: "",
		industry: "",
		address: "",
		companySize: "",
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await createEmployer(formData);
			console.log(response);
			router.push("/admin/employers");
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
										placeholder="Enter Employer Name"
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
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
									<Label>Password</Label>
									<Input
										type="password"
										placeholder="Enter Password"
										onChange={(e) =>
											setFormData({ ...formData, password: e.target.value })
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
									<Label>Photo</Label>
									<Input
										type="text"
										placeholder="Enter Photo URL"
										onChange={(e) =>
											setFormData({
												...formData,
												photo: e.target.value,
											})
										}
									/>
								</Col>
								<Col md={12}>
									<Label>Industry</Label>
									<Input
										type="text"
										placeholder="Enter Industry"
										onChange={(e) =>
											setFormData({
												...formData,
												industry: e.target.value,
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
									<Label>Company Size</Label>
									<Input
										type="text"
										placeholder="Enter Company Size"
										onChange={(e) =>
											setFormData({
												...formData,
												companySize: e.target.value,
											})
										}
									/>
								</Col>
								<Col xs={12}>
									<Button color="primary">Create Employer</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default AddEmployerForm;
