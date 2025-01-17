"use client";
import { getStudents } from "@/app/api/employer";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { studentTableColumns } from "@/Data/Employer/Students";
import { StudentProps } from "@/Types/Student.type";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";

const StudentsTable = () => {
	const [students, setStudents] = useState([]);
	const [filterText, setFilterText] = useState("");
	const fetchStudents = async () => {
		try {
			const response = await getStudents();
			console.log(response);
			setStudents(response.students);
		} catch (error) {
			toast.error("Error fetching students");
		}
	};
    const filteredItems: StudentProps[] = students.filter(
            (item: StudentProps) => {
                return Object.values(item).some(
                    (value) =>
                        value &&
                        value.toString().toLowerCase().includes(filterText.toLowerCase())
                );
            }
        );
	useEffect(() => {
		fetchStudents();
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
					<div className="table-responsive custom-scrollbar user-datatable mt-3">
						<DataTable
							data={filteredItems}
							columns={studentTableColumns
                            //     .map(
							// 	(column: TableColumn<StudentProps>) =>
							// 		column.name === "Action"
							// 			? {
							// 					...column,
							// 					cell: (row) => (
							// 						<ul className="action">
							// 							<UpdateStudentModal
							// 								values={row}
							// 								fetchData={fetchData}
							// 							/>
							// 							<DeleteStudentModal
							// 								id={row._id!}
							// 								fetchData={fetchData}
							// 							/>
							// 						</ul>
							// 					),
							// 			  }
							// 			: column
							// )
                        }
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

export default StudentsTable;
