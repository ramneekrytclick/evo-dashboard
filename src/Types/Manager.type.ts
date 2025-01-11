export type ManagerListData = {
    id?: number | string;
    name: string;
    dob: string; // Date of birth in YYYY-MM-DD format
    username: string;
    email: string;
    contactNumber: string;
    photo: string; // URL or path to the photo
    about: string;
    address: string;
    workingMode: "In-office" | "WFH"; // Restricted to two valid options
    education: string;
    assignedMentors?: string[]; // Optional array of mentor names
    assignedCreators?: string[]; // Optional array of creator names
    password: string; // Password field, should be handled securely
};

export interface ManagerType {
    activeTab: string;
    createdFormData: ManagerListData[];
}

export interface ManagerCommonType {
    item: ManagerListData;
}

export interface ManagerInitialValue {
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
    assignedMentors: string[]; // Optional but included in initial value as an empty array
    assignedCreators: string[]; // Optional but included in initial value as an empty array
    password: string;
}

export interface AddManagerFormProps{
    name:string,
      username:string,
      email:string,
      password:string,
      dob:string,
      contactNumber:string,
      photo:string,
      about:string,
      address:string,
      workingMode:string,
	}