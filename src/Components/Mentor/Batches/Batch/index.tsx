"use client";

import { useEffect, useState } from "react";
import { getBatchByID } from "@/app/api/mentor"; // use mentor API
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card } from "reactstrap";
import GroupChat from "./GroupChat"; // Keep the same GroupChat component

const MentorBatchContainer = ({ id }: { id: string }) => {
	const [batch, setBatch] = useState<any>(null);

	const fetchData = async () => {
		const response = await getBatchByID(id);
		setBatch(response.batch);
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (!batch) return <p className="text-center mt-4">Loading...</p>;

	return (
		<>
			<Breadcrumbs
				mainTitle="Batch"
				parent="Batches"
				title={batch.course?.title || "Batch"}
			/>

			<Card style={{ height: "80vh" }}>
				{/* Entire layout is focused on chat */}
				<GroupChat batchId={id} />
			</Card>
		</>
	);
};

export default MentorBatchContainer;
