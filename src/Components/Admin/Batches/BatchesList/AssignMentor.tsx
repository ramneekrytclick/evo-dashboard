"use client";

import { useEffect, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Label,
	Input,
	FormGroup,
	Row,
	Col,
} from "reactstrap";
import { toast } from "react-toastify";
import { assignMentorToBatch } from "@/app/api/admin/batches";
import { getMentors } from "@/app/api/admin/mentors";

const AssignMentorModal = ({
	batchId,
	isOpen,
	toggle,
	fetchData,
	currentMentor,
}: {
	batchId: string;
	isOpen: boolean;
	batchCourseId: string;
	toggle: () => void;
	fetchData: () => void;
	currentMentor: string;
}) => {
	const [mentorId, setMentorId] = useState("");
	const [mentors, setMentors] = useState<any[]>([]);
	const [selectedMentor, setSelectedMentor] = useState<any>(null);

	const handleAssign = async () => {
		if (!mentorId.trim()) return toast.error("Please select a Mentor");

		try {
			await assignMentorToBatch({ batchId, mentorId });
			toast.success("Mentor assigned successfully!");
			toggle();
			fetchData();
			setMentorId("");
			setSelectedMentor(null);
		} catch (err) {
			console.error(err);
			toast.error("Failed to assign mentor");
		}
	};

	const fetchMentors = async () => {
		try {
			const response = await getMentors();
			const filtered = response.filter(
				(mentor: any) => mentor.isApproved && mentor.status === "Active"
			);
			setMentors(filtered);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		if (isOpen) {
			fetchMentors();
			setMentorId(currentMentor); // ⬅️ Set the selected mentor on open
		}
	}, [isOpen, currentMentor]);

	useEffect(() => {
		if (isOpen) {
			fetchMentors();
		}
	}, [isOpen]);

	const handleMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.value;
		setMentorId(id);
		const mentor = mentors.find((m) => m._id === id);
		setSelectedMentor(mentor || null);
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Assign Mentor</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label>Select a Mentor</Label>
					<Input
						type="select"
						value={mentorId}
						onChange={handleMentorChange}>
						<option value="">-- Select Mentor --</option>
						{mentors.map((mentor) => (
							<option
								key={mentor._id}
								value={mentor._id}>
								{mentor.name} ({mentor.email})
							</option>
						))}
					</Input>
				</FormGroup>

				{selectedMentor && (
					<div className="border rounded p-3 mt-3 bg-light-warning">
						<Row>
							<Col md="4">
								<img
									src={`/${selectedMentor.photo}`}
									alt={selectedMentor.name}
									className="img-fluid rounded"
								/>
							</Col>
							<Col md="8">
								<p>
									<strong>Name:</strong> {selectedMentor.name}
								</p>
								<p>
									<strong>Email:</strong> {selectedMentor.email}
								</p>
								<p>
									<strong>Expertise:</strong>{" "}
									{selectedMentor.expertise || "N/A"}
								</p>
								<p>
									<strong>Working Mode:</strong>{" "}
									{selectedMentor.workingMode || "N/A"}
								</p>
								<p>
									<strong>Contact:</strong>{" "}
									{selectedMentor.contactNumber || "N/A"}
								</p>
							</Col>
						</Row>
					</div>
				)}
			</ModalBody>
			<ModalFooter>
				<Button
					color="success"
					onClick={handleAssign}
					disabled={!mentorId}>
					Assign
				</Button>
				<Button
					color="outline-success"
					onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default AssignMentorModal;
