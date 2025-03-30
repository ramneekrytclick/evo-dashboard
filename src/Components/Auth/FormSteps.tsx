"use client";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row, Spinner } from "reactstrap";

interface BasicInfoProps {
	formData: any;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	role: string;
	setRole: (role: string) => void;
}

const BasicInfoForm: React.FC<BasicInfoProps> = ({
	formData,
	handleChange,
	role,
	setRole,
}) => {
	return (
		<Row className="g-3">
			<Col sm={12}>
				<Label>Select Role</Label>
				<Input
					type="select"
					name="role"
					value={role}
					onChange={(e) => setRole(e.target.value)}
					required>
					<option value="admin">Admin</option>
					<option value="mentors">Mentor</option>
					<option value="publishers/auth">Publisher</option>
					<option value="managers/auth">Manager</option>
					<option value="course-creators/auth">Course Creator</option>
					<option value="students">Student</option>
					<option value="jobs">Employer</option>
				</Input>
			</Col>

			<Col sm={6}>
				<Label>Full Name</Label>
				<Input
					type="text"
					name="name"
					placeholder="Enter your name"
					value={formData.name || ""}
					onChange={handleChange}
					required
				/>
			</Col>

			<Col sm={6}>
				<Label>Email Address</Label>
				<Input
					type="email"
					name="email"
					placeholder="you@example.com"
					value={formData.email || ""}
					onChange={handleChange}
					required
				/>
			</Col>

			<Col sm={6}>
				<Label>Password</Label>
				<Input
					type="password"
					name="password"
					placeholder="Enter your password"
					value={formData.password || ""}
					onChange={handleChange}
					required
				/>
			</Col>

			<Col sm={6}>
				<Label>Confirm Password</Label>
				<Input
					type="password"
					name="confirmPassword"
					placeholder="Re-enter your password"
					value={formData.confirmPassword || ""}
					onChange={handleChange}
					required
				/>
			</Col>
		</Row>
	);
};

