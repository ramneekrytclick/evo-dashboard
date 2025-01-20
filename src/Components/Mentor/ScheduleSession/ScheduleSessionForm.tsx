"use client";

import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row
} from "reactstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ScheduleSessionForm = () => {
	const [sessionData, setSessionData] = useState({
		studentId: "",
		batchId: "",
		topic: "",
		dateTime: ""
	});

	const [studentId, setStudentId] = useState("");
	const [batchId, setBatchId] = useState("");
	const [topic, setTopic] = useState("");
	const [dateTime, setDateTime] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!sessionData.studentId.trim() ||
			!sessionData.batchId.trim() ||
			!sessionData.topic.trim() ||
			!sessionData.dateTime.trim()
		) {
			toast.error("All fields are required!");
			return;
		}

		console.log("Session Data Submitted:", sessionData);

		try {
			// Submit the session data to the API
			toast.success("Session Scheduled Successfully!");
		} catch (error) {
			toast.error("Error Scheduling Session!");
		}
	};

	const handleReset = () => {
		setSessionData({
			studentId: "",
			batchId: "",
			topic: "",
			dateTime: ""
		});
	};

	useEffect(() => {
		setSessionData({
			studentId,
			batchId,
			topic,
			dateTime
		});
	}, [studentId, batchId, topic, dateTime]);

	return (
		<div>
			<Form
				className="needs-validation"
				onSubmit={handleSubmit}>
				<Row>
					<Col sm={12}>
						<FormGroup>
							<Label>Student ID:</Label>
							<Input
								type="text"
								placeholder="Enter Student ID"
								value={studentId}
								onChange={(e) => setStudentId(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Batch ID:</Label>
							<Input
								type="text"
								placeholder="Enter Batch ID"
								value={batchId}
								onChange={(e) => setBatchId(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Topic:</Label>
							<Input
								type="text"
								placeholder="Enter Topic"
								value={topic}
								onChange={(e) => setTopic(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Date & Time:</Label>
							<Input
								type="datetime-local"
								value={dateTime}
								onChange={(e) => setDateTime(e.target.value)}
							/>
						</FormGroup>
					</Col>
				</Row>
				<div className="btn-showcase text-end mt-4">
					<Button
						color="primary"
						type="submit">
						Schedule Session
					</Button>
					<Button
						color="light"
						type="button"
						onClick={handleReset}>
						Discard
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default ScheduleSessionForm;
