"use client"
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { AnnouncementsTitle } from "@/Constant";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody } from "reactstrap";
import { sampleAnnouncementsData } from "./SampleData";
import { announcementTableColumns } from "@/Data/Admin/Announcements/Announcement";
import { IAnnouncement } from "@/Types/Announcement.type";

const AnnouncementsListTable = () => {
    const [filterText,setFilterText]=useState("");
    const filteredItems: IAnnouncement[] = sampleAnnouncementsData.filter(
                (item: IAnnouncement) => {
                    return Object.values(item).some((value) =>
                        value && value.toString().toLowerCase().includes(filterText.toLowerCase())
                    );
                }
            );

    return (
        <Card>
                <CommonCardHeader headClass="pb-0 card-no-border" title={AnnouncementsTitle} />
                <CardBody>
                    <FilterComponent
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                        filterText={filterText}
                    />
                    <div className="table-responsive custom-scrollbar user-datatable mt-3">
                        <DataTable data={filteredItems} columns={announcementTableColumns} striped={true} fixedHeader fixedHeaderScrollHeight="40vh" className="display" />
                    </div>
                </CardBody>
            </Card>
    );
}

export default AnnouncementsListTable;