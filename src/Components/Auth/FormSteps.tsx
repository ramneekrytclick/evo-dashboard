"use client";
import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

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

// FormSteps/StudentForm.tsx
export const StudentForm = ({ formData, handleChange }: any) => (
	<>
		<Input
			name="dob"
			type="date"
			placeholder="DOB"
			onChange={handleChange}
			required
		/>
		<Input
			name="contactNumber"
			placeholder="Contact Number"
			onChange={handleChange}
			required
		/>
		<Input
			name="guardianName"
			placeholder="Guardian Name"
			onChange={handleChange}
			required
		/>
		<Input
			name="address"
			placeholder="Address"
			onChange={handleChange}
			required
		/>
		<Input
			name="education"
			placeholder="Education"
			onChange={handleChange}
			required
		/>
		<Input
			name="preferredLanguages"
			placeholder="Preferred Languages"
			onChange={handleChange}
		/>
		<Input
			name="wannaBeInterest"
			placeholder="Wanna Be Interest"
			onChange={handleChange}
			required
		/>
		<Input
			name="experience"
			placeholder="Experience"
			onChange={handleChange}
		/>
	</>
);

// FormSteps/MentorForm.tsx
export const MentorForm = ({ formData, handleChange, role }: any) => (
	<>
		<Input
			name="username"
			placeholder="Username"
			onChange={handleChange}
			required
		/>
		<Input
			name="dob"
			type="date"
			placeholder="DOB"
			onChange={handleChange}
			required
		/>
		<Input
			name="contactNumber"
			placeholder="Contact Number"
			onChange={handleChange}
			required
		/>
		<Input
			name="education"
			placeholder="Education"
			onChange={handleChange}
			required
		/>
		<Input
			name="workingMode"
			placeholder="Working Mode"
			onChange={handleChange}
			required
		/>
		<Input
			name="address"
			placeholder="Address"
			onChange={handleChange}
			required
		/>
		{role === "mentors" && (
			<Input
				name="expertise"
				placeholder="Expertise"
				onChange={handleChange}
				required
			/>
		)}
		<Input
			name={role === "mentors" ? "bio" : "about"}
			placeholder="Bio/About"
			onChange={handleChange}
			required
		/>
	</>
);

// FormSteps/EmployerForm.tsx
export const EmployerForm = ({ formData, handleChange }: any) => (
	<>
		<Input
			name="type"
			placeholder="Type (Company/Individual)"
			onChange={handleChange}
			required
		/>
		<Input
			name="contactNumber"
			placeholder="Contact Number"
			onChange={handleChange}
			required
		/>
		<Input
			name="industry"
			placeholder="Industry"
			onChange={handleChange}
			required
		/>
		<Input
			name="address"
			placeholder="Address"
			onChange={handleChange}
			required
		/>
		<Input
			name="companySize"
			placeholder="Company Size"
			onChange={handleChange}
		/>
	</>
);
