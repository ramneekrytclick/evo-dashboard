export interface AddAssignmentProps{
    courseId: string;
		lessonId: string;
		assignment: {
			title: string,
			description: string,
			submissionURL: string
		}
}