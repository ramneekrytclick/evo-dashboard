"use client";

import { getBatchBySlug } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import { useEffect, useState } from "react";

const BatchDetailsSlug = ({ id }: { id: string }) => {
	const [batch, setBatch] = useState<BatchProps | null>(null);
	const fetchBatch = async () => {
		const response = await getBatchBySlug(id);
		setBatch(response);
	};
	useEffect(() => {
		fetchBatch();
	}, []);
	return <div>{JSON.stringify(batch)}</div>;
};

export default BatchDetailsSlug;