export default BasicInfoForm;
interface StudentFormProps {
	formData: any;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void;
	otpSent: boolean;
	handleSendOtp: () => Promise<void>;
	otp: string;
	setOtp: (otp: string) => void;
	handleVerifyOtp: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
	formData,
	handleChange,
	otpSent,
	handleSendOtp,
	otp,
	setOtp,
	handleVerifyOtp,
}) => {
	const [isEditable, setIsEditable] = useState(false);
	const [wannaBeInterests, setWannaBeInterests] = useState([]);
	const [sendingOtp, setSendingOtp] = useState(false);
	const [showOtp, setShowOtp] = useState(otpSent);

	useEffect(() => {
		const fetchWannaBeInterests = async () => {
			try {
				const data = await getWannaBeInterests();
				setWannaBeInterests(data || []);
			} catch (err) {
				console.error("Failed to fetch WannaBeInterests:", err);
			}
		};
		fetchWannaBeInterests();
	}, []);

	const disableFields = otpSent && !isEditable;

	const handleOtpSend = async () => {
		try {
			setSendingOtp(true);
			await handleSendOtp();
			setShowOtp(true);
		} catch (err) {
			console.error(err);
		} finally {
			setSendingOtp(false);
		}
	};

	const handleEditToggle = () => {
		setIsEditable((prev) => !prev);
		setShowOtp(false); // Hide OTP when editing form
	};

	return (
		<Row className="g-3">
			<Col sm={6}>
				<FormGroup>
					<Label>DOB</Label>
					<Input
						type="date"
						name="dob"
						value={formData.dob || ""}
						onChange={handleChange}
						disabled={disableFields}
						required
					/>
				</FormGroup>
			</Col>
			<Col sm={6}>
				<FormGroup>
					<Label>Contact Number</Label>
					<Input
						name="contactNumber"
						placeholder="Enter your phone number"
						value={formData.contactNumber || ""}
						onChange={handleChange}
						disabled={disableFields}
						required
					/>
				</FormGroup>
			</Col>
			<Col sm={6}>
				<FormGroup>
					<Label>Guardian Name</Label>
					<Input
						name="guardianName"
						placeholder="Enter guardian's name"
						value={formData.guardianName || ""}
						onChange={handleChange}
						disabled={disableFields}
						required
					/>
				</FormGroup>
			</Col>
			<Col sm={6}>
				<FormGroup>
					<Label>Address</Label>
					<Input
						name="address"
						placeholder="Full address"
						value={formData.address || ""}
						onChange={handleChange}
						disabled={disableFields}
						required
					/>
				</FormGroup>
			</Col>
			<Col sm={6}>
				<FormGroup>
					<Label>Education</Label>
					<Input
						name="education"
						placeholder="E.g. B.Tech CSE"
						value={formData.education || ""}
						onChange={handleChange}
						disabled={disableFields}
						required
					/>
				</FormGroup>
			</Col>
			<Col sm={6}>
				<FormGroup>
					<Label>Preferred Languages</Label>
					<Input
						name="preferredLanguages"
						placeholder="E.g. JavaScript, Python"
						value={formData.preferredLanguages || ""}
						onChange={handleChange}
						disabled={disableFields}
					/>
				</FormGroup>
			</Col>
			<Col sm={6}>
				<FormGroup>
					<Label>Wanna Be Interest</Label>
					<Input
						type="select"
						name="wannaBeInterest"
						value={formData.wannaBeInterest || ""}
						onChange={handleChange}
						disabled={disableFields}
						required>
						<option value="">Select one</option>
						{wannaBeInterests.map((item: any) => (
							<option
								key={item._id}
								value={item._id}>
								{item.title}
							</option>
						))}
					</Input>
				</FormGroup>
			</Col>
			<Col sm={6}>
				<FormGroup>
					<Label>Experience</Label>
					<Input
						name="experience"
						placeholder="Internship, Freelancing"
						value={formData.experience || ""}
						onChange={handleChange}
						disabled={disableFields}
					/>
				</FormGroup>
			</Col>

			{/* OTP Logic Section */}
			{otpSent && (
				<Col
					sm={12}
					className="d-flex justify-content-between align-items-center">
					<Button
						color="secondary"
						onClick={handleEditToggle}>
						{isEditable ? "Lock Form" : "Edit Form"}
					</Button>
					{!isEditable && (
						<Button
							color="success"
							onClick={handleVerifyOtp}>
							Verify OTP
						</Button>
					)}
				</Col>
			)}

			{/* OTP Input Box */}
			{showOtp && (
				<Col sm={12}>
					<FormGroup>
						<Label>Enter OTP sent to your email</Label>
						<Input
							type="text"
							placeholder="Enter 6-digit OTP"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
						/>
					</FormGroup>
				</Col>
			)}

			{/* Send OTP Button */}
			{!otpSent && (
				<Col
					sm={12}
					className="text-end">
					<Button
						color="primary"
						onClick={handleOtpSend}
						disabled={sendingOtp}>
						{sendingOtp ? (
							<>
								<Spinner size="sm" /> Sending OTP...
							</>
						) : (
							"Send OTP"
						)}
					</Button>
				</Col>
			)}
		</Row>
	);
};
// FormSteps/MentorForm.tsx
export const MentorForm = ({ formData, handleChange, role }: any) => (
	<Row className="g-3">
		<Col sm={6}>
			<FormGroup>
				<Label>Username</Label>
				<Input
					name="username"
					placeholder="Unique username"
					value={formData.username || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>DOB</Label>
				<Input
					type="date"
					name="dob"
					value={formData.dob || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Contact Number</Label>
				<Input
					name="contactNumber"
					placeholder="Phone number"
					value={formData.contactNumber || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Education</Label>
				<Input
					name="education"
					placeholder="E.g. M.Sc in AI"
					value={formData.education || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Working Mode</Label>
				<Input
					name="workingMode"
					placeholder="Online / Offline / Hybrid"
					value={formData.workingMode || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Address</Label>
				<Input
					name="address"
					placeholder="Full address"
					value={formData.address || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		{role === "mentors" && (
			<Col sm={6}>
				<FormGroup>
					<Label>Expertise</Label>
					<Input
						name="expertise"
						placeholder="E.g. MERN Stack, Data Science"
						value={formData.expertise || ""}
						onChange={handleChange}
						required
					/>
				</FormGroup>
			</Col>
		)}
		<Col sm={12}>
			<FormGroup>
				<Label>Bio/About</Label>
				<Input
					name={role === "mentors" ? "bio" : "about"}
					placeholder="Write a short description"
					value={formData[role === "mentors" ? "bio" : "about"] || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
	</Row>
);

// FormSteps/EmployerForm.tsx
export const EmployerForm = ({ formData, handleChange }: any) => (
	<Row className="g-3">
		<Col sm={6}>
			<FormGroup>
				<Label>Type</Label>
				<Input
					name="type"
					placeholder="Company / Individual"
					value={formData.type || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Contact Number</Label>
				<Input
					name="contactNumber"
					placeholder="Phone number"
					value={formData.contactNumber || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Industry</Label>
				<Input
					name="industry"
					placeholder="E.g. IT, Marketing, Design"
					value={formData.industry || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Address</Label>
				<Input
					name="address"
					placeholder="Company address"
					value={formData.address || ""}
					onChange={handleChange}
					required
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Company Size</Label>
				<Input
					name="companySize"
					placeholder="E.g. 10-50 employees"
					value={formData.companySize || ""}
					onChange={handleChange}
				/>
			</FormGroup>
		</Col>
	</Row>
);
