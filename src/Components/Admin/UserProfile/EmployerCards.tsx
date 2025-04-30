"use client";

import { getAllJobs } from "@/app/api/admin/jobs";
import { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	Spinner,
	Modal,
	ModalHeader,
	ModalBody,
	Badge,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import Link from "next/link";
import JobDetailsModal from "../JobApproval/JobDetailsModal";

const EmployerCards = ({ profile }: { profile: any }) => {
	const [allJobs, setAllJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedJob, setSelectedJob] = useState<any | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const fetchJobs = async () => {
		try {
			const response = await getAllJobs();
			const employerJobs = response.jobs.filter(
				(job: any) => job.employer?._id === profile._id
			);
			setAllJobs(employerJobs);
		} catch (error) {
			console.error("Failed to fetch jobs:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	const openJobModal = (job: any) => {
		setSelectedJob(job);
		setModalOpen(true);
	};

	if (loading)
		return (
			<div className='text-center py-5'>
				<Spinner /> Loading jobs...
			</div>
		);

	return (
		<div className='my-3 card card-body bg-light text-dark shadow-lg'>
			<h5 className='fw-bold mb-3'>Job Postings</h5>
			{allJobs.length === 0 ? (
				<p className='text-muted'>No jobs posted by {profile.name} yet.</p>
			) : (
				<div className='d-flex overflow-auto gap-3'>
					{allJobs.map((job) => (
						<Card
							key={job._id}
							className='shadow-sm'
							style={{ minWidth: "250px", flex: "0 0 auto", cursor: "pointer" }}
							onClick={() => openJobModal(job)}>
							<CardHeader className='fw-semibold text-primary text-truncate'>
								{job.title}
							</CardHeader>
						</Card>
					))}
				</div>
			)}

			<JobDetailsModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				selectedJob={selectedJob}
			/>
		</div>
	);
};

export default EmployerCards;
