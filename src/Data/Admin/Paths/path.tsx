import { PathProps } from "@/Types/Path.type";
import { TableColumn } from "react-data-table-component";

export const pathTableColumns: TableColumn<PathProps>[] = [
	{
		name: "Title",
		selector: (row: PathProps) => row.title || "N/A",
		sortable: true,
		wrap: true,
	},
	{
		name: "Description",
		selector: (row: PathProps) => row.description || "N/A",
		sortable: true,
		wrap: true,
		grow: 2,
	},
	{
		name: "Timing",
		selector: (row: PathProps) => row.timing || "-",
		sortable: true,
	},
	{
		name: "Price (₹)",
		selector: (row: PathProps) => row.price.toFixed(2),
		sortable: true,
		cell: (row: PathProps) => (
			<span className="badge bg-secondary">₹{row.price.toFixed(2)}</span>
		),
	},
	{
		name: "Courses Count",
		selector: (row: PathProps) => row.courses.length || 0,
		sortable: true,
		cell: (row: PathProps) => (
			<span className="badge bg-primary">
				{row.courses.length} {row.courses.length === 1 ? "Course" : "Courses"}
			</span>
		),
	},
	{
		name: "Action",
		sortable: false,
		cell: () => null, // You replace this in <DataTable> with custom modals (like Update/Delete)
		ignoreRowClick: true,
		allowOverflow: true,
		button: true,
	},
];
