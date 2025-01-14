export interface EmployerProps {
    _id: string; 
    name: string; 
    email: string; 
    password: string;
    contactNumber: string;
    photo?: string;
    industry: string; 
    address: string; 
    companySize: string; 
}
export interface EmployerDataProps {
    assignedBatches: string[]; // List of batch IDs assigned
    assignedCourses: string[]; // List of course IDs assigned
    assignmentsSubmitted: string[]; // List of submitted assignment IDs
    batchAssignments: string[]; // List of batch assignment IDs
    coursesEnrolled: string[]; // List of enrolled course IDs
    createdAt: string; // Date when the employer was created
    createdCourses: string[]; // List of created course IDs
    education: Education[]; // Array of education details
    email: string; // Employer's email
    enrolledCourses: string[]; // List of enrolled course IDs
    evoScore: number; // Employer's EVO score
    experience: Experience[]; // Array of experience details
    interests: string[]; // List of employer's interests
    isOAuthUser: boolean; // Indicates if the user is an OAuth user
    jobCampaigns: string[]; // List of job campaign IDs
    languagesPreferred: string[]; // List of preferred languages
    name: string; // Employer's name
    progressTracking: {
      completedCourses: string[]; // List of completed course IDs
      overallProgress: number; // Overall progress percentage
    };
    resume: {
      skills: string[]; // List of skills
      education: Education[]; // Array of education details
      experience: Experience[]; // Array of experience details
    };
    role: string; // Role of the user (e.g., Employer)
    skills: string[]; // List of skills
    status: string; // Approval status of the employer
    timeAvailability: string; // Time availability information
  }
  
  // Supporting Interfaces
  export interface Education {
    degree: string;
    institute: string;
    year: number;
  }
  
  export interface Experience {
    company: string;
    position: string;
    duration: string; // e.g., "2 years"
    description: string; // Description of the experience
  }
  