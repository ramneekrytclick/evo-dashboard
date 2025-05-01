import { getImageURL } from "@/CommonComponent/imageURL";
import { CourseProps } from "@/Types/Course.type";
import Image from "next/image";
import Link from "next/link";
import { Badge, Button, Card, CardBody, Progress } from "reactstrap";
const mainURL = process.env.NEXT_PUBLIC_MAIN_URL;
const CourseCard = ({
	enrolled,
	course,
	percent,
	prog,
	categoryMap,
	subcategoryMap,
}: {
	enrolled: any;
	course: CourseProps;
	percent: number;
	prog: any;
	categoryMap: Map<string, string>;
	subcategoryMap: Map<string, string>;
}) => {
	return (
		<Link
			className='text-dark text-decoration-none'
			href={
				enrolled
					? `/student/learning/course/${course._id}`
					: `${mainURL}courses/${course.slug}`
			}>
			<Card className='border-0 shadow rounded-4 overflow-hidden h-100'>
				<Image
					width={200}
					height={200}
					className='w-100'
					src={getImageURL(course.photo)}
					alt={course.title}
					style={{ objectFit: "cover" }}
				/>
				<CardBody className='p-4 d-flex flex-column align-items-center justify-content-between'>
					<h3
						className='fw-bold text-dark mb-1 text-center'
						style={{
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							width: "100%",
						}}>
						{course.title || "Untitled Course"}
					</h3>

					{enrolled ? (
						<div className='text-center w-100'>
							<Progress
								value={percent}
								style={{ height: "8px", width: "100%" }}
								className='rounded-pill mt-1'
								color='success'
							/>
							<span className='text-muted h6'>{percent}% Completed</span>
							<p className='text-muted small'>
								({prog?.completedLessons || "0"} of {prog?.totalLessons || "0"}{" "}
								Lessons)
							</p>
						</div>
					) : (
						<>
							<div
								className='mb-4'
								style={{
									display: "flex",
									gap: "10px",
									alignItems: "center",
									flexDirection: "column",
								}}>
								<Badge
									color='light'
									className='me-2 text-danger'>
									{subcategoryMap.get(course.subcategory) ||
										"Unknown Subcategory"}
								</Badge>
								<Badge
									color='light'
									className='text-success'>
									{categoryMap.get(course.category) || "Unknown Category"}
								</Badge>
							</div>
							<p className='rbt-card-text'>{course.description}</p>
						</>
					)}

					<Button
						color={enrolled ? "primary" : "outline-primary"}
						className='w-100 mb-2 rounded-pill'
						tag={Link}
						href={
							enrolled
								? `/student/learning/course/${course._id}`
								: `${mainURL}courses/${course.slug}`
						}>
						{enrolled ? "Continue Learning" : "View Course"}
					</Button>
				</CardBody>
			</Card>
		</Link>
	);
};

export default CourseCard;
