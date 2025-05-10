"use client";
import GaugeChart from "@/Components/Student/Dashboard/Speedometer";

const page = () => {
	return (
		<div style={{ width: "100%", height: "100vh", paddingTop: "100px" }}>
			<GaugeChart score={90} />
		</div>
	);
};

export default page;
