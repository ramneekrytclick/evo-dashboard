"use client";
import React, { useEffect, useState } from "react";
import { getUserProfile } from "@/app/api/admin/team";
import { Col, Card, CardBody, Container, Row } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";

const UserProfile = ({ id }: { id: string }) => {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

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

	useEffect(() => {
		fetchData();
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
				mainTitle={profile.name + " Profile"}
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
		</>
	);
};

export default UserProfile;
