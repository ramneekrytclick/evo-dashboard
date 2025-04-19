"use client";

import { useEffect, useState } from "react";
import { getBatchByID } from "@/app/api/mentor"; // use mentor API
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card } from "reactstrap";
import GroupChat from "./GroupChat"; // Keep the same GroupChat component
import { BatchProps } from "@/Types/Course.type";

const MentorBatchContainer = ({ id }: { id: string }) => {
	const [batch, setBatch] = useState<BatchProps>();

	const fetchData = async () => {
		const response = await getBatchByID(id);
		setBatch(response.batch);
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (!batch) return <p className='text-center mt-4'>Loading...</p>;

	return (
		<>
			<Breadcrumbs
				mainTitle={`Batch: ${batch.name} (Course ${batch?.course?.title})`}
				parent='Batches'
				title={`${batch.name}`}
			/>

			<Card style={{ height: "80vh" }}>
				<GroupChat batchId={id} />
			</Card>
		</>
	);
};

export default MentorBatchContainer;
