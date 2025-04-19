"use client";
import { Button, Card, CardBody, Badge } from "reactstrap";
import Image from "next/image";
import { getImageURL } from "@/CommonComponent/imageURL";

const CourseCardCC = ({
	course,
	categories,
	subcategories,
	wannabe,
	onEdit,
}: any) => {
	const category = categories.find((c: any) => c._id === course.category);
	const subcategory = subcategories.find(
		(s: any) => s._id === course.subcategory
	);

	const interests = Array.isArray(course.wannaBeInterest)
		? course.wannaBeInterest.map(
				(id: string) => wannabe.find((w: any) => w._id === id)?.title || id
		  )
		: [];

	const discountPercent = course.realPrice
		? Math.round(
				((course.realPrice - course.discountedPrice) / course.realPrice) * 100
		  )
		: 0;

	return (
		<Card className='h-100 shadow-sm rounded-4 overflow-hidden border-0'>
			{course.photo && (
				<div className='position-relative'>
					<Image
						src={getImageURL(course.photo)}
						alt={course.title}
						width={400}
						height={180}
						style={{ objectFit: "cover", width: "100%", height: "180px" }}
					/>
					{discountPercent > 0 && (
						<Badge
							color='danger'
							pill
							className='position-absolute top-0 end-0 m-2'>
							-{discountPercent}% OFF
						</Badge>
					)}
				</div>
			)}

			<CardBody className='p-3'>
				<h5 className='fw-bold text-dark text-truncate'>{course.title}</h5>
				<p className='small text-muted mb-2'>
					{course.whatYouWillLearn || "-"}
				</p>

				<p className='mb-2'>
					<Badge
						color='primary'
						className='me-2'>
						{category?.title || course.category}
					</Badge>
					<Badge color='info'>{subcategory?.title || course.subcategory}</Badge>
				</p>

				<div className='mb-2 d-flex flex-wrap gap-1'>
					{interests.map((interest: string, i: number) => (
						<Badge
							key={i}
							color='light'
							className='text-dark border'>
							{interest}
						</Badge>
					))}
				</div>

				<div className='d-flex justify-content-between align-items-center mb-3'>
					<span className='fw-semibold text-success fs-5'>
						₹{course.discountedPrice}
					</span>
					{course.realPrice && (
						<del className='text-muted ms-2 fs-6'>₹{course.realPrice}</del>
					)}
				</div>

				<Button
					color='primary'
					size='sm'
					className='w-100'
					onClick={onEdit}>
					Update Course
				</Button>
			</CardBody>
		</Card>
	);
};

export default CourseCardCC;
