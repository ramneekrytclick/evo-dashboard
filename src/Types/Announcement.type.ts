import { AxiosError } from "axios";

export interface IAnnouncement {
    _id?:string;
    title: string;
    message: string;
    media?: string;
    visibilityStart: Date; 
    targetRoles: ('Mentor' | 'Manager' | 'Creator' | 'Students' | 'Employers')[];
    visibilityEnd: Date; 
    createdBy: string|{name:string}; 
    createdAt?: Date;
    updatedAt?: Date;
  }