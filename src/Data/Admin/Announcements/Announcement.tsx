import DeleteAnnouncementModal from "@/Components/Admin/Announcements/DeleteAnnouncementModal";
import UpdateAnnouncementModal from "@/Components/Admin/Announcements/UpdateAnnouncementModal";
import { IAnnouncement } from "@/Types/Announcement.type";
import { TableColumn } from "react-data-table-component";

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

export const announcementTableColumns: TableColumn<IAnnouncement>[] = [
	{
		name: "Title",
		selector: (row) => row.title,
		sortable: true,
	},
	{
		name: "Message",
		selector: (row) => row.message,
		sortable: true,
		cell: (row) => (
			<div
				style={{
					maxWidth: "300px",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}>
				{row.message}
			</div>
		),
	},
	{
		name: "Target Roles",
		selector: (row) => row.roles?.join(", "),
		sortable: false,
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
	// {
	// 	name: "Actions",
	// 	cell: (row) => (
	// 		<ul className="action d-flex gap-2">
	// 			<UpdateAnnouncementModal values={row} />
	// 			<DeleteAnnouncementModal id={row._id!} />
	// 		</ul>
	// 	),
	// 	ignoreRowClick: true,
	// 	allowOverflow: true,
	// 	button: true,
	// },
];
