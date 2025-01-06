import { MentorInitialValue, MentorListData } from "@/Types/Mentor.type";
import { User, Mail, Phone, Book } from "react-feather";
import * as Yup from "yup";

export const mentorListHeadData = [
    { id: "1", icon: <User />, title: 'All' },
    { id: "2", icon: <Mail />, title: 'Active' },
    { id: "3", icon: <Phone />, title: 'Inactive' },
];

export const newMentorInitialValue: MentorInitialValue = {
    name: "",
    dob: "",
    username: "",
    email: "",
    contactNumber: "",
    photo: "",
    about: "",
    address: "",
    assignedBatches: [],
    expertise: "",
    education: "",
    courses: [],
    workingMode: "In-office",
    password: "",
};

export const newMentorValidation = Yup.object().shape({
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
    education: Yup.string().required("Education details are required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    timeAvailable:Yup.string().required("Time available is required")
});

export const workingModeInputData = ['WFH', 'In-office'];

export const mentorListData: MentorListData[] = [
    {
        id: 1,
        name: "John Doe",
        dob: "1988-07-12",
        username: "john.doe",
        email: "john.doe@example.com",
        contactNumber: "9876543210",
        photo: "avtar/1.jpg",
        about: "John is an expert in Data Science with 5+ years of teaching experience.",
        address: "456 Elm Street, Chicago, USA",
        expertise: "Data Science",
        education: "PhD in Computer Science",
        assignedBatches: ["Batch A", "Batch B"],
        courses: ["Machine Learning", "Deep Learning"],
        workingMode: "WFH",
        password: "********",
    },
    {
        id: 2,
        name: "Jane Smith",
        dob: "1990-02-28",
        username: "jane.smith",
        email: "jane.smith@example.com",
        contactNumber: "9876543211",
        photo: "avtar/2.jpg",
        about: "Jane specializes in Web Development and has 10+ years of experience.",
        address: "123 Maple Street, Toronto, Canada",
        expertise: "Web Development",
        education: "Masters in Software Engineering",
        assignedBatches: ["Batch C"],
        courses: ["React", "Node.js"],
        workingMode: "In-office",
        password: "********",
    },
    {
        id: 3,
        name: "Emily Davis",
        dob: "1995-11-15",
        username: "emily.davis",
        email: "emily.davis@example.com",
        contactNumber: "9876543212",
        photo: "avtar/3.jpg",
        about: "Emily is passionate about mentoring in Cloud Computing technologies.",
        address: "789 Pine Street, San Francisco, USA",
        expertise: "Cloud Computing",
        education: "Masters in IT",
        assignedBatches: [],
        courses: ["AWS Fundamentals"],
        workingMode: "In-office",
        password: "********",
    },
];