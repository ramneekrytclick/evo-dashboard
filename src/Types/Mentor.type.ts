import { BatchProps, CourseProps } from "./Course.type";

export interface AddMentorFormProps {
	name: string;
	dob: string;
	username: string;
	email: string;
	contactNumber: string;
	photo: string;
	about: string;
	address: string;
	education: {
		degree: string;
		institute: string;
		year: number;
	}[];
	assignedCourses: string[];
	assignedBatches: string[];
	batchAssignments: string[];
	timeAvailability: string;
	password: string;
}
export interface MentorDataProps {
	_id: string;
	username: string;
	dob: string;
	contactNumber: string;
	isApproved: boolean;
	photo: string;
	about: string;
	address: string;
	assignedBatches: string[]; // Array of assigned batch IDs
	assignedCourses: string[]; // Array of assigned course IDs
	assignmentsSubmitted: any[]; // Array of submitted assignments (define type if known)
	batchAssignments: any[]; // Array of batch assignments (define type if known)
	coursesEnrolled: string[]; // Array of enrolled course IDs
	createdAt: string; // ISO string representing creation date
	createdCourses: string[]; // Array of created course IDs
	expertise: string;
	education: {
		degree: string;
		institute: string;
		year: number;
	}[]; // Array of education records (define type if known)
	email: string; // Mentor's email
	evoScore: number; // Mentor's EVO score
	experience: string[]; // Array of experience records (define type if known)
	interests: string[]; // Array of interests
	isOAuthUser: boolean; // Whether the user signed up using OAuth
	jobCampaigns: string[]; // Array of job campaigns (define type if known)
	languagesPreferred: string[]; // Array of preferred languages
	name: string; // Mentor's name
	progressTracking: {
		completedCourses: string[]; // Array of completed course IDs
		overallProgress: number; // Overall progress percentage
	};
	resume: {
		skills: string[]; // Array of skills
		education: any[]; // Array of education records (define type if known)
		experience: any[]; // Array of experience records (define type if known)
	};
	role: string; // User's role (e.g., "Mentor")
	skills: string[]; // Array of skills
	status: string; // Mentor's status (e.g., "Approved", "Disapproved")
	timeAvailability: string; // Availability status
}

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
	timeAvailability: string;
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
	_id?: string;
	status: string;
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
