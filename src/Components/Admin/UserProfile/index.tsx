// Final Refactored UserProfile with Left Image Layout
"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	CardBody,
	Spinner,
} from "reactstrap";
import {
	AtSign,
	Briefcase,
	Calendar,
	Mail,
	MapPin,
	MoreVertical,
	Phone,
	Smile,
	User,
	Users,
} from "react-feather";
import {
	Card,
	Col,
	Container,
	Row,
	Badge,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import {
	approveUser,
	getUserProfile,
	updateUserStatus,
} from "@/app/api/admin/team";
import { getMentors } from "@/app/api/admin/mentors";
import {
	assignMentorsToManager,
	updateAssignedMentors,
} from "@/app/api/admin/managers";
import { toast } from "react-toastify";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
import { Trash2 } from "react-feather";
import { BatchProps, WannaBeInterest } from "@/Types/Course.type";
import Link from "next/link";
import { getBatches } from "@/app/api/admin/batches";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";
import StudentCards from "./StudentCards";
import EmployerCards from "./EmployerCards";
import PublisherCards from "./PublisherCards";

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
	const [assignedBatches, setAssignedBatches] = useState<BatchProps[]>([]);
	const [interests, setInterests] = useState([]);

	const toggleModal = () => setModalOpen(!modalOpen);
	const togglePhotoModal = () => setPhotoModalOpen(!photoModalOpen);
	const toggleStatusModal = () => setStatusModalOpen(!statusModalOpen);
	const toggleApproveModal = () => setApproveModalOpen(!approveModalOpen);

	const openAssignModal = () => setModalOpen(true);
	const openStatusChangeModal = (action: "Active" | "Inactive" | "Banned") => {
		setActionType(action);
		setStatusModalOpen(true);
	};

	const handleAssignMentors = async () => {
		try {
			await updateAssignedMentors({
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
			toast.success(`${profile.name} approved as ${profile.role} successfully`);
			fetchData();
		} catch (error) {
			toast.error("Failed to approve user");
		}
	};

	const fetchData = async () => {
		setLoading(true);
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
			toast.error("Failed to fetch mentors");
		}
	};

	const fetchMentorBatches = async () => {
		try {
			const allBatches = await getBatches();
			console.log(allBatches);

			const assignedBatches = allBatches.batches?.filter(
				(batch: BatchProps) => batch?.mentor?._id === id
			);
			console.log(assignedBatches);
			setAssignedBatches(assignedBatches);
		} catch (error) {
			toast.error("Failed to fetch mentor batches");
			console.log(error);
		}
	};

	const getInterestName = async (wannaBeInterest: string) => {
		try {
			const allRes = await getWannaBeInterests();
			const interest = allRes.find(
				(i: WannaBeInterest) => i._id === wannaBeInterest
			);
			return interest.title;
		} catch (error) {
			toast.error("Failed to fetch interests");
			return "-";
		}
	};
	const mentorOptions = mentors.map((m) => ({
		value: m._id,
		label: m.name,
	}));
	const defaultMentors = mentorOptions.filter((opt) =>
		profile?.assignedMentors?.includes(opt.value)
	);
	const [selectedMentorOptions, setSelectedMentorOptions] =
		useState(defaultMentors);

	useEffect(() => {
		fetchData();
		fetchMentors();
		fetchMentorBatches();
	}, []);

	if (loading)
		return (
			<div className='text-center py-5'>
				<Spinner color='primary' />
				<p className='mt-3'>Loading user data...</p>
			</div>
		);
	if (error)
		return (
			<div className='text-center py-5 text-danger'>
				{"Error fetching user data"}
			</div>
		);
	if (!profile)
		return (
			<div className='text-center py-5 text-danger'>No profile found.</div>
		);

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
						md={5}
						xl={3}
						className='card d-flex justify-content-center align-items-center'
						style={{
							cursor: "pointer",
						}}>
						<Image
							src={
								profile.photo
									? getImageURL(profile.photo)
									: "/assets/images/user/1.jpg"
							}
							width={300}
							height={300}
							alt='Profile Photo'
							style={{ borderRadius: "12px", objectFit: "cover" }}
							onClick={togglePhotoModal}
						/>
						<div className='d-flex align-items-center justify-content-center mt-2 gap-1'>
							{/* Approval Dot */}
							{profile.role !== "Student" && (
								<>
									<div
										id={`approved-dot-${profile._id}`}
										style={{
											width: "20px",
											height: "20px",
											borderRadius: "50%",
											backgroundColor: profile.isApproved
												? "#28a745"
												: "#dc3545",
											cursor: "pointer",
										}}></div>
									<UncontrolledTooltip
										placement='top'
										target={`approved-dot-${profile._id}`}>
										{profile.isApproved ? "Approved" : "Not Approved"}
									</UncontrolledTooltip>
								</>
							)}

							{/* Status Dot */}
							<div
								id={`status-dot-${profile._id}`}
								style={{
									width: "20px",
									height: "20px",
									borderRadius: "50%",
									backgroundColor:
										profile.status === "Active"
											? "#007bff" // blue
											: profile.status === "Banned"
											? "#dc3545" // red
											: "#6c757d", // grey
									cursor: "pointer",
								}}></div>
							<UncontrolledTooltip
								placement='top'
								target={`status-dot-${profile._id}`}>
								{profile.status}
							</UncontrolledTooltip>
						</div>
					</Col>

					<Col
						md={6}
						xl={9}>
						<Row className='mb-2 fw-light text-md-start align-items-center justify-content-center text-sm-center'>
							<Col md={12}>
								<h4 className='fw-bold text-uppercase mt-3 d-flex align-items-center justify-content-between text-sm-center'>
									{profile.name}
									<UncontrolledDropdown className='d-inline-block'>
										<DropdownToggle
											tag='button'
											className='btn btn-white btn-icon'
											style={{ boxShadow: "none", border: "none" }}>
											<MoreVertical size={20} />
										</DropdownToggle>
										<DropdownMenu end>
											{!profile.isApproved && profile.role !== "Student" && (
												<DropdownItem
													className='fs-5 py-3 text-dark '
													onClick={toggleApproveModal}>
													Approve
												</DropdownItem>
											)}
											<DropdownItem
												className='fs-5 py-3 text-dark '
												onClick={() =>
													openStatusChangeModal(
														profile.status === "Active" ? "Inactive" : "Active"
													)
												}>
												{profile.status === "Active"
													? "Deactivate"
													: "Activate"}
											</DropdownItem>
											<DropdownItem
												className='fs-5 py-3 text-dark '
												onClick={() => openStatusChangeModal("Banned")}>
												Ban
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
								</h4>
								<p className='text-primary'>{profile.role}</p>
							</Col>
							<Col
								md={12}
								className='d-flex align-items-center justify-content-start mb-2 text-sm-center'>
								{profile.address && (
									<>
										<MapPin size={16} />
										<span className='ms-1'>{profile.address}</span>
									</>
								)}
							</Col>
							<Col
								md={12}
								className='d-flex align-items-center justify-content-start mb-4 text-sm-center'>
								{isPublisher && profile.bio && (
									<>
										<Row>
											<strong className='d-flex align-items-center gap-1'>
												{profile.bio}
											</strong>
										</Row>
									</>
								)}
							</Col>
						</Row>
						<Row className='mb-2 '>
							{profile.email && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Mail size={17} /> Email
									</strong>
									{profile.email}
								</Col>
							)}
							{profile.contactNumber && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Phone size={17} />
										Phone
									</strong>{" "}
									{profile.contactNumber}
								</Col>
							)}
							{profile.dob && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Calendar size={17} />
										DOB
									</strong>{" "}
									{new Date(profile.dob).toDateString()}
								</Col>
							)}
							{profile.education && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Calendar size={17} />
										Education
									</strong>{" "}
									{profile.education}
								</Col>
							)}
							{!isEmployer && profile.preferredLanguages && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Calendar size={17} />
										Languages
									</strong>{" "}
									{profile.preferredLanguages.join(", ")}
								</Col>
							)}
							{profile.createdAt && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Calendar size={17} />
										Joined
									</strong>{" "}
									{new Date(profile.createdAt).toDateString()}
								</Col>
							)}
							{isStudent && profile.wannaBeInterest && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Briefcase size={17} />
										WannaBe Interest
									</strong>{" "}
									{getInterestName(profile.wannaBeInterest)}
								</Col>
							)}
							{isStudent && profile.experience && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Briefcase size={17} />
										Experience
									</strong>{" "}
									{profile.experience.join(", ")}
								</Col>
							)}
							{isMentor && profile.expertise && (
								<Col
									sm={5}
									md={12}
									className='my-2'>
									<strong className='d-flex align-items-center gap-1'>
										<Smile size={17} />
										Expertise
									</strong>{" "}
									{profile.expertise}
								</Col>
							)}

							{isEmployer && profile.companyName && (
								<Col
									sm={12}
									md={6}
									xl={4}
									className='my-2'>
									<strong>Company:</strong> {profile.companyName}
								</Col>
							)}
							{(isManager || isCourseCreator || isMentor || isPublisher) &&
								profile.workingMode && (
									<Col
										sm={3}
										md={5}
										className='my-2'>
										<strong className='d-flex align-items-center gap-1'>
											<Briefcase size={17} />
											WorkingMode
										</strong>{" "}
										{profile.workingMode}
									</Col>
								)}
						</Row>

						<div className='mt-3 d-flex gap-2 flex-wrap'>
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

			{isManager && (
				<Card>
					<CardBody>
						<Col
							sm={3}
							md={6}>
							<strong className='d-flex align-items-center gap-1'>
								<Users size={17} />
								Assigned Mentors:
							</strong>
							{profile.assignedMentors?.length > 0 ? (
								profile.assignedMentors?.map((mentorId: string) => (
									<div
										key={mentorId}
										className='d-flex'>
										<div>
											{mentors.find((mentor) => mentor._id === mentorId)?.name}
										</div>
										<div
											className='bg-danger text-white rounded-circle d-flex justify-content-center align-items-center'
											style={{
												width: "20px",
												height: "20px",
												marginTop: "5px",
												marginLeft: "5px",
											}}
											onClick={async () => {
												try {
													const updatedMentorIds =
														profile.assignedMentors.filter(
															(id: string) => id !== mentorId
														);
													await updateAssignedMentors({
														managerId: profile._id,
														mentorIds: updatedMentorIds,
													});
													toast.success("Mentor removed successfully");
													fetchData(); // Refresh profile data
												} catch (error) {
													console.error("Failed to remove mentor:", error);
													toast.error("Failed to remove mentor");
												}
											}}>
											<Trash2 size={10} />
										</div>
									</div>
								))
							) : (
								<>
									<div>No assigned mentors</div>
								</>
							)}
						</Col>
					</CardBody>
				</Card>
			)}
			{isMentor && (
				<Card
					className='mt-4 shadow-lg'
					color='light'>
					<CardBody>
						<h5 className='fw-semibold mb-3'>Assigned Batches</h5>
						{assignedBatches.length > 0 ? (
							<div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
								<div className='d-flex gap-3 text-center'>
									{assignedBatches.map((batch) => (
										<div
											key={batch._id}
											className='shadow-sm rounded card bg- py-4 py-1'
											style={{
												minWidth: "370px",
												cursor: "pointer",
											}}
											onClick={() => {
												if (batch.slug) {
													window.open(`/admin/batches/slug/${batch.slug}`);
												} else {
													toast.warning("This batch has no slug assigned");
												}
											}}>
											<h6 className='fw-bold fs-6'>{batch.name}</h6>
											<p className='mb-1 text-muted'>
												{batch.course?.title || "No Course"}
											</p>
											<p className='mb-0'>
												{new Date(batch.startDate || "").toLocaleDateString()} -{" "}
												{new Date(batch.endDate || "").toLocaleDateString()}
											</p>
											<p
												className='text-muted mb-0'
												style={{ fontSize: "0.85rem" }}>
												{batch.batchWeekType} | {batch.time}
											</p>
										</div>
									))}
								</div>
							</div>
						) : (
							<div className='py-3 text-muted'>
								<p>No batches assigned to mentor</p>
								<Link href={`/admin/batches`}>
									<Button color='dark'>View All Batches</Button>
								</Link>
							</div>
						)}
					</CardBody>
				</Card>
			)}
			{isStudent && <StudentCards profile={profile} />}
			{isPublisher && <PublisherCards profile={profile} />}
			{isEmployer && <EmployerCards profile={profile} />}
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
						src={
							profile.photo
								? getImageURL(profile.photo)
								: "/assets/images/user/1.jpg"
						}
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
						color='outline-primary'
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
						color='outline-success'
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
						<Select
							isMulti
							options={mentorOptions}
							value={selectedMentorOptions}
							onChange={(selected) => {
								const mutableSelected = [...selected]; // convert readonly to mutable
								setSelectedMentorOptions(mutableSelected);
								setSelectedMentorIds(mutableSelected.map((s) => s.value));
							}}
						/>
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
