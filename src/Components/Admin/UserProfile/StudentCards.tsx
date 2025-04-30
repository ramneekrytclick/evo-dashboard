"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
	Card,
	CardBody,
	CardHeader,
	Row,
	Col,
	Badge,
	Progress,
} from "reactstrap";
import { getAllStudentsProgress } from "@/app/api/admin/certificate";
import { getStudentDetailsById } from "@/app/api/employer";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const StudentCards = ({ profile }: { profile: any }) => {
	const [progress, setProgress] = useState<any>(null);
	const [evoScore, setEvoscore] = useState(0);
	const [loading, setLoading] = useState(true);
	const evoColor = getEvoColor(evoScore);

	const fetchData = async () => {
		setLoading(true);
		try {
			const allProgress = await getAllStudentsProgress();
			const studentProgress = allProgress.students.find(
				(p: any) => p.studentId === profile._id
			);
			const studentDetails = await getStudentDetailsById(profile._id);
			setEvoscore(studentDetails.evoscore);
			setProgress(studentProgress);
		} catch (error) {
			console.error("Error fetching progress:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;

	const enrolled = progress?.courses || [];
	const chartOptions: ApexOptions = {
		chart: { type: "radialBar", height: 350 },
		plotOptions: {
			radialBar: {
				hollow: { size: "70%" },
				dataLabels: {
					name: {
						show: true,
						fontSize: "18px",
						offsetY: -10,
					},
					value: {
						show: true,
						fontSize: "32px",
						fontWeight: "bold",
						formatter: () => `${(evoScore * 10).toFixed(1)}`,
					},
				},
			},
		},
		labels: ["EVO Score"],
		colors: [evoColor],
	};

	return (
		<Row className='mt-3 align-items-center'>
			<Col md={8}>
				<Card
					color='light'
					className='shadow-lg text-dark bg-light'>
					<CardHeader
						tag='h5'
						className='fw-semibold bg-light text-dark'>
						Enrolled Courses
					</CardHeader>
					<CardBody>
						{enrolled.length > 0 ? (
							<div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
								{enrolled.map((course: any) => (
									<Link
										key={course.courseId}
										href={`/admin/course/${course.courseId}`}>
										<Card
											className='d-inline-block me-3 mb-3'
											style={{ minWidth: "280px" }}>
											<CardBody>
												<h6 className='fw-bold mb-1'>{course.title}</h6>
												<Progress
													value={course.progressPercent}
													color={
														course.progressPercent === 100
															? "success"
															: "primary"
													}
													className='mb-2'
												/>
												<small>
													{course.completedLessons} / {course.totalLessons}{" "}
													lessons completed
												</small>
											</CardBody>
										</Card>
									</Link>
								))}
							</div>
						) : (
							<p className='text-muted'>No enrolled courses.</p>
						)}
					</CardBody>
				</Card>
			</Col>
			<Col
				md={4}
				className='h-100'>
				<Card className='shadow-sm'>
					<CardBody>
						<p>
							<ReactApexChart
								options={chartOptions}
								series={[evoScore * 10]}
								type='radialBar'
								height={240}
							/>
						</p>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};
const getEvoColor = (score: number) => {
	if (score <= 2.5) return "#FF4D4F";
	if (score <= 5) return "#FAAD14";
	if (score <= 7.5) return "#52C41A";
	if (score <= 9) return "#1890FF";
	return "#722ED1";
};

export default StudentCards;
