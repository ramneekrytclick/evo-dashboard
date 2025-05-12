"use client";

import React, { useEffect, useState } from "react";
import { Tooltip, Modal, ModalHeader, ModalBody } from "reactstrap";

const GaugeChart = ({ score }: { score: number }) => {
	const [animatedScore, setAnimatedScore] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		let current = 0;
		const interval = setInterval(() => {
			if (current >= score) return clearInterval(interval);
			current += 1;
			setAnimatedScore(current);
		}, 10);
		return () => clearInterval(interval);
	}, [score]);

	const angle = (animatedScore / 100) * 180 - 90;

	const zones = [
		{ label: "Beginner", color: "#FF4D4F", range: "0–25" },
		{ label: "Average", color: "#FAAD14", range: "26–50" },
		{ label: "Intermediate", color: "#52C41A", range: "51–75" },
		{ label: "Expert", color: "#1890FF", range: "76–100" },
	];

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				paddingTop: "66%",
				cursor: "default",
			}}
			id='gauge-chart-wrapper'>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
				}}>
				<svg
					width='100%'
					height='100%'
					viewBox='0 0 300 150'
					preserveAspectRatio='xMidYMid meet'>
					{zones.map((zone, i) => {
						const startAngle = -180 + i * 45;
						const endAngle = startAngle + 45;
						const radius = 140;

						const startX =
							150 + radius * Math.cos((Math.PI * startAngle) / 180);
						const startY =
							150 + radius * Math.sin((Math.PI * startAngle) / 180);
						const endX = 150 + radius * Math.cos((Math.PI * endAngle) / 180);
						const endY = 150 + radius * Math.sin((Math.PI * endAngle) / 180);

						const midAngle = (startAngle + endAngle) / 2;
						const labelX =
							150 + (radius - 40) * Math.cos((Math.PI * midAngle) / 180);
						const labelY =
							150 + (radius - 40) * Math.sin((Math.PI * midAngle) / 180);

						return (
							<g key={i}>
								<path
									d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
									stroke={zone.color}
									strokeWidth='12'
									fill='none'
								/>
								<text
									x={labelX}
									y={labelY}
									textAnchor='middle'
									alignmentBaseline='middle'
									fontSize='12'
									fontWeight='bold'
									fill={zone.color}>
									{zone.label}
								</text>
							</g>
						);
					})}
				</svg>

				<div
					style={{
						position: "absolute",
						left: "50%",
						bottom: "20%",
						width: "4px",
						height: "50%", // relative to container
						backgroundColor: "black",
						borderRadius: "2px",
						transform: `rotate(${angle}deg) translateX(-50%)`,
						transformOrigin: "bottom center",
						transition: "transform 0.5s ease-in-out",
						boxShadow: "0 0 4px rgba(0,0,0,0.6)",
						zIndex: 2,
					}}
				/>

				<div
					style={{
						position: "absolute",
						left: "calc(50% - 8px)",
						bottom: "calc(20% - 8px)",
						width: "16px",
						height: "16px",
						borderRadius: "50%",
						backgroundColor: "#000",
						zIndex: 3,
						boxShadow: "0 0 5px rgba(0,0,0,0.5)",
					}}
				/>
				<div
					style={{
						position: "absolute",
						bottom: "-20px",
						left: "50%",
						transform: "translateX(-50%)",
						textAlign: "center",
						fontWeight: "bold",
						fontSize: "1.5rem",
						color:
							score > 75
								? "#1890FF"
								: score > 50
								? "#52C41A"
								: score > 25
								? "#FAAD14"
								: "#FF4D4F",
					}}>
					{animatedScore}
				</div>
				<div
					style={{
						position: "absolute",
						bottom: "76%",
						left: "5%",
						transform: "translateX(-50%)",
						textAlign: "center",
						fontWeight: "bolder",
						fontSize: "1rem",
						border: "2px solid grey",
						borderRadius: "50%",
						backgroundColor: "white",
						color: "grey",
						height: "20px",
						width: "20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
					}}
					onClick={() => setModalOpen(true)}>
					i
				</div>
			</div>

			{/* Modal */}
			<Modal
				size='lg'
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}>
				<ModalHeader toggle={() => setModalOpen(false)}>
					<span className='fw-bold'>What is EVO Score?</span>
				</ModalHeader>
				<ModalBody>
					<span className='fs-4'>
						EVO Score is a comprehensive measure of your overall learning
						progress across the platform. It takes into account:
					</span>
					<ul className='m-2'>
						<li>📚 Course completions</li>
						<li>📝 Quiz & Assignment scores</li>
						<li>🎯 Consistency and engagement</li>
						<li>🏆 Time invested in skill-building</li>
					</ul>
					<h6 className='mt-3'>Levels Breakdown:</h6>
					<ul>
						<hr />
						<h6
							style={{
								color: "#FF4D4F",
								fontWeight: "bold",
								marginBottom: "10px",
							}}>
							🧱 Beginner (0–25)
						</h6>
						<p>
							You’re just starting your learning journey. At this stage, focus
							on exploring the platform, completing introductory lessons, and
							forming consistent study habits. Don’t be discouraged — every
							expert was once a beginner. Build momentum by finishing your first
							few modules and asking questions.
						</p>

						<hr />
						<h6
							style={{
								color: "#FAAD14",
								fontWeight: "bold",
								marginBottom: "10px",
							}}>
							🚀 Average (26–50)
						</h6>
						<p>
							You’ve gained traction and completed the basics. You’re steadily
							progressing through courses and gaining confidence. To elevate
							further, challenge yourself with intermediate topics, participate
							in quizzes regularly, and maintain your learning streak.
						</p>

						<hr />
						<h6
							style={{
								color: "#52C41A",
								fontWeight: "bold",
								marginBottom: "10px",
							}}>
							📈 Intermediate (51–75)
						</h6>
						<p>
							You’ve developed a solid learning rhythm and are showing
							above-average consistency and performance. Your progress reflects
							a strong foundation. Now is the time to tackle advanced
							challenges, contribute to discussions, and experiment with
							applying what you've learned in real-life scenarios.
						</p>

						<hr />
						<h6
							style={{
								color: "#1890FF",
								fontWeight: "bold",
								marginBottom: "10px",
							}}>
							🏆 Expert (76–100)
						</h6>
						<p>
							You’re among the top performers on the platform. Your EVO Score
							reflects exceptional discipline, knowledge, and consistency. At
							this level, you should focus on mastery, mentoring others, and
							leveraging your skills in real-world or project-based
							applications. Keep pushing boundaries and aim to become a thought
							leader in your domain.
						</p>
					</ul>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default GaugeChart;
