"use client";

import { applyJobApplication, getJobs } from "@/app/api/student";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Badge, Card, CardBody, Button, Spinner } from "reactstrap";
import { useAuth } from "@/app/AuthProvider";
import JobApplyConfirmationModal from "./JobApplyModal";
import { ArrowLeft } from "react-feather";

const JobsCardView = ({
	searchQuery,
	location,
	selectedFilters,
	appliedJobs,
	jobType,
	experience,
	salaryRange,
	deadline,
	selectedJobDetails,
	setSelectedJobDetails, // receive from parent
}: any) => {
	const [jobs, setJobs] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedJob, setSelectedJob] = useState<any>(null); // for apply modal
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

	if (selectedJobDetails) {
		const job = selectedJobDetails;
		const status = getStatus(job._id);
		return (
			<div className='job-details p-3 text-dark'>
				<div className='d-flex justify-content-between align-items-center'>
					<Button
						color='outline-primary'
						className='mb-3 d-flex align-items-center gap-1'
						onClick={() => setSelectedJobDetails(null)}>
						<ArrowLeft size={15} /> Go Back
					</Button>
					{status ? (
						<div className='d-flex flex-column align-items-center'>
							<Badge
								color={
									status === "Pending"
										? "warning"
										: status === "Rejected"
										? "danger"
										: "success"
								}>
								Application Status: {status}
							</Badge>
							<span className='fs-6 text-muted'>Already Applied!</span>
						</div>
					) : (
						<Button
							color='primary'
							onClick={() => {
								openModal(job);
							}}>
							Apply to this Job
						</Button>
					)}
				</div>
				<Card className='card-body'>
					<h3 className='fw-bold'>
						{job.title} @ {job.companyName}
					</h3>
					<p className='text-muted'>
						{job.location} | {job.jobType}
					</p>

					<hr />

					<h6
						className='fw-semibold mb-1'
						fs-6>
						Job Description
					</h6>
					<p className='fs-6 mb-4'>{job.description}</p>

					<h6
						className='fw-semibold mb-1'
						fs-6>
						Skills Required
					</h6>
					<p className='fs-6 mb-4'>
						{(job.skillsRequired || []).map((skill: string, idx: number) => (
							<Badge
								key={idx}
								color='primary'
								className='fs-6'
								pill>
								{skill}
							</Badge>
						)) || "Not specified"}
					</p>

					<h6
						className='fw-semibold mb-1'
						fs-6>
						Other Details
					</h6>
					<ul>
						<li>
							<span className='fw-medium'>Experience Required:</span>{" "}
							{job.experienceRequired || "Not specified"}
						</li>
						<li>
							<span className='fw-medium'>Salary:</span>{" "}
							{job.salary ? `${job.salary} ` : "Not specified"}
						</li>
						<li>
							<span className='fw-medium'>Application Deadline:</span>{" "}
							{new Date(job.applicationDeadline).toLocaleDateString()}
						</li>
						<li>
							<span className='fw-medium'>Openings:</span> {job.openings}
						</li>
					</ul>
				</Card>
				<JobApplyConfirmationModal
					isOpen={isModalOpen}
					toggle={() => setIsModalOpen(false)}
					onConfirm={handleApply}
					job={selectedJob}
				/>
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
							className='job-search mb-3 '
							style={{ cursor: "pointer" }}
							onClick={() => setSelectedJobDetails(job)}>
							<CardBody>
								<div className='d-flex align-items-center mb-2'>
									<div className='flex-grow-1'>
										<h6 className='fw-semibold mb-1 text-primary'>
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
										<Badge
											color={
												status === "Pending"
													? "warning"
													: status === "Rejected"
													? "danger"
													: "success"
											}>
											Status: {status}
										</Badge>
									) : (
										<Button
											color='primary'
											onClick={(e) => {
												e.stopPropagation(); // Don't trigger card click
												openModal(job);
											}}>
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
