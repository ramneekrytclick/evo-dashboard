"use client";

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Label,
} from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

interface JobApplyConfirmationModalProps {
	isOpen: boolean;
	toggle: () => void;
	onConfirm: (resumeFile?: File | null) => void;
	job: any;
}

const JobApplyConfirmationModal = ({
	isOpen,
	toggle,
	onConfirm,
	job,
}: JobApplyConfirmationModalProps) => {
	const [resumeFile, setResumeFile] = useState<File>();
	if (!job) return null;
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			centered
			size='lg'>
			<ModalHeader toggle={toggle}>Apply to {job.title}</ModalHeader>
			<ModalBody>
				<div className='mb-3'>
					<h5 className='fw-bold'>{job.title}</h5>
					<p className='text-muted mb-2'>
						{job.location || "Remote, India"}
						{/* <Rating
							className="ms-2"
							fillColor="#FFAE1A"
							initialValue={4 + Math.random()}
							size={16}
							readonly
						/> */}
					</p>
					<p>{job.description}</p>
				</div>

				<hr />

				<div className='row mb-3'>
					<div className='col-md-6 mb-2'>
						<strong>Company:</strong> {job.companyName}
					</div>
					<div className='col-md-6 mb-2'>
						<strong>Type:</strong> {job.jobType}
					</div>
					<div className='col-md-6 mb-2'>
						<strong>Location:</strong> {job.location}
					</div>
					<div className='col-md-6 mb-2'>
						<strong>Openings:</strong> {job.openings}
					</div>
					{job.applicationDeadline && (
						<div className='col-md-6 mb-2'>
							<strong>Deadline:</strong>{" "}
							{new Date(job.applicationDeadline).toLocaleDateString()}
						</div>
					)}
					{job.experienceRequired && (
						<div className='col-md-6 mb-2'>
							<strong>Experience Required:</strong> {job.experienceRequired}
						</div>
					)}
					{job.salary && (
						<div className='col-md-6 mb-2'>
							<strong>Salary:</strong> {job.salary}
						</div>
					)}
				</div>

				{job.skillsRequired?.length > 0 && (
					<div className='mb-2'>
						<strong>Skills Required:</strong>
						<ul className='mt-1 mb-0'>
							{job.skillsRequired.map((skill: string, index: number) => (
								<li key={index}>{skill}</li>
							))}
						</ul>
					</div>
				)}
				<Label className='mt-3'>Upload Resume (Optional)</Label>
				<Input
					type='file'
					accept='.pdf,.doc,.docx'
					onChange={(e) => setResumeFile(e.target.files?.[0])}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					color='outline-primary'
					onClick={toggle}>
					Cancel
				</Button>
				<Button
					color='primary'
					onClick={() => onConfirm(resumeFile)}>
					Apply Now
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default JobApplyConfirmationModal;
