"use client";

import { applyJobApplication, getJobs } from "@/app/api/student";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Badge, Card, CardBody, Button, Spinner } from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import { ImagePath } from "@/Constant";
import JobApplyConfirmationModal from "./JobApplyModal";
import { useAuth } from "@/app/AuthProvider";

const JobsCardView = ({
	searchQuery,
	location,
	selectedFilters,
	appliedJobs,
	jobType,
	experience,
	salaryRange,
	deadline,
}: any) => {
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedJob, setSelectedJob] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { user } = useAuth();
	const studentId = user?.id || "";

	const fetchJobs = async () => {
		setLoading(true);
		try {
			const response = await getJobs();
			setJobs(response.jobs || []);
		} catch (error) {
			console.error(error);
			toast.error("Error fetching jobs!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	const openModal = (job: any) => {
		setSelectedJob(job);
		setIsModalOpen(true);
	};

	const handleApply = async (resumeFile?: File | null) => {
		try {
			const formData = new FormData();
			formData.append("jobId", selectedJob._id);
			formData.append("studentId", studentId);
			if (resumeFile) formData.append("resume", resumeFile);
			await applyJobApplication(formData);
			toast.success(`Applied to ${selectedJob.title}`);
			setIsModalOpen(false);
			fetchJobs();
		} catch (error) {
			toast.error("Error applying to job!");
		}
	};

	const getStatus = (jobId: string) => {
		const applied = appliedJobs?.find((app: any) => app.jobId === jobId);
		return applied ? applied.status : null;
	};

	const filteredJobs = jobs.filter((job) => {
		const matchTitle = job.title
			.toLowerCase()
			.includes(searchQuery?.toLowerCase());
		const matchLocation = location
			? job.location?.toLowerCase().includes(location.toLowerCase())
			: true;
		const matchFilters =
			selectedFilters?.length === 0 ||
			selectedFilters.some((filter: string) =>
				(job.skillsRequired || [])
					.map((s: string) => s.toLowerCase())
					.includes(filter.toLowerCase())
			);
		const matchJobType = jobType ? job.jobType === jobType : true;
		const matchExperience = experience
			? job.experienceRequired?.toLowerCase().includes(experience.toLowerCase())
			: true;
		const matchSalary =
			salaryRange && !isNaN(Number(salaryRange))
				? parseFloat(job.salary) >= parseFloat(salaryRange)
				: true;
		const matchDeadline = deadline
			? new Date(job.applicationDeadline) <= new Date(deadline)
			: true;

		return (
			matchTitle &&
			matchLocation &&
			matchFilters &&
			matchJobType &&
			matchExperience &&
			matchSalary &&
			matchDeadline
		);
	});

	if (loading) {
		return (
			<div className='text-center py-4'>
				<Spinner color='primary' />
			</div>
		);
	}

	return (
		<>
			{filteredJobs.length > 0 ? (
				filteredJobs.map((job, index) => {
					const status = getStatus(job._id);
					return (
						<Card
							key={job._id}
							className='job-search mb-3'>
							<CardBody>
								<div className='d-flex align-items-center mb-2'>
									<Image
										priority
										src={`${ImagePath}/job-search/${(index % 4) + 1}.jpg`}
										alt='job'
										width={40}
										height={40}
										className='img-fluid rounded me-3'
									/>
									<div className='flex-grow-1'>
										<h6 className='fw-semibold mb-1'>
											{job.title} @ {job.companyName}
										</h6>
										<p className='text-muted mb-0 small'>
											{job.location} | {job.jobType}
										</p>
									</div>
								</div>

								<p className='text-muted mb-2 small'>{job.description}</p>

								<div className='d-flex justify-content-between align-items-center'>
									<span className='small'>
										Openings: <strong>{job.openings}</strong>
									</span>
									{status ? (
										<Badge color='secondary'>Status: {status}</Badge>
									) : (
										<Button
											color='primary'
											onClick={() => openModal(job)}>
											Apply
										</Button>
									)}
								</div>
							</CardBody>
						</Card>
					);
				})
			) : (
				<Card className='text-center p-4'>
					No jobs found matching the filters.
				</Card>
			)}

			<JobApplyConfirmationModal
				isOpen={isModalOpen}
				toggle={() => setIsModalOpen(false)}
				onConfirm={handleApply}
				job={selectedJob}
			/>
		</>
	);
};

export default JobsCardView;
