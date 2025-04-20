import React from "react";
import { Card, CardBody } from "reactstrap";
import { FaUsers, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";

const MentorStats = ({ data }: { data: any[] }) => {
	if (!data || data.length === 0) return <p>No mentor stats available.</p>;

	return (
		<div className='mb-4 card card-body '>
			<h5 className='fw-semibold mb-3'>Assigned Mentors Stats</h5>
			<div
				style={{
					display: "flex",
					gap: "1rem",
					overflowX: "auto",
					paddingBottom: "8px",
					scrollSnapType: "x mandatory",
				}}>
				{data.map((mentor) => (
					<div
						key={mentor.mentorId}
						style={{
							minWidth: "280px",
							scrollSnapAlign: "start",
							flexShrink: 0,
						}}>
						<Card className='shadow-sm h-100 border-0 bg-primary-subtle'>
							<CardBody>
								<h6 className='fw-bold mb-1'>{mentor.name}</h6>
								<p className='text-muted small mb-3'>{mentor.email}</p>

								<div className='d-flex justify-content-between text-center'>
									<div>
										<FaChalkboardTeacher
											className='mb-1'
											size={18}
										/>
										<h6 className='mb-0'>{mentor.totalBatches}</h6>
										<small className='text-muted'>Batches</small>
									</div>
									<div>
										<FaUsers
											className='mb-1'
											size={18}
										/>
										<h6 className='mb-0'>{mentor.totalStudents}</h6>
										<small className='text-muted'>Students</small>
									</div>
									<div>
										<FaBookOpen
											className='mb-1'
											size={18}
										/>
										<h6 className='mb-0'>{mentor.coursesAssigned}</h6>
										<small className='text-muted'>Courses</small>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
};

export default MentorStats;
