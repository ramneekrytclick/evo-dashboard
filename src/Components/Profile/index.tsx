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
} from "reactstrap";
import { getMyProfile } from "@/app/api";
import { useAuth } from "@/app/AuthProvider";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";
import { toast } from "react-toastify";
import { getAllWannaBeInterests } from "@/app/api/cc";

const MyProfilePage = () => {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [photoModalOpen, setPhotoModalOpen] = useState(false);
	const [wannaBeInterests, setWannaBeInterests] = useState<any>([]);
	const { user } = useAuth();
	const role = user?.role || "";

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
						md={3}
						className='text-center'>
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
						{/* <div className='mt-3'>
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
						</div> */}
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
		</Container>
	);
};

export default MyProfilePage;
