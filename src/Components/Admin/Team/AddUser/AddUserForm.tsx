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
import { addUserTitle, createUserTitle, EmailAddress, Name, Password, roleTitle } from "@/Constant";
import { createNewUser } from "@/app/api/admin/team";

const AddUserForm = () => {
	// const handleSubmit = (values: UserInitialValue) => {
	// 	console.log(values);
	// };
	const [formData, setFormData]=useState<AddUserFormProps>({name:"",email:"",password:"",role:"manager"})
	const handleSubmit = (e:FormEvent) =>{
		e.preventDefault();
		createNewUser(formData)
	}
	return (
		<Col sm={12}>
			<Card>
				<CommonCardHeader
					headClass="pb-0"
					title={addUserTitle}
					// span={basicFormSubTitle}
				/>
				<CardBody>
					<div className="card-wrapper border rounded-3">
						{/* <Formik
							initialValues={newUserInitialValue}
							validationSchema={newUserValidation}
							onSubmit={handleSubmit}> */}
							<Form onSubmit={handleSubmit}>
								<Row className="g-3">
									<Col md={12}>
										<Label>{Name}</Label>
										<Input
											name="name"
											type="text"
											placeholder="Enter Your Name"
											onChange={(e) => setFormData({...formData,name:e.target.value})}
										/>
										{/* <ErrorMessage
											name="name"
											component="span"
											className="text-danger"
										/> */}
									</Col>
									<Col md={12}>
										<Label>{EmailAddress}</Label>
										<Input
											name="email"
											type="email"
											placeholder="Enter Your Email"
											onChange={(e) => setFormData({...formData,email:e.target.value})}
										/>
										{/* <ErrorMessage
											name="email"
											component="span"
											className="text-danger"
										/> */}
									</Col>
									<Col md={12}>
										<Label>{Password}</Label>
										<Input
											name="password"
											type="password"
											placeholder="Enter Your Password"
											onChange={(e) => setFormData({...formData,password:e.target.value})}
										/>
										{/* <ErrorMessage
											name="password"
											component="span"
											className="text-danger"
										/> */}
									</Col>
									<Col md={12}>
                                        <Label>{roleTitle}</Label>
										<Input
											type="select"
											name="select"
											bsSize={"sm"}
											onChange={(e)=> setFormData({...formData,role:e.target.value})}
											>
											<option value="manager">{"Manager"}</option>
											<option value="creator">{"Creator"}</option>
											<option value="mentor">{"Mentor"}</option>
											<option value="student">{"Student"}</option>
											<option value="admin">{"Admin"}</option>
										</Input>
									</Col>
									<Col xs={12}>
										<Button color="primary">{createUserTitle}</Button>
									</Col>
								</Row>
							</Form>
						{/* </Formik> */}
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default AddUserForm;
