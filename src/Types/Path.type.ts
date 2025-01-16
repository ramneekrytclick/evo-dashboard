import { CourseProps } from "./Course.type";

export interface PathProps{
    _id?:string;
    name:string;
    description:string;
    courses:CourseProps[], 
    roadmap:Suggestion[];
}

export interface Suggestion {
    suggestion:string;
}
