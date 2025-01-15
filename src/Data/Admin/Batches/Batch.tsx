import { TableColumn } from "react-data-table-component";
import { BatchProps } from "@/Types/Course.type";
import { Badge } from "reactstrap";

export const batchTableColumns: TableColumn<BatchProps>[] = [
	{
		name: "Batch Name",
		selector: (row) => row.name,
		sortable: true,
		center: false,
		cell: (row) => <span className="fw-bolder">{row.name}</span>,
	},
	{
		name: "Batch Status",
		selector: (row) => row.batchStatus,
		sortable: true,
		center: false,
		cell: (row) => <Badge color={`${row.batchStatus=="Active"?"success":"danger"}`} style={{fontSize:"12px"}}>{row.batchStatus}</Badge>,
	},
	{
		name: "Course ID",
		sortable: true,
		center: false,
		cell: (row) => <span>{JSON.stringify(row.courseId)}</span>,
	},
	{
		name: "Start Date",
		selector: (row) => row.startDate,
		sortable: true,
		center: false,
		cell: (row) => <span>{new Date(row.startDate).toLocaleDateString()}</span>,
	},
	{
		name: "End Date",
		selector: (row) => row.endDate,
		sortable: true,
		center: false,
		cell: (row) => <span>{new Date(row.endDate).toLocaleDateString()}</span>,
	},
	{
		name: "Students",
		selector: (row) => row.students?.length || 0,
		sortable: true,
		center: false,
		cell: (row) => <span>{row.students?.length || 0}</span>,
	},
	{
		name: "Mentors",
		selector: (row) => row.mentors?.length || 0,
		sortable: true,
		center: false,
		cell: (row) => <span>{row.mentors?.length || 0}</span>,
	},
	{
		name: "Promo Codes",
		selector: (row) => row.promoCodes?.length || 0,
		sortable: true,
		center: false,
		cell: (row) => <span>{row.promoCodes?.length || 0}</span>,
	},
	{
		name: "Actions",
		sortable: false,
		center: false,
	},
];