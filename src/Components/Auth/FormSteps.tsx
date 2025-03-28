"use client";
import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

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

export const StudentForm = ({ formData, handleChange }: any) => (
	<Row className="g-3">
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
					placeholder="Enter your phone number"
					value={formData.contactNumber || ""}
					onChange={handleChange}
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
		<Col sm={6}>
			<FormGroup>
				<Label>Education</Label>
				<Input
					name="education"
					placeholder="E.g. B.Tech CSE"
					value={formData.education || ""}
					onChange={handleChange}
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
				/>
			</FormGroup>
		</Col>
		<Col sm={6}>
			<FormGroup>
				<Label>Wanna Be Interest</Label>
				<Input
					name="wannaBeInterest"
					placeholder="Frontend Developer, AI Engineer"
					value={formData.wannaBeInterest || ""}
					onChange={handleChange}
					required
				/>
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
				/>
			</FormGroup>
		</Col>
	</Row>
);

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
