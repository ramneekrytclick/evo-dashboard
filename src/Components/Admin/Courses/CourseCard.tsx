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
	CardFooter,
} from "reactstrap";
import { CourseProps } from "@/Types/Course.type";
import CourseModal from "./CourseModal";
import { useRouter } from "next/navigation";
import ViewReviewsModal from "./ReviewModal";

interface CourseCardProps {
	data: CourseProps;
	fetchData: () => void;
	categories: any[];
	subcategories: any[];
	wannaBeInterests: any[];
}
const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL;

const CourseCard = ({
	data,
	fetchData,
	categories,
	subcategories,
	wannaBeInterests,
}: CourseCardProps) => {
	const router = useRouter();
	const discountPercent = data.realPrice
		? Math.round(
				((data.realPrice - data.discountedPrice) / data.realPrice) * 100
		  )
		: 0;

	const goToBatches = () => {
		router.push(`/admin/batches/${data._id}`);
	};

	// Mapping IDs to names
	const categoryName =
		categories?.find(
			(c: any) => c._id?.toString() === data.category?.toString()
		)?.title || data.category;

	const subcategoryName =
		subcategories?.find(
			(s: any) => s._id?.toString() === data.subcategory?.toString()
		)?.title || data.subcategory;

	const mappedWannaBe = Array.isArray(data.wannaBeInterest)
		? data.wannaBeInterest.map((w: any) => {
				const matched = wannaBeInterests?.find(
					(i: any) => i._id?.toString() === w?.toString()
				);
				return matched?.title || w;
		  })
		: [
				wannaBeInterests?.find(
					(i: any) => i._id?.toString() === data.wannaBeInterest?.toString()
				)?.title || data.wannaBeInterest,
		  ];
	return (
		<Col
			xl={4}
			className='mb-4'>
			<Card className='border-0 shadow-md rounded-4 overflow-hidden h-100'>
				<div className='position-relative'>
					<CardImg
						top
						width='100%'
						height='200px'
						src={`${backendURL}/uploads/${data.photo}`}
						alt={data.title}
						className='object-fit-cover'
					/>
					{discountPercent > 0 && (
						<Badge
							color='danger'
							pill
							className='position-absolute top-0 end-0 m-3 fs-6'>
							-{discountPercent}% Off
						</Badge>
					)}
				</div>
				{/* {JSON.stringify(categories)}
				{JSON.stringify(subcategories)}
				{JSON.stringify(wannaBeInterests)} */}
				<CardBody className='text-start p-4 d-flex flex-column'>
					<CardTitle
						tag='h5'
						className='fw-bold text-dark mb-2'>
						<Link
							className='fw-bold text-dark mb-2'
							href={`/admin/lessons/${data._id}`}>
							{data.title}
						</Link>
					</CardTitle>
					<p>Raw Category: {data.category}</p>
					<p>Mapped Category: {categoryName}</p>

					<div className='mb-2'>
						<Badge
							color='primary'
							className='me-2'>
							{categoryName}
						</Badge>
						<Badge color='success'>{subcategoryName}</Badge>
					</div>

					<div className='d-flex justify-content-between align-items-center mb-3'>
						<div className='text-muted small'>
							<strong>WannaBe:</strong>{" "}
							{mappedWannaBe.map((w, i) => (
								<Badge
									key={i}
									color='light'
									className='me-1 text-dark border'>
									{w}
								</Badge>
							))}
						</div>
						<CourseModal
							values={data}
							fetchData={fetchData}
							iconOnly
						/>
					</div>

					<CardText className='text-muted small mb-3 flex-grow-1'>
						{data.description ||
							"It is a long established fact that a reader will be distracted."}
					</CardText>

					<Link href={`/admin/lessons/${data._id}`}>
						<div className='d-flex align-items-center mb-3'>
							<span className='small text-dark'>
								Created by <strong>{data.createdBy?.trim()}</strong>
							</span>
						</div>
					</Link>
				</CardBody>

				<CardFooter>
					<div className='d-flex justify-content-between align-items-center mb-3'>
						<div className='fs-5 fw-semibold text-dark'>
							₹{data.discountedPrice}
							{data.realPrice && (
								<del className='text-muted ms-2 fs-6'>₹{data.realPrice}</del>
							)}
						</div>
					</div>
					<div className='d-flex gap-2 w-100 justify-content-between align-items-center'>
						<Link
							href={`/admin/lessons/${data._id}`}
							className='btn btn-sm btn-outline-primary'>
							View Lessons
						</Link>
						<Button
							color='primary'
							size='sm'
							onClick={goToBatches}>
							View Batches
						</Button>
						<ViewReviewsModal
							reviews={data.reviews}
							courseId={data._id || ""}
						/>
					</div>
				</CardFooter>
			</Card>
		</Col>
	);
};

export default CourseCard;
