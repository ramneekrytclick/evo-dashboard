"use client";

import { generateApiKey } from "@/app/api/admin/api-key";
import { useEffect, useState } from "react";

const ApiKeyListTable = () => {
	const [apiKey, setApiKey] = useState();
	const fetchApiKey = async () => {
		try {
			const response = await generateApiKey();
			const data = await response;
			console.log(data);
			setApiKey(data.apiKey);
		} catch (error) {
			console.error("Error fetching API keys:", error);
		}
	};
	useEffect(() => {
		fetchApiKey();
	}, []);
	return <div>{JSON.stringify(apiKey)}</div>;
};

export default ApiKeyListTable;
