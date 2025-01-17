import { SupportTicketProps } from "@/Types/Support.type";

export const supportTableColumns = [
    {
      name: "Ticket ID",
      selector: (row: SupportTicketProps) => row["_id"] || "N/A",
      sortable: true,
      center: false,
      width:"15%",
    },
    {
      name: "Subject",
      selector: (row: SupportTicketProps) => row["subject"],
      sortable: true,
      center: false,
    },
    {
      name: "Message",
      cell: (row: SupportTicketProps) => (
        <span title={row.message}>
          {row.message.length > 50 ? `${row.message.slice(0, 50)}...` : row.message}
        </span>
      ),
      sortable: false,
      center: false,
    },
    {
      name: "Status",
      cell: (row: SupportTicketProps) => (
        <span
          style={{
            color: row.status === "Open" ? "green" : row.status === "Closed" ? "red" : "gray",
          }}
        >
          {row.status || "Pending"}
        </span>
      ),
      sortable: true,
      center: true,
    },
  ];
  