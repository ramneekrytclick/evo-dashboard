import {  CourseProps } from "@/Types/Course.type";
import { TableColumn } from "react-data-table-component";

export const addCourseNav = [
    {
        id: 1,
        icon: 'product-detail',
        title: 'Add Course Details',
        subTitle: 'Add course name & description',
    },
    {
        id: 2,
        icon: 'product-category',
        title: 'Course Category',
        subTitle: 'Add course categories and subcategories'
    },
    {
        id: 3,
        icon: 'advance',
        title: 'Assign',
        subTitle: 'Assign mentors and managers'
    },
    {
        id: 4,
        icon: 'pricing',
        title: 'Pricing',
        subTitle: 'Add course price & promo codes'
    },
];

export const addCategoryItem = ["Technology", "Finance", "Business", "Computer Science", "Health", "Social Science"];
export const courseTagItem = ["new", "tech", "web", "course"];
export const courseSubCategoryItem = ["web development", "data science", "machine learning"]

export const courseFilterOptions = [
    {
        name: "Category",
        options: ["Technology", "Marketing", "Design", "Security", "Data Analysis"],
    },
    {
        name: "Subcategory",
        options: ["Frontend Development", "Machine Learning", "SEO", "UI/UX Design", "Network Security"],
    },
    {
        name: "Duration",
        options: ["1 Month", "3 Months", "6 Months", "1 Year"],
    },
    {
        name: "Mentor",
        options: ["John Doe", "Jane Smith", "Alice Brown", "Michael Lee"],
    },
    {
        name: "Manager",
        options: ["Sarah Connor", "David Williams", "Emily Johnson"],
    },
    {
        name: "Batches",
        options: ["Batch A", "Batch B", "Batch C", "Batch D"],
    },
    {
        name: "Price Range",
        options: ["Below 15000.00", "15000.00 - 30000.00", "30000.00 - 50000.00", "Above 50000.00"],
    },
    {
        name: "Status",
        options: ["Available", "Upcoming", "Closed"],
    },
    {
        name: "Promo Codes",
        options: ["NEWYEAR2025", "SUMMER25", "STUDENT50", "FREESHIP"],
    },
];

// export const courseTableColumns: TableColumn<CourseProps>[] = [
//     {
//         name: "Course Name",
//         selector: (row) => row["name"],
//         sortable: true,
//         center: false,
//         cell: (row) => `${row.name}`,
//     },
//     {
//         name:"Description",
//         selector: (row) => row["description"],
//         sortable: true,
//         center: false,
//         cell: (row) => `${row.description}`,
//     },
//     {
//         name: "Category",
//         selector: (row) => `${row.category}`,
//         sortable: true,
//         center: false,
//     },
//     {
//         name: "Subcategory",
//         selector: (row) => `${row.subcategory}`,
//         sortable: true,
//         center: false,
//     },
//     {
//         name: "Duration",
//         selector: (row) => `${row.duration}`,
//         sortable: true,
//         center: false,
//     },
//     {
//         name: "Mentor",
//         selector: (row) => `${row.mentorAssigned}`,
//         sortable: true,
//         center: false,
//     },
//     {
//         name: "Price",
//         selector: (row) => `₹${row.price?.toLocaleString()}`,
//         sortable: true,
//         center: false,
//     },
//     {
//         name: "Action",
//         sortable: true,
//         center: false,
//         cell: (row) => (
//             <ul className="action">
//                 <li className="edit">
//                     <a href={`/courses/edit/${row.id}`}>
//                         <i className="icon-pencil-alt" />
//                     </a>
//                 </li>
//                 <li className="delete">
//                     <a href={`/courses/delete/${row.id}`}>
//                         <i className="icon-trash" />
//                     </a>
//                 </li>
//             </ul>
//         ),
//     },
// ];
