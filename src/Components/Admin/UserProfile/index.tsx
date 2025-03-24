"use client";
import React, { useEffect, useState } from "react";
import {
	Col,
	Card,
	CardBody,
	Container,
	Row,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge,
	Label,
	Input,
	FormGroup,
} from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { getUserProfile } from "@/app/api/admin/team";
import { getMentors } from "@/app/api/admin/mentors";
import { assignMentorsToManager } from "@/app/api/admin/managers";
import { toast } from "react-toastify";

const UserProfile = ({ id }: { id: string }) => {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [modalOpen, setModalOpen] = useState(false);
	const [mentors, setMentors] = useState<any[]>([]);
	const [selectedMentorIds, setSelectedMentorIds] = useState<string[]>([]);

	const toggleModal = () => setModalOpen(!modalOpen);
	const openAssignModal = () => setModalOpen(true);

	const handleMentorSelection = (mentorId: string) => {
		setSelectedMentorIds((prev) =>
			prev.includes(mentorId)
				? prev.filter((id) => id !== mentorId)
				: [...prev, mentorId]
		);
	};

	const handleAssignMentors = async () => {
		try {
			await assignMentorsToManager({
				managerId: profile._id,
				mentorIds: selectedMentorIds,
			});
			toast.success("Successfully assigned mentors to manager");
			fetchData();
		} catch (error: any) {
			console.log(error);
			toast.error("Failed to assign mentors");
		}
		toggleModal();
	};

	const fetchData = async () => {
		try {
			const response = await getUserProfile(id);
			setProfile(response);
		} catch (err) {
			setError("Failed to load profile.");
		} finally {
			setLoading(false);
		}
	};

	const fetchMentors = async () => {
		try {
			const response = await getMentors();
			setMentors(response);
		} catch (error) {
			console.error("Failed to fetch mentors:", error);
		}
	};

	useEffect(() => {
		fetchData();
		fetchMentors();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!profile) return <div>No profile found.</div>;

	const renderRoleSpecificDetails = () => {
		switch (profile.role) {
			case "Student":
				return (
					<>
						<p>
							<span className="fw-bold">Wanna Be Interest: </span>
							{profile.wannaBeInterest || "N/A"}
						</p>
						<p>
							<span className="fw-bold">Enrolled Courses: </span>
							{profile.enrolledCourses?.length || 0}
						</p>
					</>
				);
			case "Mentor":
				return (
					<>
						<p>
							<span className="fw-bold">Expertise: </span>
							{profile.expertise || "N/A"}
						</p>
						<p>
							<span className="fw-bold">Assigned Mentors: </span>
							{profile.assignedMentors?.length || 0}
						</p>
					</>
				);
			case "Manager":
				return (
					<>
						<p>
							<span className="fw-bold">Assigned Mentors: </span>
							{profile.assignedMentors?.length || 0}
						</p>
						<Button
							color="dark"
							onClick={openAssignModal}>
							Assign Mentors to Manager
						</Button>
					</>
				);
			case "Publisher":
				return (
					<>
						<p>
							<span className="fw-bold">Published Content: </span>
							{profile.enrolledCourses?.length || 0}
						</p>
					</>
				);
			case "Employer":
				return (
					<>
						<p>
							<span className="fw-bold">Company Name: </span>
							{profile.companyName || "N/A"}
						</p>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<Breadcrumbs
				mainTitle={`${profile.name} Profile`}
				parent={profile.role}
				title="Profile"
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<Col
							xxl={5}
							className="box-col-6 order-xxl-0 order-1">
							<Card>
								<CardBody>
									<div className="product-page-details">
										<h3>{profile.name}</h3>
									</div>
									<div className="product-price">
										<span className="fw-bold">Role: </span> {profile.role}
									</div>
									<ul className="product-color mt-3">
										<li
											className={`bg-${
												profile.isApproved ? "success" : "danger"
											}`}
											title={`Approval Status: ${
												profile.isApproved ? "Approved" : "Pending"
											}`}
										/>
										<li
											className={`bg-${
												profile.status === "Active"
													? "primary"
													: profile.status === "Banned"
													? "danger"
													: "secondary"
											}`}
											title={`Account Status: ${profile.status}`}
										/>
									</ul>
									<hr />
									<p>
										<span className="fw-bold">Email: </span> {profile.email}
									</p>
									{renderRoleSpecificDetails()}
									<hr />
									<p>
										<span className="fw-bold">Created At: </span>{" "}
										{new Date(profile.createdAt).toLocaleString()}
									</p>
									<p>
										<span className="fw-bold">Updated At: </span>{" "}
										{new Date(profile.updatedAt).toLocaleString()}
									</p>
								</CardBody>
							</Card>
						</Col>
					</Col>
				</Row>
			</Container>

			{/* Assign Mentors Modal */}
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered
				size="lg">
				<ModalHeader toggle={toggleModal}>
					Assign Mentors to {profile.name}
				</ModalHeader>
				<ModalBody>
					{mentors.length === 0 ? (
						<p>No mentors available.</p>
					) : (
						<Row>
							{mentors.map((mentor) => (
								<Col
									md={6}
									key={mentor._id}
									className="mb-2">
									<FormGroup check>
										<Label check>
											<Input
												type="checkbox"
												checked={selectedMentorIds.includes(mentor._id)}
												onChange={() => handleMentorSelection(mentor._id)}
											/>{" "}
											<Badge
												color={
													mentor.status === "Active" ? "success" : "secondary"
												}>
												{mentor.name}
											</Badge>{" "}
											<span className="text-muted">({mentor.email})</span>
										</Label>
									</FormGroup>
								</Col>
							))}
						</Row>
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						color="dark"
						onClick={toggleModal}>
						Cancel
					</Button>
					<Button
						color="success"
						onClick={handleAssignMentors}
						disabled={selectedMentorIds.length === 0}>
						Assign Selected
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default UserProfile;
