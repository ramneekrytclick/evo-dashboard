import { MentorListData } from "@/Types/Mentor.type";
import { TableColumn } from "react-data-table-component";

export const mentorTableColumns: TableColumn<MentorListData>[] = [
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        center: false,
    },
    {
        name: "Username",
        selector: (row) => row.username,
        sortable: true,
        center: false,
    },
    {
        name: "Date of Birth",
        selector: (row) => row.dob,
        sortable: true,
        center: false,
    },
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        center: false,
    },
    {
        name: "Contact Number",
        selector: (row) => row.contactNumber,
        sortable: true,
        center: false,
    },
    {
        name: "Photo",
        center: true,
        cell: (row) => (
            <img
                src={row.photo}
                alt={row.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
        ),
    },
    {
        name: "About",
        selector: (row) => row.about,
        sortable: true,
        center: false,
    },
    {
        name: "Address",
        selector: (row) => row.address,
        sortable: true,
        center: false,
    },
    {
        name: "Education",
        selector: (row) => row.education,
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
                    <a href={`/mentors/edit/${row.id}`}>
                        <i className="icon-pencil-alt" />
                    </a>
                </li>
                <li className="delete">
                    <a href={`/mentors/delete/${row.id}`}>
                        <i className="icon-trash" />
                    </a>
                </li>
            </ul>
        ),
    },
];

export const mentorFilterOptions = [
    {
        name: "Name",
        options: [], // Placeholder for dynamic filtering or typeahead search
    },
    {
        name: "Username",
        options: [], // Placeholder for dynamic filtering or typeahead search
    },
    {
        name: "Education",
        options: ["B.Tech", "M.Tech", "MBA", "PhD", "B.Sc", "M.Sc"],
    },
    {
        name: "Assigned Courses",
        options: ["Web Development", "Data Science", "Machine Learning", "Cybersecurity"],
    },
    {
        name: "Batch Assignments",
        options: ["Batch A", "Batch B", "Batch C", "Batch D"],
    },
    {
        name: "Time Availability",
        options: ["Morning", "Afternoon", "Evening", "Full-Day"],
    },
    {
        name: "Category Expertise",
        options: ["Technology", "Finance", "Design", "Health", "Social Science"],
    },
    {
        name: "Status",
        options: ["Active", "Inactive", "On Leave"],
    },
    {
        name: "Contact Number",
        options: [], // Placeholder for dynamic filtering
    },
    {
        name: "Email Domain",
        options: ["@gmail.com", "@yahoo.com", "@outlook.com", "@company.com"],
    },
];
