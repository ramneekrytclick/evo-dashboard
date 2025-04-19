"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CardBody, ListGroup, ListGroupItem, Tooltip } from "reactstrap";
import { ArrowLeftCircle } from "react-feather";
import { useEffect, useState } from "react";
import { getLessonsByCourseID } from "@/app/api/student";

const LessonSidebar = ({ courseId }: { courseId: string }) => {
	const pathname = usePathname();
	const [lessons, setLessons] = useState<any[]>([]);
	const [tooltipOpenId, setTooltipOpenId] = useState<string | null>(null);

	useEffect(() => {
		const fetchLessons = async () => {
			const result = await getLessonsByCourseID(courseId);
			setLessons(result.lessons);
		};
		fetchLessons();
	}, [courseId]);

	const toggleTooltip = (id: string) => {
		setTooltipOpenId((prev) => (prev === id ? null : id));
	};

	return (
		<CardBody
			className='h-100 d-flex flex-column'
			style={{
				position: "sticky",
				top: "70px",
				height: "calc(100vh - 70px)",
				overflowY: "auto",
			}}>
			<h6 className='fw-bold w-100 text-secondary mb-3 d-flex align-items-center gap-2'>
				<Link href={`/student/learning/course/${courseId}`}>
					<ArrowLeftCircle
						size={18}
						className='text-primary'
					/>
				</Link>
				Lessons
			</h6>

			<ListGroup
				className='w-100'
				flush>
				{lessons.map((lesson) => {
					const isActive = pathname?.startsWith(
						`/student/learning/course/${courseId}/${lesson._id}`
					);
					const tooltipId = `lesson-tooltip-${lesson._id}`;

					return (
						<ListGroupItem
							key={lesson._id}
							action
							className={`p-2 w-100  ${
								isActive ? "fw-bold text-primary bg-light" : "text-dark"
							}`}
							style={{ padding: "0.75rem 1rem" }}>
							<Link
								href={`/student/learning/course/${courseId}/${lesson._id}`}
								style={{
									textDecoration: "none",
									color: isActive ? "#0d6efd" : "#212529",
								}}>
								<span
									id={tooltipId}
									style={{
										display: "inline-block",
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}>
									{lesson.title}
								</span>
							</Link>

							<Tooltip
								target={tooltipId}
								isOpen={tooltipOpenId === tooltipId}
								toggle={() => toggleTooltip(tooltipId)}
								placement='right'>
								{lesson.title}
							</Tooltip>
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</CardBody>
	);
};

export default LessonSidebar;
