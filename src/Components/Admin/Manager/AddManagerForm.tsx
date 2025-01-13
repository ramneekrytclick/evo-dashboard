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
	Name,
	Password,
	EmailAddress,
	AddManager,
	CreateManagerTitle,
} from "@/Constant";
import { AddManagerFormProps } from "@/Types/Manager.type";
import { createNewManager } from "@/app/api/admin/team/manager";
import { useRouter } from "next/navigation";

const AddManagerForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<AddManagerFormProps>({
		name: "",
		username: "",
		email: "",
		password: "",
		dob: "",
		contactNumber: "",
		photo: "",
		about: "",
		address: "",
		workingMode: "WFH",
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try{
			const data = await createNewManager(formData);
			if (data) {
				alert("Manager Created!")
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
					title={AddManager}
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
								<Col md={12}>
									<Label>Working Mode:</Label>
									<Input
										type="select"
										name="select"
										onChange={(e)=>{setFormData({...formData,workingMode:e.target.value})}}
										bsSize={"sm"}>
											{["WFH","In-office"].map((item,index)=>
												<option value={item} key={index}>{item}</option>
											)}
									</Input>
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
									<Button color="primary">{CreateManagerTitle}</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default AddManagerForm;
