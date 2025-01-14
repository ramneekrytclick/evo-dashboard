import { TableColumn } from "react-data-table-component";

export const addEmployerNav = [
    {
        id: 1,
        icon: "employer-details",
        title: "Add Employer Details",
        subTitle: "Add employer name & industry",
    },
    {
        id: 2,
        icon: "company-info",
        title: "Company Info",
        subTitle: "Add company size & address",
    },
    {
        id: 3,
        icon: "contact",
        title: "Contact Details",
        subTitle: "Add contact number & email",
    },
];

export const employerFilterOptions = [
    {
        name: "Industry",
        options: [
            "Technology",
            "Finance",
            "Healthcare",
            "Education",
            "Real Estate",
            "Retail",
            "Manufacturing",
            "Hospitality",
        ],
    },
    {
        name: "Company Size",
        options: [
            "1-10 Employees",
            "11-50 Employees",
            "51-200 Employees",
            "201-500 Employees",
            "501-1000 Employees",
            "1001+ Employees",
        ],
    },
    {
        name: "Location",
        options: [
            "United States",
            "Canada",
            "United Kingdom",
            "Australia",
            "India",
            "Germany",
            "France",
            "Japan",
        ],
    },
    {
        name: "Status",
        options: ["Active", "Inactive", "Pending Approval"],
    },
];


export const employerTableColumns: TableColumn<any>[] = [
    {
        name: "Name",
        selector: (row) => row["name"],
        sortable: true,
        center: false,
        cell: (row) => (
           row.name
        ),
    },
    {
        name: "Email",
        selector: (row) => row["email"],
        sortable: true,
        center: false,
        cell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
    },
    {
        name: "Contact",
        selector: (row) => row["contactNumber"],
        sortable: true,
        center: false,
    },
    {
        name: "Industry",
        selector: (row) => row["industry"],
        sortable: true,
        center: false,
    },
    {
        name: "Company Size",
        selector: (row) => row["companySize"],
        sortable: true,
        center: false,
    },
    {
        name: "Address",
        selector: (row) => row["address"],
        sortable: false,
        center: false,
    },
    {
        name: "Action",
        sortable: false,
        center: false,
    },
];
