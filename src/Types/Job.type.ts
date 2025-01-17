export interface JobProps {
    _id?:string;
    title:string;
    description:string;
    skillsRequired:string[];
    location:string;
    salary:string;
    status?:string;
    applications?:Application[];
}

export interface Application{
    _id?:string;
    studentId:string;
    status?:string;
}