import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { StudentTitle } from "@/Constant";
import { studentTableColumns } from "@/Data/Admin/Students/Student";
import { StudentProps } from "@/Types/Student.type";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody } from "reactstrap";
import { sampleStudentsData } from "./SampleData";

const StudentListTable = () => {
    const [filterText,setFilterText]=useState("");
    const filteredItems: StudentProps[] = sampleStudentsData.filter(
                (item: StudentProps) => {
                    return Object.values(item).some((value) =>
                        value && value.toString().toLowerCase().includes(filterText.toLowerCase())
                    );
                }
            );

    return (
        <Card>
                <CommonCardHeader headClass="pb-0 card-no-border" title={StudentTitle} />
                <CardBody>
                    <FilterComponent
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                        filterText={filterText}
                    />
                    <div className="table-responsive custom-scrollbar user-datatable mt-3">
                        <DataTable data={filteredItems} columns={studentTableColumns} striped={true} fixedHeader fixedHeaderScrollHeight="40vh" className="display" />
                    </div>
                </CardBody>
            </Card>
    );
}

export default StudentListTable;