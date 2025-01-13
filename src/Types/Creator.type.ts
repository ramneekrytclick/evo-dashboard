import { BatchProps, CourseProps } from "./Course.type";

export interface AddCreatorFormProps{
    name: string;
		dob: string;
		username: string;
		email: string;
		contactNumber: string;
		photo: string;
		about: string;
		address: string;
		education: {degree:string,institute:string,year:number};
		skills: string;
		assignedCourses: CourseProps[];
		assignedBatches: BatchProps[];
		password: string;
}