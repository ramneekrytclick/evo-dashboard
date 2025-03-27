// Final Refactored UserProfile with Role-Based Field Visibility
"use client";
import React, { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
	Badge,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	Input,
	FormGroup,
} from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { getUserProfile } from "@/app/api/admin/team";
import { getMentors } from "@/app/api/admin/mentors";
import { assignMentorsToManager } from "@/app/api/admin/managers";
import { toast } from "react-toastify";
import Image from "next/image";

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

	const isStudent = profile.role === "Student";
	const isMentor = profile.role === "Mentor";
	const isManager = profile.role === "Manager";
	const isPublisher = profile.role === "Publisher";
	const isCourseCreator = profile.role === "Course Creator";
	const isEmployer = profile.role === "Employer";

	return (
		<Container fluid>
			<Breadcrumbs
				mainTitle={`${profile.name} Profile`}
				parent={profile.role}
				title="Profile"
			/>
			<Card className="hovercard text-center">
				{/* <div
					className="cardheader bg-cover"
					style={{ backgroundImage: "url('/images/bg.jpg')", height: 250 }}
				/> */}
				<div className="user-image">
					<div className="avatar">
						<Image
							src={`/${profile.photo || "assets/images/user/1.jpg"}`}
							width={100}
							height={100}
							className="rounded-circle border border-white mt-2"
							alt="Profile"
						/>
					</div>
				</div>
				<CardBody>
					<h4 className="mb-0 mt-5 text-uppercase fw-bold">{profile.name}</h4>
					<p className="text-muted text-capitalize">{profile.role}</p>
					<Row className="my-4 text-start px-4 justify-content-center">
						<Col
							sm={6}
							md={3}
							className="mb-3">
							<h6>
								<i className="fa fa-envelope me-2" />
								Email
							</h6>
							<p>{profile.email}</p>
						</Col>
						{profile.dob && (
							<Col
								sm={6}
								md={3}
								className="mb-3">
								<h6>
									<i className="fa fa-calendar me-2" />
									DOB
								</h6>
								<p>{new Date(profile.dob).toDateString()}</p>
							</Col>
						)}
						{profile.contactNumber && (
							<Col
								sm={6}
								md={3}
								className="mb-3">
								<h6>
									<i className="fa fa-phone me-2" />
									Contact
								</h6>
								<p>{profile.contactNumber}</p>
							</Col>
						)}
						{profile.address && (
							<Col
								sm={6}
								md={3}
								className="mb-3">
								<h6>
									<i className="fa fa-map-marker me-2" />
									Location
								</h6>
								<p>{profile.address}</p>
							</Col>
						)}
					</Row>

					<Row className="mb-3 px-4 justify-content-center">
						{isStudent && profile.wannaBeInterest && (
							<Col md={3}>
								<strong>WannaBe Interest:</strong> {profile.wannaBeInterest}
							</Col>
						)}
						{isMentor && profile.expertise && (
							<Col md={3}>
								<strong>Expertise:</strong> {profile.expertise}
							</Col>
						)}
						{isPublisher && profile.bio && (
							<Col md={3}>
								<strong>Bio:</strong> {profile.bio}
							</Col>
						)}
						{isEmployer && profile.companyName && (
							<Col md={3}>
								<strong>Company:</strong> {profile.companyName}
							</Col>
						)}
						{(isManager || isCourseCreator || isMentor || isPublisher) &&
							profile.workingMode && (
								<Col md={3}>
									<strong>Mode:</strong> {profile.workingMode}
								</Col>
							)}
					</Row>

					<Row className="mb-3 justify-content-center">
						{isStudent && (
							<Col
								xs={6}
								md={3}
								className="border-end">
								<h5 className="counter">
									{profile.enrolledCourses?.length || 0}
								</h5>
								<span>Enrolled Courses</span>
							</Col>
						)}
						{isManager && (
							<Col
								xs={6}
								md={3}>
								<h5 className="counter">
									{profile.assignedMentors?.length || 0}
								</h5>
								<span>Assigned Mentors</span>
							</Col>
						)}
					</Row>

					<ul className="list-inline">
						<li className="list-inline-item">
							<i className="fa fa-facebook" />
						</li>
						<li className="list-inline-item">
							<i className="fa fa-google-plus" />
						</li>
						<li className="list-inline-item">
							<i className="fa fa-twitter" />
						</li>
						<li className="list-inline-item">
							<i className="fa fa-instagram" />
						</li>
						<li className="list-inline-item">
							<i className="fa fa-rss" />
						</li>
					</ul>

					<div className="mt-3">
						<span
							className={`badge bg-${
								profile.isApproved ? "success" : "danger"
							} me-2`}>
							{profile.isApproved ? "Approved" : "Approval Pending"}
						</span>
						<span
							className={`badge bg-${
								profile.status === "Active"
									? "primary"
									: profile.status === "Banned"
									? "danger"
									: "secondary"
							}`}>
							{profile.status}
						</span>
					</div>

					{isManager && (
						<Button
							color="dark"
							className="mt-4"
							onClick={openAssignModal}>
							Assign Mentors
						</Button>
					)}
				</CardBody>
			</Card>

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
											/>
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
		</Container>
	);
};

export default UserProfile;
