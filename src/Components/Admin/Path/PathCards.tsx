"use client";
import { getPaths } from "@/app/api/admin/path";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { pathTableColumns } from "@/Data/Admin/Paths/path";
import { PathProps } from "@/Types/Path.type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import UpdatePathModal from "./UpdatePathModal";
import DeletePathModal from "./DeletePathModal";
import { pathFakeData } from "@/FakeData/admin/path";

const PathCards = () => {
	const [paths, setPaths] = useState<PathProps[]>([]);
	const [filterText, setFilterText] = useState("");
	const fetchPaths = async () => {
		try {
			const response = await getPaths();
			setPaths(response.paths);
			console.log(response.paths);
		} catch (error) {
			toast.error("Error in fetching paths");
			setPaths(pathFakeData);
		}
	};
	const filteredItems: PathProps[] = paths.filter((item: PathProps) => {
		return Object.values(item).some(
			(value) =>
				value &&
				value.toString().toLowerCase().includes(filterText.toLowerCase())
		);
	});
	useEffect(() => {
		fetchPaths();
	}, []);
	return (
		<>
			<Card>
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
							columns={pathTableColumns.map((column: TableColumn<PathProps>) =>
								column.name === "Action"
									? {
											...column,
											cell: (row) => (
												<ul className="action">
													<UpdatePathModal
														values={row}
														fetchData={fetchPaths}
													/>
													<DeletePathModal
														id={row._id!}
														fetchData={fetchPaths}
													/>
												</ul>
											),
									  }
									: column
							)}
							striped={true}
							fixedHeader
							fixedHeaderScrollHeight="40vh"
							className="display"
						/>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default PathCards;
