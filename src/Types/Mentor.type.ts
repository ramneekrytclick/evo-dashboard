import { CourseDetailsProps } from "./Course.type";

export type MentorListData = {
    id?: number | string;
    name: string;
    dob: string; // Date of birth in YYYY-MM-DD format
    username: string;
    email: string;
    contactNumber: string;
    photo: string; // URL or path to the photo
    about: string;
    address: string;
    education: string;
    assignedCourses?: CourseDetailsProps[]; // Optional array of batch names
    batchAssignments?: string[]; // Optional array of course names
    timeAvailability:string;
    password: string; // Password field, should be handled securely
};

export interface MentorType {
    activeTab: string;
    createdFormData: MentorListData[];
}

export interface MentorCommonType {
    item: MentorListData;
}

export interface MentorInitialValue {
    name: string;
    dob: string;
    username: string;
    email: string;
    contactNumber: string;
    photo: string;
    about: string;
    address: string;
    workingMode: "In-office" | "WFH";
    education: string;
    expertise: string; // Area of expertise
    assignedBatches: string[]; // Optional but included in initial value as an empty array
    courses: string[]; // Optional but included in initial value as an empty array
    password: string;
}
