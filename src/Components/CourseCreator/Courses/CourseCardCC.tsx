"use client";
import { Button, Card, CardBody, Badge } from "reactstrap";
import Image from "next/image";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

const CourseCardCC = ({
	course,
	categories,
	subcategories,
	wannabe,
	onEdit,
}: any) => {
	const resolvedPhoto = course.photo ? course.photo.replace(/\\/g, "/") : "";
	const photoURL = resolvedPhoto.startsWith("uploads")
		? `${backendURL}/${resolvedPhoto}`
		: `${backendURL}/uploads/${resolvedPhoto}`;

	const category = categories.find((c: any) => c._id === course.category);
	const subcategory = subcategories.find(
		(s: any) => s._id === course.subcategory
	);

	const interests = course.interest
		? course.interest
				.split(",")
				.map(
					(id: string) => wannabe.find((w: any) => w._id === id)?.title || id
				)
		: [];

	return (
		<Card className='h-100 shadow-sm'>
			{course.photo && (
				<Image
					src={photoURL}
					alt={course.title}
					width={300}
					height={160}
					style={{ objectFit: "cover", width: "100%" }}
				/>
			)}
			<CardBody>
				<h5 className='mt-2 text-truncate'>{course.title}</h5>
				<p className='text-muted'>
					₹{course.discountedPrice}{" "}
					<del className='text-danger'>₹{course.realPrice}</del>
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
					{interests.map((w: any, i: number) => (
						<Badge
							key={i}
							color='light'
							className='text-dark border'>
							{w}
						</Badge>
					))}
				</div>
				<Button
					color='primary'
					size='sm'
					onClick={onEdit}>
					Update Course
				</Button>
			</CardBody>
		</Card>
	);
};

export default CourseCardCC;
