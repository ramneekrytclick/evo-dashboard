"use client";
import { getPaths } from "@/app/api/admin/path";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "reactstrap";

const PathCards = () => {
	const [paths, setPaths] = useState([]);
	const fetchPaths = async () => {
		// try {
		// 	const response = await getPaths("123");
		// 	setPaths(response.data);
		// } catch (error) {
		// 	toast.error("Error in fetching paths");
		// }
	};
	useEffect(() => {
		fetchPaths();
	}, []);
	return (
		<>{JSON.stringify(paths)}</>
		// <Card className="height-equal">
		// 	<CommonCardHeader
		// 		title={PathTimeline}
		// 	/>
		// 	<CardBody className="dark-timeline mb-4">
		// 		<ul className="square-timeline simple-list">
		// 			<AnnualFunctionHoveringTimeline />
		// 			<InterviewHoveringTimeline />
		// 			<MeetupHoveringTimeline />
		// 		</ul>
		// 	</CardBody>
		// </Card>
	);
};

export default PathCards;
