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
	title: string;
	description: string;
	whatYouWillLearn: string;
	photo: string;
	youtubeLink: string;
	timing: string;
	realPrice: number;
	discountedPrice: number;
	category: string;
	subcategory: string;
	wannaBeInterest: string[];
	tags: string[];
	reviews: {
		student: string | null;
		rating: number;
		comment: string;
		createdAt: string;
		_id: string;
	}[];
	createdBy: string;
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
	title: string;
	description: string;
	whatYouWillLearn: string;
	youtubeLink: string;
	timing: string;
	categoryId: string;
	subcategoryId: string;
	wannaBeInterestId: string;
	realPrice: string;
	discountedPrice: string;
	tags: string;
	createdBy: string;
	review: string;
}

// Batch Details Interface
export interface ChatMessage {
	_id: string;
	sender: string; // studentId or mentorId
	message: string;
	timestamp: string;
}

export interface BatchProps {
	_id?: string;
	name: string;
	description?: string;
	time?: string;
	batchWeekType?: string; // e.g., "Mon-Fri", "Weekend"
	startDate: string;
	endDate: string;
	course?: string | { _id: string; title: string }; // courseId
	students?: string[]; // array of studentIds
	mentor?: string | { _id: string; name: string }; // mentorId or null
	chatMessages?: ChatMessage[];
	createdAt?: string;
	updatedAt?: string;
}

export interface PromoCodeProps {
	_id: string;
	code: string;
	discountPercentage: number;
	validUntil: string;
	course?: { _id: string; name: string };
	usageLimit?: number;
	usageCount?: number;
	isActive: boolean;
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
