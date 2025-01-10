import { StudentProps } from "@/Types/Student.type";
import { TableColumn } from "react-data-table-component";

export const studentTableColumns: TableColumn<StudentProps>[] = [
    {
        name: "Name",
        selector: (row) => row.name,
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
        name: "Guardian Name",
        selector: (row) => row.guardianName,
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
    // {
    //     name: "Courses Enrolled",
    //     selector: (row) => row.coursesEnrolled.join(", "),
    //     sortable: false,
    //     center: false,
    // },
    // {
    //     name: "Interests",
    //     selector: (row) => row.interests.join(", "),
    //     sortable: false,
    //     center: false,
    // },
    // {
    //     name: "Languages Preferred",
    //     selector: (row) => row.languagesPreferred.join(", "),
    //     sortable: false,
    //     center: false,
    // },
    {
        name: "Wanna Be",
        selector: (row) => row.wannaBe,
        sortable: true,
        center: false,
    },
    {
        name: "Experience",
        selector: (row) => row.experience,
        sortable: true,
        center: false,
    },
    {
        name: "Batch",
        selector: (row) => row.batch,
        sortable: true,
        center: false,
    },
    {
        name: "Roadmap Enrolled",
        selector: (row) => row.roadmapEnrolled,
        sortable: true,
        center: false,
    },
    {
        name: "Resume",
        center: true,
        cell: (row) => (
            <a href={row.resume} target="_blank" rel="noopener noreferrer">
                View Resume
            </a>
        ),
    },
    {
        name: "Action",
        sortable: false,
        center: false,
        cell: (row) => (
            <ul className="action">
                {/* <li className="edit">
                    <a href={`/students/edit/${row.id}`}>
                        <i className="icon-pencil-alt" />
                    </a>
                </li>
                <li className="delete">
                    <a href={`/students/delete/${row.id}`}>
                        <i className="icon-trash" />
                    </a>
                </li> */}
            </ul>
        ),
    },
];

export const studentFilterOptions = [
    {
        name: "Name",
        options: [], // Placeholder for dynamic filtering
    },
    {
        name: "Email Domain",
        options: ["@gmail.com", "@yahoo.com", "@outlook.com", "@company.com"],
    },
    {
        name: "Education",
        options: ["High School", "Bachelor's", "Master's", "PhD"],
    },
    {
        name: "Courses Enrolled",
        options: ["Web Development", "Data Science", "Machine Learning", "UI/UX Design"],
    },
    {
        name: "Interests",
        options: ["Technology", "Art", "Finance", "Health", "Science"],
    },
    {
        name: "Languages Preferred",
        options: ["English", "Hindi", "Spanish", "French", "Mandarin"],
    },
    {
        name: "Wanna Be",
        options: ["Developer", "Data Scientist", "Designer", "Entrepreneur"],
    },
    {
        name: "Batch",
        options: ["Batch A", "Batch B", "Batch C", "Batch D"],
    },
    {
        name: "Roadmap Enrolled",
        options: ["Frontend", "Backend", "Full Stack", "Data Engineering"],
    },
    {
        name: "Status",
        options: ["Active", "Inactive", "On Hold"],
    },
];
