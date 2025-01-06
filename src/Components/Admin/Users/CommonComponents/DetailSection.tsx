"use client";
import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import ReactDatePicker from "react-datepicker";
import {
	AboutTitle,
	Address,
	ContactNumber,
	DOBTitle,
	Education,
	Email,
	ManagerDOB,
	ManagerName,
	Name,
	ProfilePhotoTitle,
	Username,
} from "@/Constant";

const DetailsSection = () => {
	const [date, setDate] = useState(new Date());
	return (
		<>
			<Row>
				<Col>
					<FormGroup>
						<Label>{Name}</Label>
						<Field
							name="name"
							type="text"
							className="form-control"
							placeholder="Name *"
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
						<Label>{DOBTitle}</Label>
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
				<FormGroup>
					<Label htmlFor="formFile">{ProfilePhotoTitle}</Label>
					<Input
						id="formFile"
						type="file"
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="about">{AboutTitle}</Label>
					<Input
						type="textarea"
						className="btn-square"
						id="about"
						rows="3"
					/>
				</FormGroup>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label htmlFor="education">{Education}</Label>
							<Input
								type="textarea"
								className="btn-square"
								id="education"
								rows="2"
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label htmlFor="address">{Address}</Label>
							<Input
								type="textarea"
								className="btn-square"
								id="address"
								rows="2"
							/>
						</FormGroup>
					</Col>
				</Row>
			</Row>
		</>
	);
};

export default DetailsSection;
