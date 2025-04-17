// Final Refactored UserProfile with Left Image Layout
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
import {
	approveUser,
	getUserProfile,
	updateUserStatus,
} from "@/app/api/admin/team";
import { getMentors } from "@/app/api/admin/mentors";
import { assignMentorsToManager } from "@/app/api/admin/managers";
import { toast } from "react-toastify";
import Image from "next/image";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

const UserProfile = ({ id }: { id: string }) => {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [mentors, setMentors] = useState<any[]>([]);
	const [selectedMentorIds, setSelectedMentorIds] = useState<string[]>([]);
	const [photoModalOpen, setPhotoModalOpen] = useState(false);
	const [statusModalOpen, setStatusModalOpen] = useState(false);
	const [actionType, setActionType] = useState<
		"Active" | "Inactive" | "Banned"
	>("Active");
	const [approveModalOpen, setApproveModalOpen] = useState(false);

	const toggleModal = () => setModalOpen(!modalOpen);
	const togglePhotoModal = () => setPhotoModalOpen(!photoModalOpen);
	const toggleStatusModal = () => setStatusModalOpen(!statusModalOpen);
	const toggleApproveModal = () => setApproveModalOpen(!approveModalOpen);

	const handleMentorSelection = (mentorId: string) => {
		setSelectedMentorIds((prev) =>
			prev.includes(mentorId)
				? prev.filter((id) => id !== mentorId)
				: [...prev, mentorId]
		);
	};

	const openAssignModal = () => setModalOpen(true);
	const openStatusChangeModal = (action: "Active" | "Inactive" | "Banned") => {
		setActionType(action);
		setStatusModalOpen(true);
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

	const handleStatusChange = async () => {
		try {
			await updateUserStatus(profile._id, actionType);
			toggleStatusModal();
			toast.success(`${profile.name} status updated to ${actionType}`);
			fetchData();
		} catch (error) {
			toast.error("Failed to update status");
		}
	};

	const handleApproveUser = async () => {
		try {
			await approveUser(profile._id, "approve");
			toggleApproveModal();
			toast.success(`${profile.name} approved successfully`);
			fetchData();
		} catch (error) {
			toast.error("Failed to approve user");
		}
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

	const resolvedPhoto = profile.photo ? profile.photo.replace(/\\/g, "/") : "";
	const profilePhotoUrl = resolvedPhoto.startsWith("uploads")
		? `${backendURL}/${resolvedPhoto}`
		: `${backendURL}/uploads/${resolvedPhoto}`;

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
				title='Profile'
			/>
			<Card className='p-4'>
				<Row className='align-items-center'>
					<Col
						md={3}
						className='text-center'>
						<Image
							src={
								profile.photo ? profilePhotoUrl : "/assets/images/user/1.jpg"
							}
							width={300}
							height={300}
							alt='Profile Photo'
							style={{ borderRadius: "12px", objectFit: "cover" }}
							onClick={togglePhotoModal}
						/>
					</Col>
					<Col md={9}>
						<h4 className='fw-bold text-uppercase'>{profile.name}</h4>
						<p className='text-muted'>{profile.role}</p>
						<Row className='mb-2'>
							{profile.email && (
								<Col md={6}>
									<strong>Email:</strong> {profile.email}
								</Col>
							)}
							{profile.contactNumber && (
								<Col md={6}>
									<strong>Contact:</strong> {profile.contactNumber}
								</Col>
							)}
							{profile.dob && (
								<Col md={6}>
									<strong>DOB:</strong> {new Date(profile.dob).toDateString()}
								</Col>
							)}
							{profile.address && (
								<Col md={6}>
									<strong>Address:</strong> {profile.address}
								</Col>
							)}
						</Row>
						<Row>
							{isStudent && profile.wannaBeInterest && (
								<Col md={6}>
									<strong>WannaBe Interest:</strong> {profile.wannaBeInterest}
								</Col>
							)}
							{isMentor && profile.expertise && (
								<Col md={6}>
									<strong>Expertise:</strong> {profile.expertise}
								</Col>
							)}
							{isPublisher && profile.bio && (
								<Col md={6}>
									<strong>Bio:</strong> {profile.bio}
								</Col>
							)}
							{isEmployer && profile.companyName && (
								<Col md={6}>
									<strong>Company:</strong> {profile.companyName}
								</Col>
							)}
							{(isManager || isCourseCreator || isMentor || isPublisher) &&
								profile.workingMode && (
									<Col md={6}>
										<strong>Mode:</strong> {profile.workingMode}
									</Col>
								)}
							{isManager && (
								<Col md={6}>
									<strong>Assigned Mentors:</strong>
									{JSON.stringify(profile.assignedMentors)}
								</Col>
							)}
						</Row>
						<div className='mt-3'>
							<Badge
								color={profile.isApproved ? "success" : "danger"}
								className='me-2'>
								{profile.isApproved ? "Approved" : "Approval Pending"}
							</Badge>
							<Badge
								color={
									profile.status === "Active"
										? "primary"
										: profile.status === "Banned"
										? "danger"
										: "secondary"
								}>
								{profile.status}
							</Badge>
						</div>
						<div className='mt-3 d-flex gap-2 flex-wrap'>
							{!profile.isApproved && (
								<Button
									color='success'
									onClick={toggleApproveModal}>
									Approve
								</Button>
							)}
							<Button
								color={profile.status === "Active" ? "warning" : "success"}
								onClick={() =>
									openStatusChangeModal(
										profile.status === "Active" ? "Inactive" : "Active"
									)
								}>
								{profile.status === "Active" ? "Deactivate" : "Activate"}
							</Button>
							<Button
								color='danger'
								onClick={() => openStatusChangeModal("Banned")}>
								Ban
							</Button>
							{isManager && (
								<Button
									color='dark'
									onClick={openAssignModal}>
									Assign Mentors
								</Button>
							)}
						</div>
					</Col>
				</Row>
			</Card>

			{/* Modals */}
			<Modal
				isOpen={photoModalOpen}
				toggle={togglePhotoModal}
				centered
				size='lg'>
				<ModalHeader toggle={togglePhotoModal}>
					Profile Photo - {profile.name}
				</ModalHeader>
				<ModalBody className='text-center'>
					<Image
						src={profile.photo ? profilePhotoUrl : "/assets/images/user/1.jpg"}
						alt='Full Profile'
						width={500}
						height={500}
						style={{ objectFit: "contain", borderRadius: 8 }}
					/>
				</ModalBody>
			</Modal>

			<Modal
				isOpen={statusModalOpen}
				toggle={toggleStatusModal}
				centered>
				<ModalHeader toggle={toggleStatusModal}>
					Confirm Status Change
				</ModalHeader>
				<ModalBody>
					Are you sure you want to set <strong>{profile.name}</strong> as{" "}
					<Badge
						color={
							actionType === "Active"
								? "success"
								: actionType === "Inactive"
								? "warning"
								: "danger"
						}
						pill>
						{actionType}
					</Badge>
					?
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary'
						onClick={toggleStatusModal}>
						Cancel
					</Button>
					<Button
						color={
							actionType === "Active"
								? "success"
								: actionType === "Inactive"
								? "warning"
								: "danger"
						}
						onClick={handleStatusChange}>
						Yes, Change Status
					</Button>
				</ModalFooter>
			</Modal>

			<Modal
				isOpen={approveModalOpen}
				toggle={toggleApproveModal}
				centered>
				<ModalHeader toggle={toggleApproveModal}>Confirm Approval</ModalHeader>
				<ModalBody>
					Approve <strong>{profile.name}</strong> as{" "}
					<strong>{profile.role}</strong>?
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary'
						onClick={toggleApproveModal}>
						Cancel
					</Button>
					<Button
						color='success'
						onClick={handleApproveUser}>
						Yes, Approve
					</Button>
				</ModalFooter>
			</Modal>

			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered
				size='lg'>
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
									className='mb-2'>
									<FormGroup check>
										<Label check>
											<Input
												type='checkbox'
												defaultChecked={profile.assignedMentors?.includes(
													mentor._id
												)}
												disabled={profile.assignedMentors?.includes(mentor._id)}
												onChange={() => handleMentorSelection(mentor._id)}
											/>
											{mentor.name} -
											<Badge
												pill
												color={
													mentor.status === "Active" ? "success" : "secondary"
												}>
												<span className='fs-6'> {mentor.email}</span>
											</Badge>{" "}
										</Label>
									</FormGroup>
								</Col>
							))}
						</Row>
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						color='dark'
						onClick={toggleModal}>
						Cancel
					</Button>
					<Button
						color='success'
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
