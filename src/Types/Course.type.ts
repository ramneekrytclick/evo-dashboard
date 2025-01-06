import { InputType } from "reactstrap/types/lib/Input";

// Step and Navigation for Forms
export interface CourseFormNavProps {
    steps: number; // Current step in the form navigation
    setSteps: (step: number) => void; // Function to update the current step
}

// Course Details Interface
export interface CourseDetailsProps {
    id: number; // Unique identifier for the course
    courseName: string; // Name of the course
    category: string; // Main category of the course
    subcategory: string; // Subcategory under the main category
    description: string; // Detailed description of the course
    duration: string; // Duration of the course
    mentorAssigned: string; // Mentor assigned to the course
    managerAssigned: string; // Manager overseeing the course
    batchesAvailable: BatchDetails[]; // List of available batches
    promoCodes: PromoCodeDetails[]; // List of applicable promo codes
    price: number; // Price of the course
}
export interface CourseTagProp {
    title: string; // Text for the course tag
}

export interface CourseTabContentProp {
    activeCallBack: (tab: number) => void;
    steps: number
}

// Batch Details Interface
export interface BatchDetails {
    batchId: number; // Unique identifier for the batch
    batchName: string; // Name of the batch
    startDate: string; // Start date of the batch
    endDate: string; // End date of the batch
    capacity: number; // Maximum capacity of the batch
    enrolledStudents: number; // Current number of enrolled students
}

// Promo Code Details Interface
export interface PromoCodeDetails {
    code: string; // Promo code string
    discountPercentage: number; // Discount percentage
    expiryDate: string; // Expiry date of the promo code
    isActive: boolean; // Promo code activation status
}

// Form Group Common Properties
export interface FormGroupCommonProp {
    type: InputType; // Input type (text, email, number, etc.)
    placeholder?: string; // Placeholder text for the input
    formClass?: string; // Custom class for the input form
    rows?: number; // Number of rows for textarea inputs
}

// Select Common Properties
export interface SelectCommonProp {
    data: string[]; // Array of options for the dropdown
    size: number; // Size of the dropdown
    selectClass?: string; // Custom class for the select component
}

// Course Form Values Interface
export interface CourseFormValues {
    courseName: string; // Course name
    category: string; // Course category
    subcategory: string; // Course subcategory
    description: string; // Course description
    duration: string; // Course duration
    mentorAssigned: string; // Assigned mentor
    managerAssigned: string; // Assigned manager
    batchesAvailable: BatchDetails[]; // Array of batch details
    promoCodes: PromoCodeDetails[]; // Array of promo codes
    price: number; // Course price
}

// Course CRUD Operations
export interface CourseCRUDOperations {
    createCourse: (data: CourseFormValues) => Promise<void>; // Function to create a new course
    readCourses: () => Promise<CourseDetailsProps[]>; // Function to fetch all courses
    updateCourse: (data: Partial<CourseFormValues> & { id: number }) => Promise<void>; // Function to update an existing course
    deleteCourse: (id: number) => Promise<void>; // Function to delete a course
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

