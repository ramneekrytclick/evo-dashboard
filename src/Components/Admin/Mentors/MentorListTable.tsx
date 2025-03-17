import FilterComponent from "@/CommonComponent/FilterComponent";
import { mentorTableColumns } from "@/Data/Admin/Mentors/Mentor";
import { MentorDataProps } from "@/Types/Mentor.type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card, CardBody } from "reactstrap";
import { getMentors } from "@/app/api/admin/mentors";
import UpdateMentorModal from "./UpdateMentorModal";
import DeleteMentorModal from "./DeleteMentorModal";

const MentorListTable = () => {
	const [filterText, setFilterText] = useState("");
	const [mentorTableData, setMentorTableData] = useState<MentorDataProps[]>([]);
	const filteredItems: MentorDataProps[] = mentorTableData?.filter(
		(item: MentorDataProps) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);
	const fetchData = async () => {
		try {
			const response = await getMentors();
			const data = response.mentors;
			// console.log(data);
			setMentorTableData(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<Card>
			<CardBody>
				<FilterComponent
					onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFilterText(e.target.value)
					}
					filterText={filterText}
				/>
				{/* <div className="table-responsive custom-scrollbar user-datatable mt-3"> */}
				<DataTable
					data={filteredItems}
					columns={mentorTableColumns.map(
						(column: TableColumn<MentorDataProps>) =>
							column.name === "Action"
								? {
										...column,
										cell: (row) => (
											<ul className="action">
												<UpdateMentorModal
													values={row}
													fetchData={fetchData}
												/>
												<DeleteMentorModal
													id={row._id!}
													fetchData={fetchData}
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
				{/* </div> */}
			</CardBody>
		</Card>
	);
};

export default MentorListTable;
