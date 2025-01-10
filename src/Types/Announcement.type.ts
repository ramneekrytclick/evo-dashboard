import { AxiosError } from "axios";

export interface IAnnouncement {
    title: string;
    message: string;
    media?: string;
    visibilityStart: Date; 
    targetRoles: ('Mentor' | 'Manager' | 'Creator' | 'Students' | 'Employers')[];
    visibilityEnd: Date; 
    createdBy: string; 
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface GetAnnouncementsResponse {
    data?: {
      announcements: IAnnouncement[];
    };
  }