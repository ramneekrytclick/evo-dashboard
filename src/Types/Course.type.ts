import { InputType } from "reactstrap/types/lib/Input";
import { Category, Subcategory } from "./Category.type";
import { StudentProps } from "./Student.type";
import { MentorProps } from "./Mentor.type";

export interface CourseProps {
    id: number; 
    courseName: string; 
    category: Category|string; 
    subcategory: Subcategory|string; 
    description: string; 
    duration: string;
    mentorAssigned: string; 
    managerAssigned: string;
    batchesAvailable: BatchProps[]|string[]; 
    promoCodes: PromoCodeProps[]; 
    price: number; 
}

export interface CourseFormNavProps {
    steps: number;
    setSteps: (step: number) => void; 
}
export interface CourseTabContentProp {
    activeCallBack: (tab: number) => void;
    steps: number
}

export interface CourseFormProps{
    name: string; 
    category: Category; 
    subcategory: Subcategory; 
    description: string; 
    duration: string;
    mentorAssigned: string; 
    managerAssigned: string;
    realPrice:string;
    promoCodes:string[]
}

// Batch Details Interface
export interface BatchProps {
    id: string; 
    name: string;
    courseId:number;
    startDate: string;
    endDate: string;
    capacity: number; 
    students?: StudentProps[];
    mentors?: MentorProps[];
    promoCodes?: PromoCodeProps[];
}

export interface PromoCodeProps {
    _id:string;
    code: string;
    discountPercentage: number; 
    expiryDate: string;
    applicableTo: string;
    usageLimit: string;
    category: Category;
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
    updateCourse: (data: Partial<CourseFormValues> & { id: number }) => Promise<void>;
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

