import { useEffect, useState } from "react";
import { LessonType } from "@/Types/Lesson.type";
import { Card, CardBody, Button } from "reactstrap";
import Link from "next/link";
import { Youtube } from "react-feather";
import { getMyCourseProgress } from "@/app/api/student";
import { toast } from "react-toastify";

const LessonCard = ({
	lesson,
	courseId,
}: {
	lesson: LessonType;
	courseId: string;
}) => {
	return (
		<>
			<Card className='shadow-sm h-100 border-0 rounded-4 bg-primary-subtle'>
				<CardBody className='p-4 d-flex flex-column justify-content-between'>
					{/* Header */}
					<div>
						<Link href={`/student/learning/course/${courseId}/${lesson._id}`}>
							<h5
								className='fw-bold mb-1'
								style={{
									display: "-webkit-box",
									WebkitLineClamp: 1,
									WebkitBoxOrient: "vertical",
									overflow: "hidden",
									textOverflow: "ellipsis",
									wordBreak: "break-word", // handle long strings
									maxWidth: "100%",
								}}>
								{lesson.title}
							</h5>
						</Link>

						<p
							className='text-muted mb-3'
							style={{
								display: "-webkit-box",
								WebkitLineClamp: 2,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
								textOverflow: "ellipsis",
								wordBreak: "break-word",
								maxWidth: "100%",
							}}>
							{lesson.content}
						</p>
					</div>

					<Button
						outline
						color='primary'
						size='sm'
						className='w-100 d-flex align-items-center justify-content-center gap-2 mt-2'
						tag={Link}
						href={`/student/learning/course/${courseId}/${lesson._id}`}>
						View Lesson
					</Button>
				</CardBody>
			</Card>
		</>
	);
};

export default LessonCard;
