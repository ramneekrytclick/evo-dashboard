"use client";

import { getBatches } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import { useEffect, useState } from "react";
import { Card, Row } from "reactstrap";
import BatchDetails from "./BatchDetails";
import CreateBatchModal from "../CreateBatchModal";

const BatchesList = () => {
	const [batches, setBatches] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const fetchBatches = async () => {
		try {
			const response = await getBatches();
			const BatchData = response.batches;
			console.log(response.batches);
			setBatches(BatchData);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchBatches();
	}, []);
	return (
		<div>
			<CreateBatchModal fetchData={fetchBatches}/>
			<div className={`mt-4`}>
				<Row>
					{batches.map((batch: BatchProps) => (
						<div
							className={"col-xl-12"}
							key={batch._id}>
							<Card>
								<div className="product-box">
									<BatchDetails batch={batch} />
								</div>
							</Card>
						</div>
					))}
				</Row>
			</div>
		</div>
	);
};

export default BatchesList;
