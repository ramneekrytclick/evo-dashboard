import { CourseProps } from "./Course.type";

export interface StudentProps {
    _id:string;
    name: string;
    dob: string;
    email: string;
    contactNumber: string;
    photo: string;
    guardianName: string;
    address: string;
    education: string;
    coursesEnrolled: CourseProps[]|string[];
    interests: string|string[];
    languagesPreferred: string|string[];
    wannaBe: string;
    experience: string;
    batch: string;
    roadmapEnrolled: string;
    password: string;
    resume: string;
}
