"use client";

import { getStudentProfile } from "@/app/api/student";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader, Spinner } from "reactstrap";
import GaugeChart from "./Speedometer";
import { toast } from "react-toastify";
const EvoScore = ({ loading, setLoading }: any) => {
	const [evoScore, setEvoScore] = useState(0);
	const [scoreLoaded, setScoreLoaded] = useState(false);
	const fetchEvoScore = async () => {
		setLoading(true);
		try {
			const response = await getStudentProfile();
			const score =
				typeof response?.evoScore === "number" ? response.evoScore : 10;
			setEvoScore(score);
			setScoreLoaded(true);
		} catch (error) {
			setScoreLoaded(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEvoScore();
	}, []);
	if (evoScore === 0) {
		return (
			<Card className='text-dark evo-card'>
				<CardBody>
					<CardHeader className='border-0 bg-transparent px-0 pb-2'>
						<h4 className='fw-bold text-muted'>EVO Score</h4>
					</CardHeader>
					<p className='fs-6 text-light'>
						Start learning to begin tracking your growth!
					</p>
					<Link
						className='btn btn-primary'
						href={`/student/courses`}>
						{"Explore Courses"}
					</Link>
				</CardBody>
			</Card>
		);
	}
	return (
		<Card className='text-dark'>
			<CardBody className='text-center position-relative'>
				<CardHeader className='border-0 bg-transparent px-0 pb-2'>
					<h4 className='fw-bold text-muted'>EVO Score</h4>
				</CardHeader>
				{loading ? (
					<Spinner color='primary' />
				) : evoScore === 0 ? (
					<>
						<p className='fs-6 text-light'>
							Start learning to begin tracking your growth!
						</p>
						<Link
							className='btn btn-primary'
							href={`/student/courses`}>
							Explore Courses
						</Link>
					</>
				) : (
					<div className='py-1 position-relative'>
						<GaugeChart score={evoScore * 10} />
						{scoreLoaded && (
							<div className='d-flex justify-content-center align-items-center gap-2 mt-4'>
								<p
									className='fw-semibold fs-6 mb-0'
									style={{ color: getEvoColor(evoScore) }}>
									{getEvoComment(evoScore)}
								</p>
							</div>
						)}
					</div>
				)}
			</CardBody>
		</Card>
	);
};

export default EvoScore;
const getEvoComment = (score: number) => {
	const score10 = score * 10;
	const comments = {
		"0-25": [
			"Let's put in some more effort. Every expert was once a beginner!",
			"Low scores aren't failures, just feedback. Keep pushing!",
			"You have great potential. Let's tap into it with consistent learning.",
			"Consider revisiting core concepts to strengthen your foundation.",
			"Don't be disheartened. Every step forward counts!",
			"Try completing one extra lesson every day. You'll see the difference.",
			"Ask mentors questions—that’s what they’re here for!",
			"Great journeys begin with tough starts. Stay committed.",
			"Let’s aim to improve this score by 10% next week.",
			"Stay consistent. Progress is a process!",
		],
		"26-50": [
			"You're building momentum. Keep it going!",
			"You're halfway to mastery. Stay focused!",
			"Nice start! Now double down on your practice.",
			"Explore assignments or quizzes to level up faster.",
			"Let’s aim for a 10% jump this month—set daily goals!",
			"You’ve got the basics—now aim for breakthroughs.",
			"Consider joining a study group for deeper insights.",
			"Great effort! Let’s now turn that into mastery.",
			"You're progressing well. Stay on track!",
			"Just a bit more effort can take you to the next level.",
		],
		"51-75": [
			"Impressive progress! You're doing well.",
			"You're beyond average—strive for excellence now!",
			"Strong performance. Keep up the consistency.",
			"Your learning habits are showing results!",
			"Mentors are noticing your growth—amazing!",
			"Well done! Push through to the expert tier!",
			"Keep challenging yourself. You’re almost there.",
			"Your dedication is inspiring. Stay focused.",
			"Continue solving real-world problems to improve further.",
			"Just one step from mastery—go for it!",
		],
		"76-90": [
			"Outstanding performance! You're leading the way.",
			"This dedication is what success looks like!",
			"You're on fire! Keep the momentum up.",
			"Your hard work is clearly visible—brilliant job!",
			"Exceptional progress. Keep aiming higher.",
			"Others look up to your pace—be the inspiration.",
			"You're nearly at the top. Keep climbing!",
			"This is elite territory—own it!",
			"Stay consistent and aim to teach others too.",
			"Your learning discipline is top-notch!",
		],
		"91-100": [
			"You're a role model! Keep setting the benchmark.",
			"Legendary work! Stay sharp and keep evolving.",
			"You're in the top percentile—well deserved!",
			"Elite performer! Don’t forget to help others too.",
			"Your mastery is impressive—consider mentoring next!",
			"Wow! EVO Score like yours inspires the whole community.",
			"You’re crushing it! Maintain this incredible streak.",
			"Nothing beats consistency—and you're proof!",
			"Outstanding! Showcase your skills in projects now.",
			"All-stars like you light the path for others.",
		],
	};

	const getBucket = (s: number) =>
		s <= 2.5
			? "0-25"
			: s <= 5
			? "26-50"
			: s <= 7.5
			? "51-75"
			: s <= 9
			? "76-90"
			: "91-100";

	const options = comments[getBucket(score)];
	return options[Math.floor(Math.random() * options.length)];
};

const getEvoColor = (score: number) => {
	if (score <= 2.5) return "#FF4D4F";
	if (score <= 5) return "#FAAD14";
	if (score <= 7.5) return "#52C41A";
	if (score <= 9) return "#1890FF";
	return "#722ED1";
};
