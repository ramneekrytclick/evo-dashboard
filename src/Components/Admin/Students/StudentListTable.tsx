import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { StudentTitle } from "@/Constant";
import { studentTableColumns } from "@/Data/Admin/Students/Student";
import { StudentProps } from "@/Types/Student.type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card, CardBody } from "reactstrap";
import { sampleStudentsData } from "./SampleData";
import { getStudents } from "@/app/api/admin/students";
import UpdateStudentModal from "./UpdateMentorModal";
import DeleteStudentModal from "./DeleteStudentModal";

const StudentListTable = () => {
	const [filterText, setFilterText] = useState("");
	const [studentList,setStudentList]= useState([])
	const filteredItems: StudentProps[] = studentList.filter(
		(item: StudentProps) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);
    const fetchData = async ()=>{
        try {
            const response = await getStudents();
			const data = response.students;
			setStudentList(data);
        } catch (error) {
			console.error(error);
        }
    }
	useEffect(()=>{
		fetchData();
	},[])
	return (
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
						columns={studentTableColumns.map((column:TableColumn<StudentProps>) =>
							column.name === "Action"
								? {
										...column,
										cell: (row) => (
											<ul className="action">
												<UpdateStudentModal values={row} fetchData={fetchData} />
												<DeleteStudentModal id={row._id!} fetchData={fetchData} />
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
	);
};

export default StudentListTable;
