"use client";
import { getBatchesByCourse } from "@/app/api/admin/batches";
import { useEffect, useState } from "react";

const CourseBatchesList = ({ id }: { id: string }) => {
	const [data, setData] = useState();
	const fetchData = async () => {
		try {
			const response = await getBatchesByCourse(id);
			setData(response);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return <div>{JSON.stringify(data)}</div>;
};

export default CourseBatchesList;
