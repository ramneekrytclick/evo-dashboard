"use client";
import Link from "next/link";
import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Badge,
	Button,
} from "reactstrap";
import { CourseProps } from "@/Types/Course.type";
import CourseModal from "./CourseModal";
import { Edit2 } from "react-feather";
import { useRouter } from "next/navigation";

interface CourseCardProps {
	data: CourseProps;
	fetchData: () => void;
}

const CourseCard = ({ data, fetchData }: CourseCardProps) => {
	const discountPercent = data.realPrice
		? Math.round(
				((data.realPrice - data.discountedPrice) / data.realPrice) * 100
		  )
		: 0;

	const router = useRouter();
	const goToBatches = () => {
		router.push(`/admin/batches/${data._id}`);
	};

	return (
		<Col
			xl={4}
			className="mb-4">
			<Card className="border-0 shadow-md rounded-4 overflow-hidden h-100">
				<div className="position-relative">
					<CardImg
						top
						width="100%"
						height="200px"
						src={`/uploads/${data.photo}`}
						alt={data.title}
						className="object-fit-cover"
					/>

					{/* Discount badge */}
					{discountPercent > 0 && (
						<Badge
							color="danger"
							pill
							className="position-absolute top-0 end-0 m-3 fs-6">
							-{discountPercent}% Off
						</Badge>
					)}
				</div>

				<CardBody className="text-start p-4 d-flex flex-column">
					{/* <div className="d-flex justify-content-between small text-muted mb-2">
						<span>
							<i className="bi bi-journal-text me-1" />
							12 Lessons
						</span>
						<span>
							<i className="bi bi-people me-1" />
							50 Students
						</span>
					</div> */}

					<CardTitle
						tag="h5"
						className="fw-bold text-dark mb-2">
						<Link
							className="fw-bold text-dark mb-2"
							href={`/admin/lessons/${data._id}`}>
							{data.title}
						</Link>
					</CardTitle>

					{/* Category/Subcategory */}
					<div className="mb-2">
						<Badge
							color="primary"
							className="me-2">
							{data.category}
						</Badge>
						<Badge color="success">{data.subcategory}</Badge>
					</div>

					{/* WannaBeInterest with pencil */}
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div className="text-muted small">
							<strong>WannaBe:</strong>{" "}
							{Array.isArray(data.wannaBeInterest) ? (
								data.wannaBeInterest.map((w, i) => (
									<Badge
										key={i}
										color="light"
										className="me-1 text-dark border">
										{w}
									</Badge>
								))
							) : (
								<Badge
									color="light"
									className="text-dark border">
									{data.wannaBeInterest}
								</Badge>
							)}
						</div>
						<CourseModal
							values={data}
							fetchData={fetchData}
							iconOnly
						/>
					</div>

					<CardText className="text-muted small mb-3 flex-grow-1">
						{data.description ||
							"It is a long established fact that a reader will be distracted."}
					</CardText>

					{/* Creator */}
					<div className="d-flex align-items-center mb-3">
						<span className="small text-dark">
							Created by <strong>{data.createdBy?.trim()}</strong>
						</span>
					</div>

					{/* Price + Buttons */}
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div className="fs-5 fw-semibold text-dark">
							₹{data.discountedPrice}
							{data.realPrice && (
								<del className="text-muted ms-2 fs-6">₹{data.realPrice}</del>
							)}
						</div>
					</div>
					<div className="d-flex gap-2 w-100 justify-content-between align-items-center">
						<Link
							href={`/admin/lessons/${data._id}`}
							className="btn btn-sm btn-outline-primary">
							Learn More
						</Link>
						<Button
							color="primary"
							size="sm"
							onClick={goToBatches}>
							View Batches
						</Button>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default CourseCard;
