"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LessonType } from "@/Types/Lesson.type";
import { toast } from "react-toastify";
import { Spinner, Button, UncontrolledTooltip } from "reactstrap";
import Link from "next/link";
import { FileText, Info } from "react-feather";
import { getLessonById } from "@/app/api/admin/students";
import { getStudentLessonScores } from "@/app/api/student";

const LessonContainer = ({
	lessonId,
	courseId,
}: {
	courseId: string;
	lessonId: string;
}) => {
	const router = useRouter();
	const [data, setData] = useState<LessonType | null>(null);
	const [score, setScore] = useState<{
		lessonId: string;
		studentId: string;
		assignmentScore: number;
		quizScore: number;
	}>();
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await getLessonById(lessonId, courseId);
			setData(response);
		} catch (error) {
			toast.error("Failed to fetch lesson");
		} finally {
			setLoading(false);
		}
	};

	const fetchLessonScores = async () => {
		try {
			const response = await getStudentLessonScores(lessonId);
			setScore(response);
		} catch (error) {
			toast.error("Failed to fetch lesson scores");
		}
	};

	useEffect(() => {
		if (lessonId && courseId) {
			fetchData();
			fetchLessonScores();
		} else {
			toast.error("lessonId or courseId is undefined");
			setLoading(false);
		}
	}, [lessonId, courseId]);

	if (loading) return <Spinner className='m-3' />;
	if (!data) return <p className='text-muted'>No data available.</p>;

	const getYoutubeEmbedUrl = (url: string) => {
		const match = url.match(
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
		);
		return match
			? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`
			: null;
	};

	const videoEmbed = data.videoUrl ? getYoutubeEmbedUrl(data.videoUrl) : null;

	return (
		<>
			{/* <div className='d-flex justify-content-between align-items-center mb-3'>
				<h4 className='fw-bold mb-0'>{data.title}</h4>
			</div> */}

			{/* Video Section */}
			{videoEmbed && (
				<div className='mb-4'>
					<div className='ratio ratio-16x9'>
						<iframe
							src={videoEmbed}
							title='Lesson Video'
							allowFullScreen
							className='rounded border'></iframe>
					</div>
				</div>
			)}

			{/* Content Section */}
			<div className='mb-4'>
				<h6 className='fw-semibold'>{data.title}</h6>
				<p className='text-muted'>{data.content}</p>
			</div>

			{/* Scores */}
			<div className='mb-3'>
				<div className='d-flex align-items-center gap-2'>
					<p className='mb-0'>
						<strong>Quiz Score:</strong> {score?.quizScore ?? "Not Available"}
					</p>
					{score?.quizScore === 0 && (
						<>
							<Info
								id='quizScoreTip'
								size={16}
								className='text-info'
							/>
							<UncontrolledTooltip target='quizScoreTip'>
								Score is 0. This may be due to incorrect answers or not
								attempting the quiz.
							</UncontrolledTooltip>
						</>
					)}
				</div>

				<div className='d-flex align-items-center gap-2 mt-2'>
					<p className='mb-0'>
						<strong>Assignment Score:</strong>{" "}
						{score?.assignmentScore ?? "Not Available"}
					</p>
					{score?.assignmentScore === 0 && (
						<>
							<Info
								id='assignmentScoreTip'
								size={16}
								className='text-warning'
							/>
							<UncontrolledTooltip target='assignmentScoreTip'>
								Score is 0. This could be due to unsubmitted assignment or it's
								not graded yet.
							</UncontrolledTooltip>
						</>
					)}
				</div>
			</div>

			{/* Buttons */}
			{/* Buttons */}
			<div className='d-flex gap-3 mb-4'>
				{(!score?.quizScore || score.quizScore === 0) && (
					<Button
						color='info'
						onClick={() =>
							router.push(
								`/student/learning/course/${courseId}/${lessonId}/quiz`
							)
						}>
						Give Quiz
					</Button>
				)}

				{(!score?.assignmentScore || score.assignmentScore === 0) && (
					<Button
						color='warning'
						onClick={() =>
							router.push(
								`/student/learning/course/${courseId}/${lessonId}/assignment`
							)
						}>
						Submit Assignment
					</Button>
				)}
			</div>

			{/* Completion Note */}
			<p className='text-muted'>
				💡 <strong>Note:</strong> To complete this lesson, both quiz and
				assignment must be submitted and evaluated.
			</p>

			{/* Resources */}
			<div className='mb-4 mt-4'>
				<h6 className='fw-semibold'>Resources</h6>
				{data.resources && data.resources.length > 0 ? (
					<div className='d-flex flex-wrap gap-2'>
						{data.resources.map((url, index) => (
							<Button
								key={index}
								color='outline-secondary'
								size='sm'
								tag={Link}
								href={url}
								target='_blank'
								className='d-flex align-items-center gap-1'>
								<FileText size={14} /> View Resource {index + 1}
							</Button>
						))}
					</div>
				) : (
					<p className='text-muted'>No resources available.</p>
				)}
			</div>
		</>
	);
};

export default LessonContainer;
