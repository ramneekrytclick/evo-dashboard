import { IAnnouncement } from "@/Types/Announcement.type";
import { TableColumn } from "react-data-table-component";
import { Badge, UncontrolledTooltip } from "reactstrap";

export const announcementFilterOptions = [
	{
		name: "Title",
		options: [], // Placeholder for dynamic filtering or typeahead search
	},
	{
		name: "Target Audience",
		options: ["Mentor", "Manager", "Creator", "Students", "Employers"],
	},
	{
		name: "Visibility Period",
		options: ["Last 7 Days", "This Month", "Last Month", "Custom Date Range"],
	},
	{
		name: "Created By",
		options: ["Admin1", "Admin2", "Admin3"], // Replace with dynamic admin list
	},
	{
		name: "Status",
		options: ["Active", "Inactive", "Expired"],
	},
	{
		name: "Has Media",
		options: ["Yes", "No"],
	},
];

// import UpdateAnnouncementModal from "./UpdateAnnouncementModal";
// import DeleteAnnouncementModal from "./DeleteAnnouncementModal";

export const announcementTableColumns: TableColumn<IAnnouncement>[] = [
	{
		name: "Title",
		selector: (row) => row.title,
		sortable: true,
		cell: (row) => (
			<strong style={{ whiteSpace: "nowrap" }}>{row.title}</strong>
		),
	},
	{
		name: "Message",
		selector: (row) => row.description,
		sortable: true,
		cell: (row) => (
			<div
				id={`desc-tooltip-${row._id}`}
				style={{
					maxWidth: "250px",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}>
				{row.description}
				<UncontrolledTooltip
					placement="top"
					target={`desc-tooltip-${row._id}`}>
					{row.description}
				</UncontrolledTooltip>
			</div>
		),
	},
	{
		name: "Target Roles",
		selector: (row) => row.roles?.join(", "),
		cell: (row) => (
			<div className="d-flex flex-wrap gap-1">
				{row.roles?.map((role, i) => (
					<Badge
						key={i}
						color="info"
						className="text-uppercase">
						{role}
					</Badge>
				))}
			</div>
		),
	},
	{
		name: "Created At",
		selector: (row) =>
			new Date(row.createdAt).toLocaleDateString("en-IN", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			}),
		sortable: true,
	},
	// Optional future actions (edit/delete)
	// {
	//   name: "Actions",
	//   cell: (row) => (
	//     <ul className="action d-flex gap-2">
	//       <UpdateAnnouncementModal values={row} />
	//       <DeleteAnnouncementModal id={row._id!} />
	//     </ul>
	//   ),
	//   ignoreRowClick: true,
	//   allowOverflow: true,
	//   button: true,
	// },
];
