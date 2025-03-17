import { Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { EmployerProps } from "@/Types/Employer.type";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { employerTableColumns } from "@/Data/Admin/Employers/Employer";
import { getEmployers } from "@/app/api/admin/employers";
import UpdateEmployerModal from "./UpdateEmployerModal";
import DeleteEmployerModal from "./DeleteEmployerModal";

const EmployerListTable = () => {
	const [filterText, setFilterText] = useState("");
	const [employers, setEmployers] = useState([]);

	const filteredItems: EmployerProps[] = employers?.filter(
		(item: EmployerProps) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);
	const fetchEmployers = async () => {
		try {
			const response = await getEmployers();
			setEmployers(response.employers);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchEmployers();
	}, []);
	return (
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
						columns={employerTableColumns.map(
							(column: TableColumn<EmployerProps>) =>
								column.name === "Action"
									? {
											...column,
											cell: (row) => (
												<ul className="action">
													<UpdateEmployerModal
														values={row}
														fetchData={fetchEmployers}
													/>
													<DeleteEmployerModal
														id={row._id}
														fetchData={fetchEmployers}
													/>
												</ul>
											),
									  }
									: column
						)}
						striped={true}
						// fixedHeader
						fixedHeaderScrollHeight="40vh"
						// className="display"
						pagination
					/>
				</div>
			</CardBody>
		</Card>
	);
};

export default EmployerListTable;
