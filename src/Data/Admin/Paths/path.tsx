
import { PathProps } from "@/Types/Path.type";
import { TableColumn } from "react-data-table-component"

export const pathTableColumns: TableColumn<PathProps>[] = [
    {
        name: "Name",
        selector: (row: PathProps) => row.name || "N/A",
        sortable: true,
    },
    {
        name: "Description",
        selector: (row: PathProps) => row.description || "N/A",
        sortable: true,
    },
    {
        name: "Courses Count",
        selector: (row: PathProps) => row.courses.length || 0,
        sortable: true,
        cell: (row: PathProps) => (
            <span className="badge bg-primary" style={{fontSize:"0.9em"}}>
                {row.courses.length} {row.courses.length === 1 ? "Course" : "Courses"}
            </span>
        ),
    },
    {
        name: "Roadmap Steps",
        selector: (row: PathProps) => {
            if (row.roadmapSuggestions && row.roadmapSuggestions.length > 0) {
                return row.roadmapSuggestions.map((step: string) => step).join(", ");
            }
            return "-";
        },
        sortable: true,
    },
    {
        name: "Action",
        sortable:false
    },
];