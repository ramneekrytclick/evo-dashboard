import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { MentorTitleText } from "@/Constant";
import { mentorTableColumns } from "@/Data/Admin/Mentors/Mentor";
import { MentorProps } from "@/Types/Mentor.type";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody } from "reactstrap";
import { sampleMentorsData } from "./SampleData";

const MentorListTable = () => {
    const [filterText,setFilterText]=useState("");
    const filteredItems: MentorProps[] = sampleMentorsData.filter(
                (item: MentorProps) => {
                    return Object.values(item).some((value) =>
                        value && value.toString().toLowerCase().includes(filterText.toLowerCase())
                    );
                }
            );

    return (
        <Card>
                <CommonCardHeader headClass="pb-0 card-no-border" title={MentorTitleText} />
                <CardBody>
                    <FilterComponent
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                        filterText={filterText}
                    />
                    <div className="table-responsive custom-scrollbar user-datatable mt-3">
                        <DataTable data={filteredItems} columns={mentorTableColumns} striped={true} fixedHeader fixedHeaderScrollHeight="40vh" className="display" />
                    </div>
                </CardBody>
            </Card>
    );
}

export default MentorListTable;