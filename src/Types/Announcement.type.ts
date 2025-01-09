export interface IAnnouncement {
    title: string; // Announcement title
    message: string; // Announcement message
    media?: string; // Optional URL for images or video
    targetAudience: ('Mentor' | 'Manager' | 'Creator' | 'Students' | 'Employers')[]; // Target roles for the announcement
    visibilityStart: Date; // Start of visibility period
    visibilityEnd: Date; // End of visibility period
    createdBy: string; // MongoDB ObjectId for the user who created the announcement
    createdAt?: Date; // Automatically added by Mongoose timestamps
    updatedAt?: Date; // Automatically added by Mongoose timestamps
  }
  