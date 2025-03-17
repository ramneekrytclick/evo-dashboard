"use client";

import { getBatches } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import { useEffect, useState } from "react";
import { Card, CardBody, Row } from "reactstrap";
import BatchDetails from "./BatchDetails";
import CreateBatchModal from "../CreateBatchModal";
import BatchListTable from "./BatchListTable";
import FilterComponent from "@/CommonComponent/FilterComponent";
import DataTable, { TableColumn } from "react-data-table-component";
import { batchTableColumns } from "@/Data/Admin/Batches/Batch";
import UpdateBatchModal from "./UpdateBatchModal";
import DeleteBatchModal from "./DeleteBatchModal";
import { batchFakeData } from "@/FakeData/admin/batch";

const BatchesList = () => {
	const [batches, setBatches] = useState<any[]>([]);
	const [filterText, setFilterText] = useState("");
	const filteredItems: BatchProps[] = batches.filter((item: BatchProps) => {
		return Object.values(item).some(
			(value) =>
				value &&
				value.toString().toLowerCase().includes(filterText.toLowerCase())
		);
	});
	const fetchBatches = async () => {
		try {
			const response = await getBatches();
			const BatchData = response.batches;
			console.log(response.batches);
			setBatches(BatchData);
		} catch (error) {
			console.log(error);
			setBatches(batchFakeData);
		}
	};
	useEffect(() => {
		fetchBatches();
	}, []);
	return (
		<div>
			<CreateBatchModal fetchData={fetchBatches} />
			<Card>
				{/* <CommonCardHeader headClass="pb-0 card-no-border" title={CourseTitleLabel} /> */}
				<CardBody>
					<FilterComponent
						onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
							setFilterText(e.target.value)
						}
						filterText={filterText}
					/>
					<div className="table-responsive custom-scrollbar user-datatable mt-3">
						<DataTable
							data={filteredItems}
							columns={batchTableColumns.map(
								(column: TableColumn<BatchProps>) =>
									column.name === "Actions"
										? {
												...column,
												cell: (row: any) => (
													<ul className="action">
														<UpdateBatchModal
															values={row}
															fetchData={fetchBatches}
														/>
														<DeleteBatchModal
															id={row._id}
															fetchData={fetchBatches}
														/>
													</ul>
												),
										  }
										: column
							)}
							striped={true}
							pagination
							fixedHeader
							// fixedHeaderScrollHeight="40vh"
							className="display"
						/>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default BatchesList;
