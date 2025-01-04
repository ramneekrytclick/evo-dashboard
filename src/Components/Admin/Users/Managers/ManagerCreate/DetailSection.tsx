import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import ReactDatePicker from "react-datepicker";
import { ContactNumber, Email, ManagerDOB, ManagerName, Username } from "@/Constant";

const DetailsSection = () => {
	const [date, setDate] = useState(new Date());
	return (
		<>
			<Row>
				<Col>
					<FormGroup>
						<Label>{ManagerName}</Label>
						<Field
							name="name"
							type="text"
							className="form-control"
							placeholder="Manager name *"
						/>
						<ErrorMessage
							name="name"
							component="span"
							className="text-danger"
						/>
					</FormGroup>
				</Col>
				<Col sm={5}>
					<FormGroup className="d-flex flex-column align-items-stretch">
						<Label>{ManagerDOB}</Label>
						<ReactDatePicker
							className="datepicker-here form-control"
							selected={date}
							onChange={(date: Date) => setDate(date)}
						/>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col sm={4}>
					<FormGroup>
						<Label>{Email}</Label>
						<Field
							name="email"
							type="email"
							className="form-control"
							placeholder="Manager email"
						/>
						<ErrorMessage
							name="email"
							component="span"
							className="text-danger"
						/>
					</FormGroup>
				</Col>
				<Col sm={4}>
					<FormGroup>
						<Label>{Username}</Label>
						<Field
							name="username"
							type="text"
							className="form-control"
							placeholder="Username"
						/>
						<ErrorMessage
							name="username"
							component="span"
							className="text-danger"
						/>
					</FormGroup>
				</Col>
				<Col sm={4}>
					<FormGroup>
						<Label>{ContactNumber}</Label>
						<Field
							name="contactNumber"
							type="text"
							className="form-control"
							placeholder="Contact Number"
						/>
						<ErrorMessage
							name="contactNumber"
							component="span"
							className="text-danger"
						/>
					</FormGroup>
				</Col>
				
			</Row>
		</>
	);
};

export default DetailsSection;
