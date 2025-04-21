"use client";
import { useEffect, useState } from "react";
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
	Form,
} from "reactstrap";
import { getMyProfile, updateProfile } from "@/app/api";
import { useAuth } from "@/app/AuthProvider";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
import { toast } from "react-toastify";
import { getAllWannaBeInterests } from "@/app/api/cc";
import { Edit } from "react-feather";

const MyProfilePage = () => {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [photoModalOpen, setPhotoModalOpen] = useState(false);
	const [wannaBeInterests, setWannaBeInterests] = useState<any>([]);
	const { user } = useAuth();
	const role = user?.role || "";
	const [editModalOpen, setEditModalOpen] = useState(false);
	const toggleEditModal = () => setEditModalOpen(!editModalOpen);
	const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setProfile((prev: any) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleProfileUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			Object.entries(profile).forEach(([key, value]) => {
				if (value !== null && value !== undefined) {
					formData.append(key, String(value));
				}
			});
			if (selectedPhoto) {
				formData.append("photo", selectedPhoto);
			}
			const res = await updateProfile(role, formData);
			toast.success("Profile updated successfully");
			setEditModalOpen(false);
			fetchProfile();
		} catch (err) {
			console.error("Update Error", err);
			toast.error("Update failed");
		}
	};
	const fetchProfile = async () => {
		try {
			const response = await getMyProfile(role);
			setProfile(response.user || response);
		} catch (error) {
			console.error("Failed to fetch profile:", error);
			toast.error("Failed to fetch profile.");
		} finally {
			setLoading(false);
		}
	};
	const fetchWannaBeInterests = async () => {
		try {
			const response = await getAllWannaBeInterests();
			setWannaBeInterests(response.interests);
		} catch (error) {
			console.error("Failed to fetch profile:", error);
			toast.error("Failed to fetch interests.");
		}
	};

	useEffect(() => {
		if (role == "Student") {
			fetchWannaBeInterests();
		}
		fetchProfile();
	}, []);

	const togglePhotoModal = () => setPhotoModalOpen(!photoModalOpen);

	const getInterestName = (id: string) => {
		const interest = wannaBeInterests.find(
			(interest: any) => interest._id === id
		);
		return interest ? interest.title : "Unknown";
	};
	if (loading) return <div>Loading...</div>;
	if (!profile) return <div>Profile not found.</div>;

	return (
		<Container fluid>
			<Breadcrumbs
				mainTitle={`Your Profile`}
				parent={role}
				title='Profile'
			/>
			<Card className='p-4'>
				<Row className='align-items-center'>
					<Col
						sm={12}
						md={4}
						lg={3}
						className='text-center border rounded p-2'>
						<Image
							src={
								profile.photo
									? getImageURL(profile.photo)
									: "/assets/avatar-placeholder.png"
							}
							width={300}
							height={300}
							alt='Profile Photo'
							style={{ borderRadius: "12px", objectFit: "cover" }}
							onClick={togglePhotoModal}
						/>
					</Col>
					<Col
						sm={12}
						md={8}
						lg={9}
						className='p-5'>
						<div className='d-flex align-items-center'>
							<h4 className='fw-bold text-uppercase'>{profile.name}</h4>
							<Button
								outline
								color='primary'
								className='m-3'
								onClick={() => setEditModalOpen(true)}>
								<Edit />
							</Button>
						</div>
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
							{profile.wannaBeInterest && role === "Student" && (
								<Col md={6}>
									<strong>WannaBe Interest:</strong>{" "}
									{getInterestName(profile.wannaBeInterest)}
								</Col>
							)}
							{profile.expertise && role === "Mentor" && (
								<Col md={6}>
									<strong>Expertise:</strong> {profile.expertise}
								</Col>
							)}
							{profile.bio && role === "Publisher" && (
								<Col md={6}>
									<strong>Bio:</strong> {profile.bio}
								</Col>
							)}
							{profile.companyName && role === "Employer" && (
								<Col md={6}>
									<strong>Company:</strong> {profile.companyName}
								</Col>
							)}
							{profile.workingMode && role !== "Student" && (
								<Col md={6}>
									<strong>Working Mode:</strong> {profile.workingMode}
								</Col>
							)}
						</Row>
					</Col>
				</Row>
			</Card>

			{/* Profile Photo Modal */}
			<Modal
				isOpen={photoModalOpen}
				toggle={togglePhotoModal}
				centered
				size='lg'>
				<ModalHeader toggle={togglePhotoModal}>Profile Photo</ModalHeader>
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
				isOpen={editModalOpen}
				toggle={toggleEditModal}
				centered
				size='lg'>
				<ModalHeader toggle={toggleEditModal}>Edit Your Profile</ModalHeader>
				<ModalBody>
					<Form
						onSubmit={handleProfileUpdate}
						encType='multipart/form-data'>
						<Row className='g-3'>
							<Col md={6}>
								<Label>Name</Label>
								<Input
									name='name'
									value={profile.name || ""}
									onChange={handleInputChange}
									required
								/>
							</Col>

							<Col md={6}>
								<Label>Email</Label>
								<Input
									name='email'
									type='email'
									value={profile.email || ""}
									onChange={handleInputChange}
									required
								/>
							</Col>

							{profile.contactNumber !== undefined && (
								<Col md={6}>
									<Label>Contact Number</Label>
									<Input
										name='contactNumber'
										value={profile.contactNumber || ""}
										onChange={handleInputChange}
									/>
								</Col>
							)}

							{profile.dob !== undefined && (
								<Col md={6}>
									<Label>DOB</Label>
									<Input
										type='date'
										name='dob'
										value={profile.dob?.slice(0, 10) || ""}
										onChange={handleInputChange}
									/>
								</Col>
							)}

							{profile.address !== undefined && (
								<Col md={6}>
									<Label>Address</Label>
									<Input
										name='address'
										value={profile.address || ""}
										onChange={handleInputChange}
									/>
								</Col>
							)}

							{role === "Student" && (
								<>
									<Col md={6}>
										<Label>Guardian Name</Label>
										<Input
											name='guardianName'
											value={profile.guardianName || ""}
											onChange={handleInputChange}
										/>
									</Col>
									<Col md={6}>
										<Label>Preferred Languages</Label>
										<Input
											name='preferredLanguages'
											value={profile.preferredLanguages || ""}
											onChange={handleInputChange}
										/>
									</Col>
									<Col md={6}>
										<Label>Education</Label>
										<Input
											name='education'
											value={profile.education || ""}
											onChange={handleInputChange}
										/>
									</Col>
									<Col md={6}>
										<Label>WannaBe Interest</Label>
										<Input
											type='select'
											name='wannaBeInterest'
											value={profile.wannaBeInterest || ""}
											onChange={handleInputChange}>
											<option value=''>Select</option>
											{wannaBeInterests.map((item: any) => (
												<option
													key={item._id}
													value={item._id}>
													{item.title}
												</option>
											))}
										</Input>
									</Col>
								</>
							)}

							{["Mentor", "Publisher", "Manager", "Course Creator"].includes(
								role
							) && (
								<Col md={6}>
									<Label for='workingMode'>Working Mode</Label>
									<Input
										type='select'
										name='workingMode'
										id='workingMode'
										value={profile.workingMode || ""}
										onChange={handleInputChange}
										required>
										<option value=''>Select Working Mode</option>
										<option value='In-Office'>In-Office</option>
										<option value='WFH'>WFH</option>
									</Input>
								</Col>
							)}

							{role === "Mentor" && (
								<Col md={6}>
									<Label>Expertise</Label>
									<Input
										name='expertise'
										value={profile.expertise || ""}
										onChange={handleInputChange}
									/>
								</Col>
							)}

							{["Publisher", "Manager", "Course Creator"].includes(role) && (
								<Col md={12}>
									<Label>About/Bio</Label>
									<Input
										name='bio'
										type='textarea'
										value={profile.bio || profile.about || ""}
										onChange={handleInputChange}
									/>
								</Col>
							)}

							{role === "Employer" && (
								<>
									<Col md={6}>
										<Label>Industry</Label>
										<Input
											name='industry'
											value={profile.industry || ""}
											onChange={handleInputChange}
										/>
									</Col>
									<Col md={6}>
										<Label>Company Size</Label>
										<Input
											name='companySize'
											value={profile.companySize || ""}
											onChange={handleInputChange}
										/>
									</Col>
								</>
							)}

							<Col md={12}>
								<Label>Upload Photo</Label>
								<Input
									type='file'
									name='photo'
									onChange={(e) =>
										setSelectedPhoto(e.target.files?.[0] || null)
									}
								/>
							</Col>
						</Row>

						<ModalFooter className='mt-4'>
							<Button
								color='outline-primary'
								onClick={toggleEditModal}>
								Cancel
							</Button>
							<Button
								color='primary'
								type='submit'>
								Update
							</Button>
						</ModalFooter>
					</Form>
				</ModalBody>
			</Modal>
		</Container>
	);
};

export default MyProfilePage;
