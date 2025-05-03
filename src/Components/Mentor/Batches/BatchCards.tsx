"use client";

import { useEffect, useState } from "react";
import { getMentorBatches } from "@/app/api/mentor";
import { BatchProps } from "@/Types/Course.type";
import Link from "next/link";
import { toast } from "react-toastify";
import {
	Badge,
	Card,
	CardBody,
	CardText,
	CardTitle,
	Col,
	Row,
	Spinner,
} from "reactstrap";
import BatchCard from "./BatchCard";

const BatchCards = () => {
	const [batches, setBatches] = useState<BatchProps[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchBatches = async () => {
		try {
			const response = await getMentorBatches();
			setBatches(response.batches);
		} catch (error) {
			toast.error("Error fetching batches");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBatches();
	}, []);
	if (loading) {
		return (
			<h5 className='text-center text-primary d-flex justify-content-center align-items-center gap-1'>
				Loading
				<Spinner />
			</h5>
		);
	}
	return (
		<Row
			className='g-4'
			style={{ height: "76vh", overflowY: "scroll" }}>
			{batches.length === 0 && <h5>No Batches Found</h5>}
			{batches.map((batch) => (
				<Col
					xl={4}
					md={6}
					key={batch._id}>
					<BatchCard batch={batch} />
				</Col>
			))}
		</Row>
	);
};

export default BatchCards;
