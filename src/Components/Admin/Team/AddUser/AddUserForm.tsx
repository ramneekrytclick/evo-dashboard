import { FormEvent, useCallback, useState } from "react";
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
import { AddUserFormProps } from "@/Types/Team.type";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {
	addUserTitle,
	createUserTitle,
	EmailAddress,
	Name,
	Password,
	roleTitle,
} from "@/Constant";
import { createNewUser } from "@/app/api/admin/team";
import { useRouter } from "next/navigation";

const AddUserForm = () => {
	const router =useRouter();
	const [formData, setFormData] = useState<AddUserFormProps>({
		name: "",
		email: "",
		password: "",
		role: "Manager",
	});
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		try{
			const response = createNewUser(formData);
			console.log(response);
			alert("User Created Successfully!")
		}
		catch(error) {
			alert("Error creating user");
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
					title={addUserTitle}
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
								<Col md={12}>
									<Label>{roleTitle}</Label>
									<Input
										type="select"
										name="select"
										bsSize={"sm"}
										onChange={(e) =>
											setFormData({ ...formData, role: e.target.value })
										}>
										<option value="Manager">{"Manager"}</option>
										<option value="Creator">{"Creator"}</option>
										<option value="Mentor">{"Mentor"}</option>
										<option value="Student">{"Student"}</option>
										<option value="Admin">{"Admin"}</option>
									</Input>
								</Col>
								<Col xs={12}>
									<Button color="primary">{createUserTitle}</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default AddUserForm;
