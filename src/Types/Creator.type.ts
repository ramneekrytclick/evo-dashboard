import { BatchDetails, CourseDetailsProps } from "./Course.type";

export interface AddCreatorFormProps{
    name: string;
		dob: string;
		username: string;
		email: string;
		contactNumber: string;
		photo: string;
		about: string;
		address: string;
		education: string;
		skills: string;
		assignedCourses: CourseDetailsProps[];
		assignedBatches: BatchDetails[];
		password: string;
}