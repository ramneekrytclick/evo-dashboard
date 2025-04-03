"use client";

import { applyJobApplication, getJobs } from "@/app/api/student";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Badge, Card, CardBody, Button } from "reactstrap";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import { ImagePath, Href } from "@/Constant";
import JobApplyConfirmationModal from "./JobApplyModal";
import { useAuth } from "@/app/AuthProvider";

const JobsCardView = ({ searchQuery, location, selectedFilters }: any) => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedJob, setSelectedJob] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { user } = useAuth();
	const id = user?.id || "";
	const fetchData = async () => {
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
		fetchData();
	}, []);

	const openConfirmationModal = (job: any) => {
		setSelectedJob(job);
		setIsModalOpen(true);
	};

	const handleConfirmApply = async () => {
		try {
			const response = await applyJobApplication({
				jobId: selectedJob._id,
				studentId: id,
			});
			toast.success(`Applied to ${selectedJob.title}`);
			setIsModalOpen(false);
		} catch (error) {
			toast.error("Error applying to job!");
		}
		// TODO: Call API to apply to job here
	};
	const filteredJobs = jobs.filter((job: any) => {
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

		return matchTitle && matchLocation && matchFilters;
	});

	if (loading) {
		return <Card>Loading...</Card>;
	}

	return (
		<>
			{filteredJobs.length > 0 ? (
				filteredJobs.map((item: any, index: number) => (
					<Card
						key={item._id}
						className="job-search">
						<CardBody>
							<div className="d-flex">
								<Image
									priority
									width={40}
									height={40}
									className="img-40 img-fluid m-r-20"
									src={`${ImagePath}/job-search/${
										Math.floor(index + 1) % 4
									}.jpg`}
									alt="job logo"
								/>
								<div className="flex-grow-1">
									<h6 className="f-w-600">
										<Link href={Href}>{item.title}</Link>
									</h6>
									{/* <p className="text-muted mb-1">
									Remote, India
									<Rating
										className="ms-1"
										fillColor="#FFAE1A"
										initialValue={4 + Math.random()}
										size={14}
										readonly
									/>
								</p> */}
								</div>
							</div>
							<p className="mt-2 mb-2">{item.description}</p>
							<div className="d-flex justify-content-between align-items-center">
								<span>
									Openings: <strong>{item.openings}</strong>
								</span>
								<Button
									color="primary"
									size="sm"
									onClick={() => openConfirmationModal(item)}>
									Apply
								</Button>
							</div>
						</CardBody>
					</Card>
				))
			) : (
				<Card className="text-center p-4">
					No jobs found matching the filters.
				</Card>
			)}

			<JobApplyConfirmationModal
				isOpen={isModalOpen}
				toggle={() => setIsModalOpen(false)}
				onConfirm={handleConfirmApply}
				job={selectedJob}
			/>
		</>
	);
};

export default JobsCardView;
