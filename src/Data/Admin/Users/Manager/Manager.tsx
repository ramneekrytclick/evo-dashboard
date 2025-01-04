
import { ManagerInitialValue, ManagerListData } from "@/Types/Manager.type";
import { User, Mail, Phone, Home } from "react-feather";
import * as Yup from "yup";

export const managerListHeadData = [
    { id: "1", icon: <User />, title: 'All' },
    { id: "2", icon: <Mail />, title: 'Active' },
    { id: "3", icon: <Phone />, title: 'Inactive' },
];

export const newManagerInitialValue: ManagerInitialValue = {
    name: "",
    dob: "",
    username: "",
    email: "",
    contactNumber: "",
    photo: "",
    about: "",
    address: "",
    workingMode: "WFH",
    education: "",
    assignedMentors: [],
    assignedCreators: [],
    password: "",
};

export const newManagerValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    dob: Yup.string().required("Date of Birth is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contactNumber: Yup.string()
        .matches(/^\d{10}$/, "Contact number must be 10 digits")
        .required("Contact number is required"),
    photo: Yup.string().url("Invalid photo URL").optional(),
    about: Yup.string().required("About section is required"),
    address: Yup.string().required("Address is required"),
    workingMode: Yup.string().oneOf(["In-office", "WFH"], "Invalid working mode").required("Working mode is required"),
    education: Yup.string().required("Education details are required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});
export const workingModeInputData = ['WFH', 'In-office'];
export const managerListData: ManagerListData[] = [
    {
        id: 1,
        name: "Alice Johnson",
        dob: "1990-05-14",
        username: "alice.johnson",
        email: "alice.johnson@example.com",
        contactNumber: "9876543210",
        photo: "alice.jpg",
        about: "Alice has over 10 years of experience in team management.",
        address: "123 Main Street, Sydney, Australia",
        workingMode: "In-office",
        education: "MBA in Management",
        assignedMentors: ["John Doe", "Jane Smith"],
        assignedCreators: ["Mike Ross", "Rachel Zane"],
        password: "********",
    },
    {
        id: 2,
        name: "Bob Smith",
        dob: "1985-11-22",
        username: "bob.smith",
        email: "bob.smith@example.com",
        contactNumber: "9876543211",
        photo: "bob.jpg",
        about: "Bob specializes in remote team management.",
        address: "456 Park Avenue, Melbourne, Australia",
        workingMode: "WFH",
        education: "BSc in Computer Science",
        assignedMentors: ["Emily Davis"],
        assignedCreators: ["Harvey Specter"],
        password: "********",
    },
    {
        id: 3,
        name: "Carol Williams",
        dob: "1992-03-18",
        username: "carol.williams",
        email: "carol.williams@example.com",
        contactNumber: "9876543212",
        photo: "carol.jpg",
        about: "Carol has a strong background in creator management.",
        address: "789 King Street, Brisbane, Australia",
        workingMode: "In-office",
        education: "Masters in Marketing",
        assignedMentors: [],
        assignedCreators: [],
        password: "********",
    },
];
