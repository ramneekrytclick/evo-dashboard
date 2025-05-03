import { getCourseName } from "@/CommonComponent/imageURL";
import { BatchProps } from "@/Types/Course.type";
import Link from "next/link";
import { Calendar } from "react-feather";
import { Badge, Card, CardBody, CardText, CardTitle } from "reactstrap";

const BatchCard = ({ batch }: { batch: BatchProps }) => {
	return (
		<Card
			tag={Link}
			href={`batches/${batch._id}`}
			className='border-0 shadow rounded-4 h-100 fs-6'
			style={{ cursor: "pointer" }}>
			<CardBody className='d-flex flex-column justify-content-between align-items-center fs-5'>
				<Link href={`batches/${batch._id}`}>
					<CardTitle
						tag='h5'
						className='fw-bold text-dark mb-2'>
						{batch.name || "N/A"}
					</CardTitle>
				</Link>
				<p className='fs-6'>
					{batch.course.title || getCourseName(batch.course)}
				</p>
				{/* Batch schedule info */}
				<div className='mb-2'>
					<Badge
						color='light'
						className='me-2 d-flex align-items-center gap-2 text-dark'>
						<span>{batch.batchWeekType}</span>
						{batch.time}
					</Badge>
				</div>

				{/* Description */}
				<CardText className='text-muted small mb-2'>
					{batch.description || "No description provided."}
				</CardText>

				{/* Dates */}
				<CardText className='text-muted small mb-1 d-flex align-items-center gap-2'>
					<Calendar size={16} />
					{new Date(batch.startDate || new Date()).toLocaleDateString("en-IN", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
					-
					{new Date(batch.endDate || new Date()).toLocaleDateString("en-IN", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
				</CardText>

				{/* Students Count */}
				<CardText className='text-muted small mt-auto'>
					<strong>Students Enrolled:</strong> {batch.students?.length || 0}
				</CardText>
			</CardBody>
		</Card>
	);
};

export default BatchCard;
