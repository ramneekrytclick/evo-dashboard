import { InputType } from "reactstrap/types/lib/Input";
import { Category, Subcategory } from "./Category.type";
import { StudentProps } from "./Student.type";
import { MentorProps } from "./Mentor.type";

export interface WannaBeInterest {
	_id: string;
	name: string;
}

export interface SubcategoryNew {
	_id: string;
	name: string;
}

export interface Course {
	_id: string;
	title?: string;
	name?: string;
	description: string;
	subcategory?: SubcategoryNew;
	wannaBeInterest?: WannaBeInterest[];
}

export interface CourseProps {
	_id?: string;
	name: string;
	category: Category | string;
	subcategory: Subcategory | string;
	description: string;
	duration: string;
	mentorAssigned: { name: string; id: string; email: string };
	managerAssigned: { name: string; id: string; email: string };
	batchesAvailable: BatchProps[] | string[];
	promoCodes: PromoCodeProps[];
	price: number;
	wannaBeInterest: string[];
	createdAt?: string;
}

export interface CourseFormNavProps {
	steps: number;
	setSteps: (step: number) => void;
}
export interface CourseTabContentProp {
	activeCallBack: (tab: number) => void;
	steps: number;
}

export interface CourseFormProps {
	name: string;
	description: string;
	categoryId: string;
	subcategoryId: string;
	wannaBeInterestId: string;
}

// Batch Details Interface
export interface BatchProps {
	_id: string;
	batchStatus: string;
	name: string;
	courseId: string | { _id: string } | null;
	startDate: string;
	endDate: string;
	students?: StudentProps[];
	mentors?: MentorProps[];
	promoCodes?: PromoCodeProps[];
}

export interface PromoCodeProps {
	_id?: string;
	code: string;
	discountPercentage: number;
	course: { _id: string; name?: string } | null;
	path: { _id: string; name?: string } | null;
	isActive: boolean;
	validUntil: string;
}
export interface FormGroupCommonProp {
	type: InputType;
	placeholder?: string;
	formClass?: string;
	rows?: number;
}

export interface SelectCommonProp {
	data: string[];
	size: number;
	selectClass?: string;
}

// Course Form Values Interface
export interface CourseFormValues {
	courseName: string;
	category: string;
	subcategory: string;
	description: string;
	duration: string;
	mentorAssigned: string;
	managerAssigned: string;
	batchesAvailable: BatchProps[];
	promoCodes: PromoCodeProps[];
	price: number;
}

// Course CRUD Operations
export interface CourseCRUDOperations {
	createCourse: (data: CourseFormValues) => Promise<void>;
	readCourses: () => Promise<CourseProps[]>;
	updateCourse: (
		data: Partial<CourseFormValues> & { id: number }
	) => Promise<void>;
	deleteCourse: (id: number) => Promise<void>;
}

// Filter Interface for Courses
export interface FilterCoursesProps {
	category?: string; // Filter by category
	subcategory?: string; // Filter by subcategory
	mentorAssigned?: string; // Filter by mentor
	managerAssigned?: string; // Filter by manager
	priceRange?: { min: number; max: number }; // Price range filter
	duration?: string; // Duration filter
}
