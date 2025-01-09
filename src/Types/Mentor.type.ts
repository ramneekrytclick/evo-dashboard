import { CourseProps } from "./Course.type";

export type MentorProps = {
    id?: number | string;
    name: string;
    dob: string;
    username: string;
    email: string;
    contactNumber: string;
    photo: string;
    about: string;
    address: string;
    education: string;
    assignedCourses?: CourseProps[]; 
    batchAssignments?: string[]; 
    timeAvailability:string;
    password: string; 
};

export interface MentorType {
    activeTab: string;
    createdFormData: MentorProps[];
}

export interface MentorCommonType {
    item: MentorProps;
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
    expertise: string;
    assignedBatches: string[]; 
    courses: string[];
    password: string;
}
