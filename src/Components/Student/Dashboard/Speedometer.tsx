import React, { useEffect, useState } from "react";

const GaugeChart = ({ score }: { score: number }) => {
	const [animatedScore, setAnimatedScore] = useState(0);

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
		{ label: "Beginner", color: "#FF4D4F" },
		{ label: "Average", color: "#FAAD14" },
		{ label: "Intermediate", color: "#52C41A" },
		{ label: "Expert", color: "#1890FF" },
	];

	return (
		<div
			style={{
				position: "relative",
				width: 300,
				height: 180,
				margin: "0 auto",
			}}>
			{/* Colored zones */}
			<svg
				width='300'
				height='150'>
				{zones.map((zone, i) => {
					const startAngle = -180 + i * 45;
					const endAngle = startAngle + 45;
					const largeArc = endAngle - startAngle > 180 ? 1 : 0;
					const radius = 140;

					const startX = 150 + radius * Math.cos((Math.PI * startAngle) / 180);
					const startY = 150 + radius * Math.sin((Math.PI * startAngle) / 180);

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

			{/* Needle */}
			<div
				style={{
					position: "absolute",
					left: "50%",
					bottom: "20%",
					width: 0,
					height: 0,
					borderLeft: "6px solid transparent",
					borderRight: "6px solid transparent",
					borderBottom: "90px solid black",
					transform: `rotate(${angle}deg) translateX(-50%)`,
					transformOrigin: "bottom center",
					transition: "transform 0.5s ease-in-out",
				}}></div>

			{/* Score Number */}
			<div
				style={{
					position: "absolute",
					top: "calc(100% - 30px)",
					left: "50%",
					transform: "translateX(-50%)",
					fontWeight: "bold",
					fontSize: 24,
				}}>
				{animatedScore}
			</div>
		</div>
	);
};

export default GaugeChart;
