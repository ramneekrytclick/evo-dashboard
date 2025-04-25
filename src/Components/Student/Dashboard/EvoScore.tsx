"use client";
import { getStudentProfile } from "@/app/api/student";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { toast } from "react-toastify";

const EvoScore = ({
	loading,
	setLoading,
}: {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [evoScore, setEvoScore] = useState<number>(0);
	const evoColor = getEvoColor(evoScore);
	const evoComment = getEvoComment(evoScore);
	const fetchEvoScore = async () => {
		setLoading(true);
		try {
			const response = await getStudentProfile();
			const score =
				typeof response?.evoScore === "number" ? response.evoScore : 0;
			setEvoScore(score);
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to load EvoScore");
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchEvoScore();
	}, []);
	const chartOptions: ApexOptions = {
		chart: { type: "radialBar", height: 350 },
		plotOptions: {
			radialBar: {
				hollow: { size: "70%" },
				dataLabels: {
					name: {
						show: true,
						fontSize: "18px",
						offsetY: -10,
					},
					value: {
						show: true,
						fontSize: "16px",
						formatter: () => `${evoScore.toFixed(1)} / 10`,
					},
				},
			},
		},
		labels: ["EVO Score"],
		colors: [evoColor],
	};
	return (
		<div
			className='card shadow-sm p-3'
			style={{
				height: "350px",
				overflow: "scroll",
			}}>
			<h4 className='fw-bold text-muted'>EVO Score</h4>
			<ReactApexChart
				options={chartOptions}
				series={[evoScore * 10]} // scale to percentage for chart
				type='radialBar'
				height={240}
			/>
			<p
				className={`mt-2 fw-semibold text-center fs-6`}
				style={{
					color: evoColor,
				}}>
				{evoComment}
			</p>
		</div>
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
