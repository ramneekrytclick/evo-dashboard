import { CourseProps } from "./Course.type";

export interface StudentProps {
    name: string;
    dob: string;
    email: string;
    contactNumber: string;
    photo: string;
    guardianName: string;
    address: string;
    education: string;
    coursesEnrolled: CourseProps[];
    interests: string;
    languagesPreferred: string;
    wannaBe: string;
    experience: string;
    batch: string;
    roadmapEnrolled: string;
    password: string;
    resume: string;
}