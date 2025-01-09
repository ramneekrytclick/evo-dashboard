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
      center: false,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
      center: false,
      cell: (row) => (
        <div style={{ maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {row.message}
        </div>
      ),
    },
    {
      name: "Media",
      sortable: false,
      center: true,
      cell: (row) =>
        row.media ? (
          <a href={row.media} target="_blank" rel="noopener noreferrer">
            View Media
          </a>
        ) : (
          "No Media"
        ),
    },
    {
      name: "Target Audience",
      selector: (row) => row.targetAudience.join(", "),
      sortable: false,
      center: false,
    },
    {
      name: "Visibility Start",
      selector: (row) => new Date(row.visibilityStart).toLocaleDateString(),
      sortable: true,
      center: false,
    },
    {
      name: "Visibility End",
      selector: (row) => new Date(row.visibilityEnd).toLocaleDateString(),
      sortable: true,
      center: false,
    },
    {
      name: "Action",
      sortable: false,
      center: false,
      cell: (row) => (
        <ul className="action">
          <li className="edit">
            <a href={`/announcements/edit/${row.id}`}>
              <i className="icon-pencil-alt" />
            </a>
          </li>
          <li className="delete">
            <a href={`/announcements/delete/${row.id}`}>
              <i className="icon-trash" />
            </a>
          </li>
        </ul>
      ),
    },
  ];
  